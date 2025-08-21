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
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className={cn("relative z-10 w-full max-w-2xl mx-4 bg-white rounded-lg border shadow-lg", className)}>
                <div className="p-4 border-b flex items-center justify-between">
                    <div className="text-lg font-semibold text-gray-900">{title}</div>
                    <Button size="sm" variant="ghost" onClick={onClose}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    )
}
