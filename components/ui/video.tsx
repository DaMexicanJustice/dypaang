import * as React from "react"
import { cn } from "@/lib/utils"

export interface VideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
    src: string
    alt?: string
    className?: string
}

const Video = React.forwardRef<HTMLVideoElement, VideoProps>(
    ({ className, src, alt, ...props }, ref) => {
        return (
            <video
                ref={ref}
                src={src}
                className={cn(
                    "w-full h-auto rounded-md border",
                    className
                )}
                controls
                preload="metadata"
                {...props}
            >
                {alt && <p className="sr-only">{alt}</p>}
                Your browser does not support the video tag.
            </video>
        )
    }
)

Video.displayName = "Video"

export { Video }
