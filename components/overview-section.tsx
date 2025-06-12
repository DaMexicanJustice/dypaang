"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Video, ArrowRight, Sparkles, Home } from "lucide-react"

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
    {
      title: "Generate Video Prompt",
      description: "Craft prompts for AI video generation",
      icon: Video,
      action: "Start Creating",
      section: "generate-video-prompt",
    },
    /* {
      title: "Explore Intent",
      description: "Learn about intent-driven prompting",
      icon: Brain,
      action: "Learn More",
      section: "what-is-intent",
    },
    {
      title: "View Tutorials",
      description: "Master the art of prompt engineering",
      icon: BookOpen,
      action: "Browse Guides",
      section: "prompt-images",
    }, */
  ]

  const handleActionClick = (section: string) => {
    if (onNavigate) {
      onNavigate(section)
    }
  }

  return (
    <div className="p-8 space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full text-sm font-medium text-blue-700 mb-4">
          <Sparkles className="w-4 h-4" />
          Neobotanik // Dypång
        </div>
        <h1 className="text-4xl font-bold text-gray-900">
          Craft Perfect Prompts for
          <span className="block text-blue-600">Generative AI Models</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Transform your ideas into precise, effective prompts that unlock the full potential of AI image and video
          generation.
        </p>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {quickActions.map((action, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
            <CardHeader className="pb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <action.icon className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-gray-900">{action.title}</CardTitle>
              <CardDescription className="text-gray-600">{action.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="ghost"
                className="w-full justify-between group-hover:bg-blue-50"
                onClick={() => handleActionClick(action.section)}
              >
                {action.action}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto pt-8">
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-gray-900">10K+</div>
          <div className="text-sm text-gray-600">Prompts Generated</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-gray-900">95%</div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
        <div className="text-center space-y-2">
          <div className="text-3xl font-bold text-gray-900">24/7</div>
          <div className="text-sm text-gray-600">AI Assistance</div>
        </div>
      </div> */}

      {/* Welcome Message */}
      <div className="max-w-2xl mx-auto text-center pt-8">
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Home className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">Welcome to BotanicCanvas</h3>
            </div>
            <p className="text-gray-600">
              Your portal for creating perfect prompts. Navigate through our tools using the sidebar menu,
              or click on any of the quick action cards above to get started.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
