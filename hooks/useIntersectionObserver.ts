import { RefObject, useEffect, useState } from "react";

// elementRef ---> React ref object pointing to a DOM element
// threshold : number / an array of numbers of what percentage of the target's visibility the callback should execute
function useIntersectionObserver(elementRef: RefObject<Element>,
    { threshold = 0.1, root = null, rootMargin = "0%" }) {

    // IntersectionObserverEntry: contains information about the visibility and position of the observed elemenet relative to its root container
    const [entry, setEntry] = useState<IntersectionObserverEntry>();

    // Takes the first IntersectionObserverEntry from the array (latest state) and updates the entry state using setEntry
    const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
        setEntry(entry);
    };

    useEffect(() => {
        
        // The visibility of the observed element ---> node 
        const node = elementRef?.current;

        const hasIOSupport = !!window.IntersectionObserver;

        // The case of early return ---> safeguard
        if (!node || !hasIOSupport) return;

        const observerParams = { threshold, root, rootMargin };

        // updateEntry : callback function <--- whenever the visibility of the observed element crosses a threshold
        // observerParams : configuration object
        // observeParams (guideline) ---> browser's computed information ---> passed to observer's callback in the IntersectionObservationEntry object
        const observer = new IntersectionObserver(updateEntry, observerParams);

        observer.observe(node);

        // cleanup function
        return () => observer.disconnect();

        // Dependencies array : 
        // elementRef?.current : current DOM element that the ref is attached to, 
        // root : defaults to the browser's viewport
        // JSON.stringify(threshold) : dependencies in React's effect hooks must be primitives not objects or arrays
    }, [elementRef?.current, root, rootMargin, JSON.stringify(threshold)])

    // Latest IntersectionObserverEntry object
    return entry;
}

export default useIntersectionObserver;