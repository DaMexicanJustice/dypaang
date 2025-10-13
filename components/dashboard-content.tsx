"use client"

import { OverviewSection } from "@/components/overview-section"
import { ImagePromptWizard } from "@/components/image-prompt-wizard"
import { OmniReferencePromptWizard } from "@/components/omni-reference-prompt-wizard"
import { VideoPromptWizard } from "@/components/video-prompt-wizard"
import { IntentSection } from "@/components/intent-section"
import { PromptPrinciplesSection } from "./prompt-principles-section"
import { PromptVsIntentSection } from "./prompt-vs-intent-section"

interface DashboardContentProps {
  activeSection: string
  onNavigate?: (section: string) => void
}

export function DashboardContent({ activeSection, onNavigate }: DashboardContentProps) {
  const renderContent = () => {
    switch (activeSection) {
      case "generate-image-prompt":
        return <ImagePromptWizard />
      case "omni-reference-prompt-wizard":
        return <OmniReferencePromptWizard
          setActiveSection={(section: string) => {
            if (onNavigate) onNavigate(section)
          }}
        />
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
      case "prompt-principles-section":
        return <PromptPrinciplesSection />
      case "prompt-vs-intent-section":
        return <PromptVsIntentSection />
      default:
        return <OverviewSection />
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-4 border-b border-gray-200 bg-[#05092E] px-6">
        <div className="flex-1">
          <h2 className="text-xl font-black text-[#FBFBEB]">{getSectionTitle(activeSection)}</h2>
        </div>
      </header>
      <div className="flex-1 overflow-auto">{renderContent()}</div>
    </div>
  )
}

function getSectionTitle(section: string): string {
  const titles: Record<string, string> = {
    "generate-image-prompt": "Generate Moodboard Image Prompt",
    "omni-reference-prompt-wizard": "Generate Venue Image Prompt",
    "generate-video-prompt": "Generate Video Prompt",
    "what-is-intent": "Intro: Nano Banana AI Brain",
    "chat-to-edit-examples": "Chat-To-Edit Feature",
    "prompt-principles-section": "Key Prompting Principles",
    "prompt-vs-intent-section": "Prompt engineering vs. Intent-Driven",
  }
  return titles[section] || "Dashboard Overview"
}
