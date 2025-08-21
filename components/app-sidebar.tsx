"use client"

import { useState } from "react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ImageIcon, Video, Brain, BookOpen, ChevronDown, Sparkles, Home } from "lucide-react"

interface AppSidebarProps {
  activeSection: string
  setActiveSection: (section: string) => void
}

export function AppSidebar({ activeSection, setActiveSection }: AppSidebarProps) {
  const [openSections, setOpenSections] = useState<string[]>(["image-flow"])

  const toggleSection = (section: string) => {
    setOpenSections((prev) => (prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]))
  }

  const menuItems = [
    {
      id: "home",
      title: "Home",
      icon: Home,
      isStandalone: true,
      action: () => setActiveSection("overview"),
    },
    {
      id: "image-flow",
      title: "Image Flow",
      icon: ImageIcon,
      submenu: [
        { id: "generate-image-prompt", title: "Generate Image Prompt", href: "#" },
        { id: "generate-omni-reference-prompt", title: "Generate Omni Reference Prompt", href: "#" }
      ],
    },
    {
      id: "video-flow",
      title: "Video Flow",
      icon: Video,
      submenu: [{ id: "generate-video-prompt", title: "Generate Video Prompt", href: "#" }],
    },
    {
      id: "intent",
      title: "Intent",
      icon: Brain,
      submenu: [
        { id: "what-is-intent", title: "What is Intent", href: "#" },
        { id: "intent-examples", title: "Examples", href: "#" },
      ],
    },
    {
      id: "tutorials",
      title: "Tutorials",
      icon: BookOpen,
      submenu: [
        { id: "prompt-images", title: "How to Prompt Images", href: "#" },
        { id: "prompt-videos", title: "How to Prompt Videos", href: "#" },
        { id: "use-intent", title: "How to Use Intent", href: "#" },
        { id: "prompt-engineering", title: "Prompt Engineering", href: "#" },
      ],
    },
  ]

  return (
    <div className="w-64 bg-[#F8F8F2] border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-200 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center hover:shadow-md transition-shadow duration-200">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-[#05092E] hover:text-[#F32D4F] transition-colors duration-200">BotanicCanvas</h1>
            <p className="text-xs text-[#05092E] hover:text-[#1a1f3a] transition-colors duration-200">Portal</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 p-4 overflow-auto">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            // Handle standalone items (like Home)
            if (item.isStandalone) {
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-sm ${activeSection === "overview"
                    ? "bg-[#F32D4F] text-white font-medium hover:bg-[#e02a47]"
                    : "hover:bg-gray-100 text-[#05092E] hover:text-[#F32D4F]"
                    }`}
                >
                  <item.icon className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
                  <span className="font-medium">{item.title}</span>
                </button>
              )
            }

            // Handle collapsible items
            return (
              <Collapsible
                key={item.id}
                open={openSections.includes(item.id)}
                onOpenChange={() => toggleSection(item.id)}
              >
                <CollapsibleTrigger asChild>
                  <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-[1.02] hover:shadow-sm group">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-[#05092E] transition-transform duration-200 group-hover:scale-110 group-hover:text-[#F32D4F]" />
                      <span className="text-[#05092E] font-medium group-hover:text-[#F32D4F] transition-colors duration-200">{item.title}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-200 group-data-[state=open]:rotate-180 group-hover:text-[#F32D4F]" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 ml-4 space-y-1">
                    {item.submenu?.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => setActiveSection(subItem.id)}
                        className={`w-full text-left p-2 rounded-md transition-all duration-200 hover:scale-[1.01] hover:shadow-sm ${activeSection === subItem.id
                          ? "bg-[#F32D4F] text-white font-medium hover:bg-[#e02a47]"
                          : "hover:bg-gray-50 text-[#05092E] hover:text-[#F32D4F] hover:bg-gray-100"
                          }`}
                      >
                        {subItem.title}
                      </button>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
