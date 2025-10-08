import Image from "next/image"

export function CustomFooter() {
    return (
        <footer className="relative bg-background">
            {/* Left background accent */}
            <div
                className="absolute left-0 top-0 h-full w-64"
                style={{ backgroundColor: "#05092E" }}
                aria-hidden="true"
            />
            <div className="relative z-10 flex justify-center items-center h-full px-4 py-6 ml-64 w-[calc(100%-16rem)]">
                <p className="text-xs text-muted-foreground mr-2">
                    Created By
                </p>
                <a href="https://www.neobotanik.com" target="_blank" rel="noopener noreferrer">
                    <Image src="/neobotanik.png" alt="Neobotanik logo" width={96} height={32} className="h-4 w-38" />
                </a>
            </div>
        </footer>
    )
}