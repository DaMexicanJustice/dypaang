"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Video, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"

interface OverviewSectionProps {
  onNavigate?: (section: string) => void
}

export function OverviewSection({ onNavigate }: OverviewSectionProps) {
  const quickActions = [
    {
      title: "Generate Image Prompt",
      description: "Create detailed prompts for AI image generation",
      icon: ImageIcon,
      action: "Start Creating",
      section: "generate-image-prompt",
    },
    /*    {
         title: "Generate Omni Reference Image Prompt",
         description: "Step by step guide to omni reference",
         icon: Layers,
         action: "Start Creating",
         section: "generate-omni-reference-prompt",
       }, */
    {
      title: "Generate Video Prompt",
      description: "Craft prompts for AI video generation",
      icon: Video,
      action: "Start Creating",
      section: "generate-video-prompt",
    },
  ]

  const handleActionClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section)
    }
  }

  return (
    <div className="space-y-0">
      {/* Hero Section - Navy with oversized display headline */}
      <div className="text-center space-y-4 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white mb-4">
          <Sparkles className="w-4 h-4" />
          <div className="flex items-center gap-2">
            <Image alt="Neobotanik" src="/neobotanik.png" width={200} height={200} />
            <Image alt="Dypång" src="/dypaang.png" width={200} height={200} />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-[#36151E]">
          Craft Optimal Prompts for
          <span className="block text-[#F32D4F]">Generative AI Models</span>
        </h1>
        <p className="text-lg text-[#36151E] max-w-2xl mx-auto">
          Transform your vision into vivid prompts—unlock AI-powered visuals that inspire, captivate, and <span className="font-bold">sell</span> the experience.
        </p>
      </div>

      {/* Quick Actions Grid on off-white paper */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto p-4">
        {quickActions.map((action, index) => (
          <Card
            key={index}
            className="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer group"
            onClick={() => handleActionClick(action.section)}
          >
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-lg bg-coral flex items-center justify-center mb-4 group-hover:brightness-110 group-hover:scale-110 transition-all duration-200">
                <action.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-navy group-hover:text-[#F32D4F] transition-colors duration-200">{action.title}</CardTitle>
              <CardDescription className="text-navy group-hover:text-[#1a1f3a] transition-colors duration-200">{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full"
              >
                <span>{action.action}</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Welcome Message */}
      {/* <div className="max-w-2xl mx-auto text-center pb-12 px-8">
        <Card className="bg-off-white border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Home className="w-5 h-5 text-coral" />
              <h3 className="text-lg font-semibold text-navy">Welcome to your BotanicCanvas</h3>
            </div>
            <p className="text-navy">
              Your portal for creating perfect prompts. Navigate through our tools using the sidebar menu,
              or click on any of the quick action cards above to get started.
            </p>
          </CardContent>
        </Card>
      </div> */}
    </div>
  )
}
