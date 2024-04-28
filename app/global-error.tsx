'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div>
      <div className="w-full h-screen mx-auto pt-[10%] text-black font-semibold">다시 시도해 주세요</div>
      <button className='mt-4 mx-auto bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        다시 시도하기
      </button>
    </div>
  )
}