"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ArrowRight,
  ArrowLeft,
  Copy,
  Download,
  HelpCircle,
  Sparkles,
  ImageIcon,
  Palette,
  Camera,
  Lightbulb,
} from "lucide-react"

export function ImagePromptWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    subject: "",
    style: "",
    mood: "",
    composition: "",
    lighting: "",
    details: "",
    aspectRatio: "",
    quality: "",
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    {
      id: 1,
      title: "Subject & Concept",
      description: "Define what you want to create",
      icon: ImageIcon,
    },
    {
      id: 2,
      title: "Style & Aesthetics",
      description: "Choose visual style and mood",
      icon: Palette,
    },
    {
      id: 3,
      title: "Technical Details",
      description: "Set composition and lighting",
      icon: Camera,
    },
    {
      id: 4,
      title: "Review & Generate",
      description: "Finalize your prompt",
      icon: Lightbulb,
    },
  ]

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const generatePrompt = () => {
    const parts = [
      formData.subject,
      formData.style && `${formData.style} style`,
      formData.mood && `${formData.mood} mood`,
      formData.composition,
      formData.lighting && `${formData.lighting} lighting`,
      formData.details,
    ].filter(Boolean)

    return parts.join(", ")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="subject" className="text-gray-700 font-medium">
                Main Subject
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Describe the main focus of your image (e.g., "a majestic lion", "modern architecture")</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="subject"
                placeholder="e.g., a serene mountain landscape"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="details" className="text-gray-700 font-medium">
                Additional Details
              </Label>
              <Textarea
                id="details"
                placeholder="Add specific details, objects, or elements you want to include..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="min-h-[100px]"
              />
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-gray-700 font-medium">Art Style</Label>
              <Select value={formData.style} onValueChange={(value) => setFormData({ ...formData, style: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose an art style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="photorealistic">Photorealistic</SelectItem>
                  <SelectItem value="digital art">Digital Art</SelectItem>
                  <SelectItem value="oil painting">Oil Painting</SelectItem>
                  <SelectItem value="watercolor">Watercolor</SelectItem>
                  <SelectItem value="minimalist">Minimalist</SelectItem>
                  <SelectItem value="surreal">Surreal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium">Mood & Atmosphere</Label>
              <Select value={formData.mood} onValueChange={(value) => setFormData({ ...formData, mood: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="serene">Serene</SelectItem>
                  <SelectItem value="dramatic">Dramatic</SelectItem>
                  <SelectItem value="mysterious">Mysterious</SelectItem>
                  <SelectItem value="vibrant">Vibrant</SelectItem>
                  <SelectItem value="melancholic">Melancholic</SelectItem>
                  <SelectItem value="energetic">Energetic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-gray-700 font-medium">Composition</Label>
              <Select
                value={formData.composition}
                onValueChange={(value) => setFormData({ ...formData, composition: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose composition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="close-up">Close-up</SelectItem>
                  <SelectItem value="wide shot">Wide Shot</SelectItem>
                  <SelectItem value="bird's eye view">Bird's Eye View</SelectItem>
                  <SelectItem value="low angle">Low Angle</SelectItem>
                  <SelectItem value="rule of thirds">Rule of Thirds</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium">Lighting</Label>
              <Select
                value={formData.lighting}
                onValueChange={(value) => setFormData({ ...formData, lighting: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select lighting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="golden hour">Golden Hour</SelectItem>
                  <SelectItem value="soft natural">Soft Natural</SelectItem>
                  <SelectItem value="dramatic shadows">Dramatic Shadows</SelectItem>
                  <SelectItem value="studio lighting">Studio Lighting</SelectItem>
                  <SelectItem value="neon">Neon</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium">Aspect Ratio</Label>
              <Select
                value={formData.aspectRatio}
                onValueChange={(value) => setFormData({ ...formData, aspectRatio: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose aspect ratio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1:1">Square (1:1)</SelectItem>
                  <SelectItem value="16:9">Landscape (16:9)</SelectItem>
                  <SelectItem value="9:16">Portrait (9:16)</SelectItem>
                  <SelectItem value="4:3">Standard (4:3)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )

      case 4:
        const generatedPrompt = generatePrompt()
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-gray-700 font-medium">Generated Prompt</Label>
              <div className="p-4 bg-blue-50 rounded-lg border">
                <p className="text-gray-800">
                  {generatedPrompt || "Complete the previous steps to generate your prompt"}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(generatedPrompt)}>
                <Copy className="w-4 h-4 mr-2" />
                Copy Prompt
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium">Prompt Summary</Label>
              <div className="flex flex-wrap gap-2">
                {formData.subject && <Badge variant="secondary">{formData.subject}</Badge>}
                {formData.style && <Badge variant="secondary">{formData.style}</Badge>}
                {formData.mood && <Badge variant="secondary">{formData.mood}</Badge>}
                {formData.lighting && <Badge variant="secondary">{formData.lighting}</Badge>}
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Image Prompt Generator</h1>
          <div className="text-sm text-gray-600">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Steps Navigation */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`p-4 rounded-lg border transition-all ${
              currentStep === step.id
                ? "border-blue-300 bg-blue-50"
                : currentStep > step.id
                  ? "border-green-300 bg-green-50"
                  : "border-gray-200 bg-white"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  currentStep === step.id
                    ? "bg-blue-500 text-white"
                    : currentStep > step.id
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-600"
                }`}
              >
                <step.icon className="w-4 h-4" />
              </div>
              <div className="text-sm font-medium text-gray-900">{step.title}</div>
            </div>
            <div className="text-xs text-gray-600">{step.description}</div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Sparkles className="w-5 h-5 text-blue-500" />
            {steps[currentStep - 1]?.title}
          </CardTitle>
          <CardDescription className="text-gray-600">{steps[currentStep - 1]?.description}</CardDescription>
        </CardHeader>
        <CardContent>{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentStep < totalSteps ? (
          <Button onClick={nextStep}>
            Next Step
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button>
            <Sparkles className="w-4 h-4 mr-2" />
            Generate New Prompt
          </Button>
        )}
      </div>
    </div>
  )
}
