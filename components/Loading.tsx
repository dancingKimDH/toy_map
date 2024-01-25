export default function Loading() {
    return (
        <>
            <div className="w-full h-20 animate-pulse bg-gray-200 rounded-md"></div>
            {[...Array(10)].map((e, i) => (
                // e represents the current element being processed in the array, in this case, undefined.
                <div key={i} className="w-full h-20 animate-pulse bg-gray-200 rounded-md mt-2"></div>
            ))}

        </>
    )
}