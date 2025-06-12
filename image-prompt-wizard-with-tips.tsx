"use client"

import type React from "react"

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
  Minus,
  Plus,
  Layers,
  Zap,
  Aperture,
  Sliders,
  Hash,
  Scissors,
  BookOpen,
} from "lucide-react"

function TipCard({ icon, title, tips }: { icon: React.ReactNode; title: string; tips: string[] }) {
  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
      <h3 className="text-sm font-medium text-blue-800 flex items-center mb-2">
        {icon}
        <span className="ml-2">{title}</span>
      </h3>
      <ul className="text-xs text-blue-700 space-y-1.5">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-1.5">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

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
    negativePrompt: "",
    weight: "0.75",
    seed: "",
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
    // Using natural language dividers as recommended in the principles
    const parts = []

    if (formData.subject) parts.push(formData.subject)
    if (formData.style) parts.push(`– ${formData.style} style`)
    if (formData.mood) parts.push(`– ${formData.mood} mood`)
    if (formData.composition) parts.push(`– ${formData.composition}`)
    if (formData.lighting) parts.push(`– ${formData.lighting} lighting`)
    if (formData.details) parts.push(`– ${formData.details}`)
    if (formData.aspectRatio) parts.push(`– Aspect ratio: ${formData.aspectRatio}`)

    // Add weight parameter if different from default
    if (formData.weight !== "0.75") {
      parts.push(`– Weight: ${formData.weight}`)
    }

    // Add seed if provided
    if (formData.seed) {
      parts.push(`– Seed: ${formData.seed}`)
    }

    return parts.join("\n")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-medium text-blue-800">Prompt Engineering Guide: Subject & Concept</h3>
              </div>
              <p className="text-sm text-blue-700 mb-2">
                The foundation of your image prompt starts with a clear subject. Specificity and natural language make
                AI interactions more intuitive. Being precise while keeping prompts conversational ensures the AI
                interprets your requests effectively.
              </p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="subject" className="text-gray-700 font-medium flex items-center">
                Main Subject
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        Describe the main focus of your image. Being specific helps the AI understand exactly what you
                        want. Consider naming people in your image to prevent "AI-face" issues where faces appear
                        deformed.
                      </p>
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
              <Label htmlFor="details" className="text-gray-700 font-medium flex items-center">
                Additional Details
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        Add specific details about textures, objects, or elements. Using vivid adjectives like "rough,"
                        "silky," or "glossy" helps capture the essence of different surfaces. Including an action (e.g.,
                        "a person gazing at the sunset") adds dynamism.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Textarea
                id="details"
                placeholder="Add specific details, objects, or elements you want to include..."
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="negativePrompt" className="text-gray-700 font-medium flex items-center">
                Negative Prompt
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        Define what should be excluded from your image. Specifying elements to avoid ensures greater
                        accuracy in achieving the desired results and can help prevent common AI generation issues.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Textarea
                id="negativePrompt"
                placeholder="Elements to exclude (e.g., blurry, distorted faces, extra limbs)..."
                value={formData.negativePrompt}
                onChange={(e) => setFormData({ ...formData, negativePrompt: e.target.value })}
                className="min-h-[80px]"
              />
            </div>

            <TipCard
              icon={<Lightbulb className="w-4 h-4" />}
              title="Subject & Concept Tips"
              tips={[
                "Be specific about your main subject to help the AI understand exactly what you want",
                "Name people in your image (e.g., 'John Smith looking at mountains') to prevent 'AI-face' issues",
                "Use vivid adjectives for textures like 'rough', 'silky', or 'glossy'",
                "Include an action (e.g., 'a person gazing at the sunset') to add dynamism",
                "Use negative prompts to exclude unwanted elements and refine the AI's output",
              ]}
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-100">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-purple-600 mr-2" />
                <h3 className="font-medium text-purple-800">Prompt Engineering Guide: Style & Aesthetics</h3>
              </div>
              <p className="text-sm text-purple-700 mb-2">
                Style fusion is a powerful technique that blends multiple artistic influences to create unique
                compositions. The mood sets the emotional tone, while expressive elements like emojis add personality
                and emphasis to your prompts.
              </p>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium flex items-center">
                Art Style
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        Style fusion is a powerful technique. Blending multiple artistic styles can create unique and
                        visually striking compositions. Consider combining different influences for a distinctive
                        aesthetic that stands out.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
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
              <Label className="text-gray-700 font-medium flex items-center">
                Mood & Atmosphere
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        The mood sets the emotional tone of your image. It works together with lighting to create the
                        overall atmosphere. Consider how different moods (serene, dramatic, mysterious) will affect how
                        viewers perceive your image.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
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

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium flex items-center">
                Expressive Elements
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        Emojis and expressive elements can add personality and emphasis to your prompts. They make
                        descriptions more engaging and help the AI understand the emotional tone you're aiming for.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <div className="flex flex-wrap gap-2">
                {["😊", "😍", "🌟", "✨", "🔥", "🌈", "🌙", "🌊", "🌿", "🏞️"].map((emoji) => (
                  <Button
                    key={emoji}
                    variant="outline"
                    size="sm"
                    onClick={() => setFormData({ ...formData, details: formData.details + " " + emoji })}
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            </div>

            <TipCard
              icon={<Palette className="w-4 h-4" />}
              title="Style & Aesthetics Tips"
              tips={[
                "Blend multiple artistic styles for unique and visually striking compositions",
                "Consider how different moods (serene, dramatic, mysterious) affect perception",
                "Emojis can add personality and emphasis to your prompts",
                "Match the style and mood to complement your subject matter",
                "Experiment with contrasting styles for creative results",
              ]}
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-medium text-green-800">Prompt Engineering Guide: Technical Details</h3>
              </div>
              <p className="text-sm text-green-700 mb-2">
                Camera techniques and lighting dramatically affect your image. Different angles and lenses create varied
                effects, while lighting sets the mood and creates depth. Technical parameters like seed values and
                weight control ensure consistency and balance AI creativity.
              </p>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium flex items-center">
                Composition
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        The perspective of an image can transform its impact. Different angles like bird's-eye view,
                        frog perspective, or helicopter view create varied effects suited to different compositions. The
                        right composition guides the viewer's eye through the image.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
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
              <Label className="text-gray-700 font-medium flex items-center">
                Lighting
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        Lighting plays a crucial role in setting the mood and atmosphere. Consider specifying multiple
                        light sources for dynamic interplay and using techniques like chiaroscuro to create depth and
                        contrast. The type of lighting—soft, dramatic, neon glow—significantly enhances the scene.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
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
              <Label className="text-gray-700 font-medium flex items-center">
                Aspect Ratio
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        The aspect ratio determines the shape of your image. Different ratios serve different purposes:
                        square (1:1) for social media posts, landscape (16:9) for cinematic scenes, portrait (9:16) for
                        mobile displays.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label className="text-gray-700 font-medium flex items-center">
                  Weight Control
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>
                          Adjusting the weight parameter influences AI freedom in creativity. A heavier weight (closer
                          to 1.0) restricts deviation, while a lighter weight allows for more interpretation. The
                          recommended default is 0.75.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newWeight = Math.max(0.1, Number.parseFloat(formData.weight) - 0.05).toFixed(2)
                      setFormData({ ...formData, weight: newWeight })
                    }}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="flex-1 text-center">
                    <span className="text-sm font-medium">{formData.weight}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      const newWeight = Math.min(1, Number.parseFloat(formData.weight) + 0.05).toFixed(2)
                      setFormData({ ...formData, weight: newWeight })
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="seed" className="text-gray-700 font-medium flex items-center">
                  Seed Value
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>
                          The seed value determines whether an AI-generated image can be recreated identically each
                          time. Using the same seed with the same prompt will produce consistent results, allowing for
                          reproducibility.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  id="seed"
                  placeholder="Optional: Enter a seed number"
                  value={formData.seed}
                  onChange={(e) => setFormData({ ...formData, seed: e.target.value })}
                />
              </div>
            </div>

            <TipCard
              icon={<Camera className="w-4 h-4" />}
              title="Technical Details Tips"
              tips={[
                "Different angles create varied effects: bird's-eye view, low angle, etc.",
                "Lighting plays a crucial role in setting mood and atmosphere",
                "Consider multiple light sources for dynamic interplay",
                "Use techniques like chiaroscuro to create depth and contrast",
                "The aspect ratio shapes your composition: square (1:1) for social media, landscape (16:9) for cinematic scenes",
                "A weight of 0.75 is recommended for balanced AI creativity",
                "Save your seed number to recreate similar images later",
              ]}
            />
          </div>
        )

      case 4:
        const generatedPrompt = generatePrompt()
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-100">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-amber-600 mr-2" />
                <h3 className="font-medium text-amber-800">Prompt Engineering Guide: Master Prompt</h3>
              </div>
              <p className="text-sm text-amber-700 mb-2">
                A master prompt defines the overarching scene, characters, colors, and mood while integrating all key
                principles. Using structured dividers (–) helps separate important elements within the prompt, improving
                clarity and guiding AI interpretation effectively.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-gray-700 font-medium">Generated Prompt</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-sm text-blue-600">
                        <Layers className="w-4 h-4 mr-1" />
                        <span>Master Prompt Structure</span>
                        <HelpCircle className="w-4 h-4 ml-1" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        This follows the master prompt structure, which defines the overarching scene, characters,
                        colors, and mood while integrating all key principles. The structured dividers (–) help separate
                        important elements within the prompt, improving clarity and guiding AI interpretation
                        effectively.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border whitespace-pre-line">
                <p className="text-gray-800">
                  {generatedPrompt || "Complete the previous steps to generate your prompt"}
                </p>
              </div>

              {formData.negativePrompt && (
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <Scissors className="w-4 h-4 mr-2 text-red-500" />
                    <span className="text-sm font-medium">Negative Prompt:</span>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                    <p className="text-gray-800">{formData.negativePrompt}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const fullPrompt = `Prompt:\n${generatedPrompt}\n\n${formData.negativePrompt ? `Negative Prompt:\n${formData.negativePrompt}` : ""}`
                  navigator.clipboard.writeText(fullPrompt)
                }}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Prompt
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium">Prompt Elements</Label>
              <div className="flex flex-wrap gap-2">
                {formData.subject && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" />
                          {formData.subject.length > 20 ? formData.subject.substring(0, 20) + "..." : formData.subject}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Main subject: {formData.subject}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {formData.style && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Palette className="w-3 h-3" />
                          {formData.style}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Art style: {formData.style}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {formData.mood && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {formData.mood}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Mood: {formData.mood}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {formData.lighting && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Aperture className="w-3 h-3" />
                          {formData.lighting}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Lighting: {formData.lighting}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {formData.composition && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          {formData.composition}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Composition: {formData.composition}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {formData.aspectRatio && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Sliders className="w-3 h-3" />
                          {formData.aspectRatio}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Aspect ratio: {formData.aspectRatio}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {formData.seed && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Hash className="w-3 h-3" />
                          Seed: {formData.seed}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Seed value for reproducibility</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>

            <TipCard
              icon={<Sparkles className="w-4 h-4" />}
              title="Master Prompt Structure Tips"
              tips={[
                "Use structured dividers (–) to separate important elements within your prompt",
                "The master prompt defines the overarching scene, characters, colors, and mood",
                "Natural language makes AI interactions more intuitive",
                "Keep prompts precise and conversational for better interpretation",
                "Adjust weight to control how strictly the AI follows your prompt",
                "Consider using a consistent seed for a series of related images",
              ]}
            />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
