export default function Loader ({className = ""}) {
    return(
        <div className={`flex mt-10 gap-4 justify-center ${className}`}>
            {/* tailwind animation */}
            <div className="w-2 h-2 animate-ping rounded-full bg-gray-500"></div>
            <div className="w-2 h-2 animate-ping rounded-full bg-gray-500"></div>
            <div className="w-2 h-2 animate-ping rounded-full bg-gray-500"></div>
        </div>
    )
}