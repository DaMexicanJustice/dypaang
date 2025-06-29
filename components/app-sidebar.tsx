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
      submenu: [{ id: "generate-image-prompt", title: "Generate Prompt", href: "#" }],
    },
    {
      id: "video-flow",
      title: "Video Flow",
      icon: Video,
      submenu: [{ id: "generate-video-prompt", title: "Generate Prompt", href: "#" }],
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
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">BotanicCanvas</h1>
            <p className="text-xs text-gray-500">Portal</p>
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
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${activeSection === "overview"
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "hover:bg-gray-100 text-gray-700"
                    }`}
                >
                  <item.icon className="w-4 h-4" />
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
                  <button className="w-full flex items-center justify-between p-3 hover:bg-gray-100 rounded-lg transition-colors group">
                    <div className="flex items-center gap-3">
                      <item.icon className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-700 font-medium">{item.title}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 transition-transform group-data-[state=open]:rotate-180" />
                  </button>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="mt-2 ml-4 space-y-1">
                    {item.submenu?.map((subItem) => (
                      <button
                        key={subItem.id}
                        onClick={() => setActiveSection(subItem.id)}
                        className={`w-full text-left p-2 rounded-md transition-colors ${activeSection === subItem.id
                          ? "bg-blue-50 text-blue-700 font-medium"
                          : "hover:bg-gray-50 text-gray-600"
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
