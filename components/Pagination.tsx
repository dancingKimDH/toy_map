import Link from "next/link"

interface Pagination {
    total: number;
    page: string;
    pathName: string;
}

export default function Pagination({ total, page, pathName }: Pagination) {
    return (
        <div className="py-6 w-full px-10 flex justify-center gap-3 bg-white my-10 flex-wrap text-black">
            
            {/* Creates a new array with a length equal to 'total' + ... : Spreads elements/props into individual elements */}
            {/* In the context of the pagination code, the array doesn't need to hold any values but exist so that the .map() method can iterate over it */}
            {total <= 10 ? [...Array(total)].map((x, i) => (
                <Link href={{ pathname: pathName, query: { page: i + 1 } }} key={i}>
                    <span className={`px-3 py-2 rounded border shadow-sm bg-white ${(i + 1) === parseInt(page, 10) ? "text-blue-600 font-bold" : "text-gray-500"}`}>{i + 1}</span></Link>
            )) : <>
                {parseInt(page) > 1 &&
                    <Link href={{ pathname: pathName, query: { page: parseInt(page) - 1 } }}>
                        <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>이전</span></Link>
                }
                <Link href={{ pathname: pathName, query: { page: parseInt(page) } }}>
                    <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>{page}</span></Link>
                {total > parseInt(page) &&
                    <Link href={{ pathname: pathName, query: { page: parseInt(page) + 1 } }}>
                        <span className={`px-3 py-2 rounded border shadow-sm bg-white`}>다음</span></Link>
                }
            </>}
        </div>
    )
}