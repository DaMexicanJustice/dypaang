import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    children: React.ReactNode
    className?: string
    fullScreen?: boolean
}

export function Modal({ isOpen, onClose, title, children, className, fullScreen = false }: ModalProps) {
    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="absolute inset-0 bg-black/50 transition-opacity duration-300" onClick={onClose} />
            <div className={cn(
                fullScreen
                    ? "relative z-10 w-full h-full bg-[#F4274A] transition-all duration-300"
                    : "relative z-10 w-full max-w-2xl mx-4 bg-[#F4274A] rounded-lg border shadow-lg transition-all duration-300",
                isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
                className
            )}>
                <div className="p-4 border-b flex items-center justify-between">
                    <div className="text-lg font-semibold text-white">{title}</div>
                    <Button size="sm" variant="ghost" onClick={onClose} className="text-white">
                        <X className="size-6" />
                    </Button>
                </div>
                <div className={cn(fullScreen ? "flex-1 overflow-auto" : "p-6")}>
                    {children}
                </div>
            </div>
        </div>
    )
}
