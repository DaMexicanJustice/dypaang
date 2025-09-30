"use client"

import { OverviewSection } from "@/components/overview-section"
import { ImagePromptWizard } from "@/components/image-prompt-wizard"
import { OmniReferencePromptWizard } from "@/components/omni-reference-prompt-wizard"
import { VideoPromptWizard } from "@/components/video-prompt-wizard"
import { IntentSection } from "@/components/intent-section"
import { TutorialsSection } from "@/components/tutorials-section"

interface DashboardContentProps {
  activeSection: string
  onNavigate?: (section: string) => void
}

export function DashboardContent({ activeSection, onNavigate }: DashboardContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case "generate-image-prompt":
        return <ImagePromptWizard />
      case "generate-omni-reference-prompt":
        return <OmniReferencePromptWizard />
      case "generate-video-prompt":
        return <VideoPromptWizard onNavigate={onNavigate} />
      case "what-is-intent":
      case "chat-to-edit-examples":
        return (
          <IntentSection
            activeTab={activeSection}
            setActiveSection={(section: string) => {
              if (onNavigate) onNavigate(section)
            }}
          />
        )
      case "prompt-images":
      case "prompt-videos":
      case "use-intent":
      case "prompt-engineering":
        return <TutorialsSection activeTab={activeSection} />
      default:
        return <OverviewSection />
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 bg-[#4A5859] px-6">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-[#FBFBEB]">{getSectionTitle(activeSection)}</h2>
        </div>
      </header>
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  )
}

function getSectionTitle(section: string): string {
  const titles: Record<string, string> = {
    "generate-image-prompt": "Generate Image Prompt",
    "generate-omni-reference-prompt": "Generate Omni Reference Prompt",
    "generate-video-prompt": "Generate Video Prompt",
    "what-is-intent": "Understanding Intent",
    "chat-to-edit-examples": "Chat-To-Edit Examples",
    "prompt-images": "Image Prompting Tutorial",
    "prompt-videos": "Video Prompting Tutorial",
    "use-intent": "Using Intent Tutorial",
    "prompt-engineering": "Prompt Engineering Guide",
  }
  return titles[section] || "Dashboard Overview"
}
