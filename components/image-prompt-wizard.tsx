"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Modal } from "@/components/ui/modal"
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
  Layers,
  Zap,
  Aperture,
  Sliders,
  Hash,
  Scissors,
  BookOpen,
  MapPin,
} from "lucide-react"

const INITIAL_FORM_DATA = {
  subject: "",
  style: "",
  mood: [] as string[],
  location: "",
  composition: "",
  lighting: "",
  details: "",
  aspectRatio: "",
  quality: "",
  negativePrompt: "",
  weight: "0.75",
  seed: "",
  selectedEmojis: [] as string[],
  cameraEffects: [] as string[],
  authorName: "",
}

function TipCard({ icon, title, tips, helpImageSrc, helpTitle, helpText }: { icon: React.ReactNode; title: string; tips: string[]; helpImageSrc?: string; helpTitle?: string; helpText?: string }) {
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const canShowHelp = Boolean(helpImageSrc || helpText)
  const displayHelpText = (helpText || "").replace(/\\n/g, "\n")

  return (
    <div className="bg-[#05092E] p-4 rounded-lg mt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-white flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </h3>
        {canShowHelp && (
          <Button size="sm" variant="outline" className="h-7 px-2 text-xs text-white" onClick={() => setIsHelpOpen(true)}>
            Example
          </Button>
        )}
      </div>
      <ul className="text-xs text-white space-y-1.5">
        {tips.map((tip, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-1.5">•</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>

      {isHelpOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 cursor-pointer transition-opacity duration-200 hover:bg-black/60" onClick={() => setIsHelpOpen(false)} />
          <div className="relative z-10 w-full max-w-lg bg-white rounded-lg border shadow-lg max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-white">
              <div className="text-sm font-bold text-gray-900">{helpTitle || title}</div>
              <Button size="sm" variant="ghost" onClick={() => setIsHelpOpen(false)}>Close</Button>
            </div>
            <div className="p-4 space-y-3">
              {helpImageSrc && (
                <Image src={helpImageSrc} alt={helpTitle || title} width={960} height={540} className="w-full h-auto rounded-md border" />
              )}
              {helpText && (
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{displayHelpText}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function ImagePromptWizard() {
  // Define initial state

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCompositionExamplesOpen, setIsCompositionExamplesOpen] = useState(false)
  const [isLightingExamplesOpen, setIsLightingExamplesOpen] = useState(false)
  const [isNavigationWarningOpen, setIsNavigationWarningOpen] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null)
  const [editablePrompt, setEditablePrompt] = useState("")
  const [editableNegativePrompt, setEditableNegativePrompt] = useState("")



  // Reset wizard when component mounts
  useEffect(() => {
    setCurrentStep(1)
    setFormData(INITIAL_FORM_DATA)
  }, [])

  // Check if form has unsaved changes
  const hasUnsavedChanges = () => {
    return Object.values(formData).some(value => {
      if (Array.isArray(value)) {
        return value.length > 0
      }
      return value !== "" && value !== "0.75"
    })
  }

  // Handle browser navigation warnings (refresh, back button, URL changes)
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges()) {
        e.preventDefault()
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?"
        return "You have unsaved changes. Are you sure you want to leave?"
      }
    }

    const handlePopState = (e: PopStateEvent) => {
      if (hasUnsavedChanges()) {
        e.preventDefault()
        setPendingNavigation(() => () => {
          // Allow the navigation to proceed
          window.history.pushState(null, "", window.location.href)
        })
        setIsNavigationWarningOpen(true)
        // Push the current state back to prevent immediate navigation
        window.history.pushState(null, "", window.location.href)
      }
    }

    // Add event listeners
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)

    // Cleanup
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [formData])

  // Confirm navigation and lose progress
  const confirmNavigation = () => {
    if (pendingNavigation) {
      pendingNavigation()
      setFormData(INITIAL_FORM_DATA)
      setCurrentStep(1)
    }
    setIsNavigationWarningOpen(false)
    setPendingNavigation(null)
  }

  // Cancel navigation
  const cancelNavigation = () => {
    setIsNavigationWarningOpen(false)
    setPendingNavigation(null)
  }

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    {
      id: 1,
      title: "Subject & Details",
      description: "Define the subject(s) of your image and supporting details.",
      icon: ImageIcon,
    },
    {
      id: 2,
      title: "Mood & Environment",
      description: "Choose a mood expression and the environment for the subject(s)",
      icon: Palette,
    },
    {
      id: 3,
      title: "Composition of the image",
      description: "Set composition and lighting",
      icon: Camera,
    },
    {
      id: 4,
      title: "Review & Generate",
      description: "Prompt review",
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
    if (formData.style) parts.push(`${formData.style} style`)
    if (formData.mood.length > 0) parts.push(`(${formData.mood.join(", ")} mood)`)
    if (formData.location) parts.push(`${formData.location} location`)
    if (formData.composition) parts.push(`–${formData.composition}`)
    if (formData.lighting) parts.push(`–${formData.lighting} lighting`)
    if ((formData.cameraEffects || []).length > 0) parts.push(`–Camera: ${(formData.cameraEffects || []).join(", ")}`)
    if (formData.details) parts.push(`–${formData.details}`)
    if (formData.aspectRatio) parts.push(`–Aspect ratio: ${formData.aspectRatio}`)

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

  const handleFinishAndCopy = () => {
    const generatedPrompt = generatePrompt()
    setEditablePrompt(generatedPrompt)
    setEditableNegativePrompt(formData.negativePrompt || "")
    setIsModalOpen(true)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="authorName" className="text-gray-700 font-medium flex items-center">
                Who is authoring this prompt today?
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        Add your name to attribute authorship in exported files. This helps keep
                        track of who created each prompt.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="authorName"
                placeholder="e.g., Patrick Jensen"
                value={formData.authorName ?? ""}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
              />
            </div>

            <div className="bg-[#F3415E] p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-white mr-2" />
                <h3 className="font-medium text-white">Prompt Engineering Guide: Subject & Details</h3>
              </div>
              <p className="text-sm text-white mb-2">
                The foundation of your image prompt starts with a clear subject. A subject is either a person, several people or objects.
                Once you understand your subject(s) - you will define additional details to describe them.
                Be precise and succinct when describing the appearance of subjects and remember to describe both people (clothes, age) as well as objects (in hand, on table, around them etc.)
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
                        Describe the subject(s) that will be the main focus of your image. Being specific helps the AI understand exactly what you
                        want. Consider naming people in your image to prevent AI-face issues where faces appear
                        deformed.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="subject"
                placeholder="e.g., James, Jacob and Emma in a hall venue celebrating. Sitting by their table."
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
                        Add specific details about what surrounds the subject(s) as well as the textures. Using vivid adjectives like rough,
                        silky, or glossy helps capture the essence of different surfaces. Including an action (e.g.,
                        a person gazing at the sunset) adds dynamism.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Textarea
                id="details"
                placeholder="Add specific details about what surrounds the subject(s), objects, or elements you want to include..."
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
                "Name people in your image (e.g., 'Jacob and Emma.') to prevent 'AI-face' issues",
                "Use vivid adjectives for textures like 'rough', 'silky', or 'glossy'",
                "Include an action (e.g., 'Jacob giving a toast while smiling at Emma') to add dynamism",
                "Consider a negative prompt if it is clear what you do not want.",
                "Use () to emphasize or group ideas.",
              ]}
              helpImageSrc="/example.png"
              helpTitle="How to prompt to create a similar image as the example:"
              helpText="First we define the subjects of the image. Instead of simply typing people, we assign our subjects a name.
              For example, James, Emma, Léa, Jacob and William sitting by their table celebrating. There is champagne and champagne glasses on a table. \n\n
              Next we define additional details: (table is wooden with a reflective surface) (subjects are toasting) 
              (festive decorations hanging from the ceiling) (brick wall background) (the table is in a room with a window) 
              (urban setting) (Subjects dressed in tailored suits, cocktail dresses) \n\n
              Next we define what we don't want (the negative prompt): medieval or fantasy elements. Nature and rural elements. 
              (blurry, distorted faces, extra limbs) (A lot of subjects) --Don't keep the image too crowded"
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-[#F3415E] p-4 rounded-lg border border-purple-100">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-white mr-2" />
                <h3 className="font-medium text-white">Prompt Engineering Guide: Mood & Environment</h3>
              </div>
              <p className="text-sm text-white mb-2">
                Once the subjects and core details of an image are defined, adding location, venue type, mood, and expressive elements helps shape the narrative and emotional tone of the scene.
                These contextual layers guide the AI to place the subjects in a setting that feels intentional and immersive—whether it iss a vibrant rooftop kick-off or a serene indoor depot.
                Expressive cues like emojis or mood tags further refine the atmosphere, ensuring the final image reflects not just what’s in it, but how it should feel to the viewer. While lighting sets the mood and creates depth.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <Label className="text-gray-700 font-medium flex items-center">
                  Venue Type
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>
                          Guide the placement of the subjects by specifying a venue type. Are they outdoors? Are they indoors? What can the guests expect.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select value={formData.style} onValueChange={(value) => setFormData({ ...formData, style: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an environment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="outdoor">Outdoor</SelectItem>
                    <SelectItem value="indoor">Indoor</SelectItem>
                    <SelectItem value="openair">Hybrid / Open-air</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-gray-700 font-medium flex items-center">
                  Custom Location
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>
                          Specify where the scene takes place. Consider the locales emotion invoked. Perhaps a big part of the experience
                          is the emotions invoked by being by the canal and fresh sea air.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input
                  placeholder="Enter custom location..."
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <Label className="text-gray-700 font-medium flex items-center">
                  Quick Select
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-sm">
                        <p>
                          Choose from predefined location options for quick setup. Be mindful of the venue type you have selected.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Select value={formData.location} onValueChange={(value) => setFormData({ ...formData, location: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose from list" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tableside">Table side</SelectItem>
                    <SelectItem value="by water">By water</SelectItem>
                    <SelectItem value="by harbor">By a harbor</SelectItem>
                    <SelectItem value="on grassy field">On grassy field</SelectItem>
                    <SelectItem value="in urban environment">In urban environment</SelectItem>
                    <SelectItem value="industrial indoor">Industrial indoor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 text-xs ml-2 hover:bg-[#36151E]"
                  onClick={() => setIsLightingExamplesOpen(true)}
                >
                  Examples
                </Button>
              </Label>
              <Select
                value={formData.lighting}
                onValueChange={(value) => setFormData({ ...formData, lighting: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select lighting" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="soft natural">Soft Natural</SelectItem>
                  <SelectItem value="golden hour">Golden Hour</SelectItem>
                  <SelectItem value="chiaroscuro">Chiaroscuro</SelectItem>
                  <SelectItem value="warm lit">Warm lit</SelectItem>
                  <SelectItem value="bokeh lights">Bokeh lights</SelectItem>
                  <SelectItem value="cool ambient light">Cool Ambient Light</SelectItem>
                  <SelectItem value="Contre-Jour">Contre-Jour</SelectItem>
                  <SelectItem value="Contre-Jour">Midday Sun</SelectItem>
                  <SelectItem value="Contre-Jour">Overcast Lighting</SelectItem>
                  <SelectItem value="Contre-Jour">Urban Night lights</SelectItem>
                  <SelectItem value="Contre-Jour">Neon Glow Lighting</SelectItem>
                  <SelectItem value="Contre-Jour">Fire light</SelectItem>
                  <SelectItem value="Contre-Jour">Fairy lights</SelectItem>
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
                        Select up to 3 moods to set the emotional tone of your image. Multiple moods can create richer,
                        more nuanced atmospheres. Consider how different mood combinations will affect how clients perceive the experience.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="text-xs text-gray-500 ml-2">({formData.mood.length}/3)</span>
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {[
                  "vibrant", "welcoming", "playful", "casual", "dynamic", "intimate",
                  "stylish", "modern", "cozy", "sophisticated", "eclectic", "relaxed",
                  "lush", "serene", "rustic"
                ].map((mood) => {
                  const isSelected = formData.mood.includes(mood)
                  const isDisabled = !isSelected && formData.mood.length >= 3

                  return (
                    <Button
                      key={mood}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      disabled={isDisabled}
                      className={isSelected
                        ? "bg-[#F3415E] hover:bg-[#F3415E]/90 text-white hover:shadow-md"
                        : isDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 hover:shadow-sm"
                      }
                      onClick={() => {
                        if (isSelected) {
                          setFormData({
                            ...formData,
                            mood: formData.mood.filter(m => m !== mood)
                          })
                        } else if (formData.mood.length < 3) {
                          setFormData({
                            ...formData,
                            mood: [...formData.mood, mood]
                          })
                        }
                      }}
                    >
                      {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </Button>
                  )
                })}
              </div>
              {formData.mood.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-sm text-gray-600">Selected:</span>
                  {formData.mood.map((mood) => (
                    <Badge key={mood} variant="secondary" className="text-xs">
                      {mood.charAt(0).toUpperCase() + mood.slice(1)}
                    </Badge>
                  ))}
                </div>
              )}
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
                        descriptions more engaging and help the AI understand the emotional tone you are aiming for.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <div className="flex flex-wrap gap-2">
                {["😊", "😍", "🌟", "✨", "🔥", "🌈", "🌙", "🌊", "🌿", "🏞️", "🚢", "🏛️", "🌅", "🧊", "🌬️", "🍻", "🌲", "🪵", "💼", "🧠", "📊", "🎨", "🎤", "🥂", "🔮", "🎶", "👀"].map((emoji) => {
                  const isSelected = formData.selectedEmojis.includes(emoji)
                  return (
                    <Button
                      key={emoji}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      className={isSelected
                        ? "bg-blue-500 hover:bg-blue-600 text-white border-blue-500 hover:shadow-md"
                        : "hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 hover:shadow-sm"
                      }
                      onClick={() => {
                        const newSelectedEmojis = isSelected
                          ? formData.selectedEmojis.filter(e => e !== emoji)
                          : [...formData.selectedEmojis, emoji]

                        const emojiText = isSelected
                          ? formData.details.replace(new RegExp(`\\s*${emoji}\\s*`, 'g'), ' ').trim()
                          : formData.details + " " + emoji

                        setFormData({
                          ...formData,
                          selectedEmojis: newSelectedEmojis,
                          details: emojiText
                        })
                      }}
                    >
                      {emoji}
                    </Button>
                  )
                })}
              </div>
            </div>

            <TipCard
              icon={<Palette className="w-4 h-4" />}
              title="Mood & Environment Tips"
              tips={[
                "Blend multiple location specifying keywords to get the atmosphere just right.",
                "Consider how different moods (serene, dramatic, mysterious) affect perception",
                "Emojis can add personality and emphasis to your prompts",
                "Use () to emphasize or group ideas.",
              ]}
              helpImageSrc="/example.png"
              helpTitle="Dial in the look and feel"
              helpText="For this step we define the venue type, mood, location and emoji expression for the example image generated. \n\n
              We choose (indoor, table side) for our venue type. \n We choose (modern) for the atmosphere. \n
              🥂 😄 👔 ✨ 🤝 💬 🍾 🕯️"
            />
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-[#F3415E] p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-white mr-2" />
                <h3 className="font-medium text-white">Prompt Engineering Guide: Technical Details</h3>
              </div>
              <p className="text-sm text-white mb-2">
                Camera techniques and lighting dramatically affect your image. Different angles and lenses create varied
                effects, while lighting sets the mood and creates depth.
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
                        The perspective of an image can transform its impact. Different angles like birds-eye view,
                        frog perspective, or helicopter view create varied effects suited to different compositions. The
                        right composition guides the viewers eye through the image.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 px-2 text-xs ml-2 hover:bg-[#36151E]"
                  onClick={() => setIsCompositionExamplesOpen(true)}
                >
                  Examples
                </Button>
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
                  <SelectItem value="wide shot">Wide Angle Shot</SelectItem>
                  <SelectItem value="bird's eye view">Birds Eye View</SelectItem>
                  <SelectItem value="low angle">Low Angle</SelectItem>
                  <SelectItem value="rule of thirds">Rule of Thirds</SelectItem>
                  <SelectItem value="Drone">Drone Camera</SelectItem>
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: "Square", value: "1:1", ar: "1 / 1" },
                  { label: "Landscape", value: "16:9", ar: "16 / 9" },
                  { label: "Portrait", value: "9:16", ar: "9 / 16" },
                  { label: "Standard", value: "4:3", ar: "4 / 3" },
                ].map((ratio) => {
                  const isSelected = formData.aspectRatio === ratio.value
                  return (
                    <button
                      key={ratio.value}
                      type="button"
                      className={`${isSelected ? "ring-2 ring-[#F3415E]" : "border-gray-300 hover:border-amber-300 hover:shadow-sm"} w-full rounded-md border bg-white transition focus:outline-none`}
                      onClick={() => setFormData({ ...formData, aspectRatio: ratio.value })}
                    >
                      <div className="p-3">
                        <div className="h-16 rounded-sm overflow-hidden border border-white/60 bg-gradient-to-br from-sky-200 to-teal-200" style={{ aspectRatio: ratio.ar }} />
                        <div className="mt-2 text-center">
                          <div className="text-sm font-medium text-gray-900">{ratio.label}</div>
                          <div className="text-xs text-gray-600">{ratio.value}</div>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium flex items-center">
                Camera Effects & Lenses
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        Select up to 5 camera-related effects or lens choices to refine the photographic
                        look, such as flash, vignettes, long exposure, or lens types.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <span className="text-xs text-gray-500 ml-2">({(formData.cameraEffects || []).length}/5)</span>
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {[
                  "flash photography",
                  "vignette",
                  "wide-angle lens",
                  "telephoto lens",
                  "prime lens",
                  "fisheye lens",
                  "tilt-shift",
                  "long exposure",
                  "shallow depth of field",
                  "bokeh",
                  "polarizing filter",
                  "HDR look",
                  "cinematic grain",
                  "soft focus",
                ].map((effect) => {
                  const currentEffects = formData.cameraEffects || []
                  const isSelected = currentEffects.includes(effect)
                  const isDisabled = !isSelected && currentEffects.length >= 5

                  return (
                    <Button
                      key={effect}
                      variant={isSelected ? "default" : "outline"}
                      size="sm"
                      disabled={isDisabled}
                      className={isSelected
                        ? "bg-[#F3415E] hover:bg-[#F3415E]/90 text-white hover:shadow-md"
                        : isDisabled
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 hover:shadow-sm"
                      }
                      onClick={() => {
                        const current = formData.cameraEffects || []
                        if (isSelected) {
                          setFormData({
                            ...formData,
                            cameraEffects: current.filter(e => e !== effect)
                          })
                        } else if (current.length < 5) {
                          setFormData({
                            ...formData,
                            cameraEffects: [...current, effect]
                          })
                        }
                      }}
                    >
                      {effect.charAt(0).toUpperCase() + effect.slice(1)}
                    </Button>
                  )
                })}
              </div>
              {(formData.cameraEffects || []).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="text-sm text-gray-600">Selected:</span>
                  {(formData.cameraEffects || []).map((effect) => (
                    <Badge key={effect} variant="secondary" className="text-xs">
                      {effect.charAt(0).toUpperCase() + effect.slice(1)}
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div> */}

            <TipCard
              icon={<Camera className="w-4 h-4" />}
              title="Composition of the image Tips"
              tips={[
                "Think like a photographer: You know what subjects you are capturing and what mood you are trying to set.",
                "Different angles create varied effects: bird's-eye view, low angle, etc.",
                "Lighting plays a crucial role in setting mood and atmosphere",
                "The aspect ratio shapes your composition: square (1:1) for social media, landscape (16:9) for cinematic scenes",
                "Use () to emphasize or group ideas.",
                "Use -- to set parameters like aspect ratio or style.",
              ]}
              helpImageSrc="/example.png"
              helpTitle="Getting the composition right"
              helpText="We are utilizing three elements to create the example image: composition, lighting & aspect ratio. \n\n
              --16:9 \n
              (Soft natural lighting). (golden hour.) \n
              --Wide angle shot. (Use rule of thirds.)"
            />
          </div>
        )

      case 4:
        const generatedPrompt = generatePrompt()

        return (
          <div className="space-y-6">
            <div className="bg-[#F3415E] p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-white mr-2" />
                <h3 className="font-medium text-white">Prompt Engineering Guide: Finishing touches</h3>
              </div>
              <p className="text-sm text-white mb-2">
                Review your prompt elements below and navigate back to make changes. When you are satisfied and ready to generate images with your text to image prompt
                use the &ldquo;Finish & Copy&rdquo; button to open the prompt editor.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-gray-700 font-medium">Generated Prompt Preview</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-sm text-[#F3415E]">
                        <Layers className="w-4 h-4 mr-1" />
                        <span>Text To Image Prompt</span>
                        <HelpCircle className="w-4 h-4 ml-1" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        A well formed text prompt should include subject(s) and details about them set in an appropriate mood and environment,
                        where you are mindful of the compositional parts (thinking like a photographer), including natural language enhancements (--) and () to group and emphasize.
                        Speaking of emphasis do not forget about ℹ️ emojis.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="p-4 bg-[#F3415E]/10 rounded-lg whitespace-pre-line">
                <p className="text-gray-800">
                  {generatedPrompt || "Complete the previous steps to generate your prompt"}
                </p>
              </div>

              {formData.negativePrompt && (
                <div className="mt-4">
                  <div className="flex items-center mb-2">
                    <Scissors className="w-4 h-4 mr-2 text-red-500" />
                    <span className="text-sm font-medium">Negative Prompt Preview:</span>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg border border-red-100">
                    <p className="text-gray-800">{formData.negativePrompt}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                variant="default"
                size="lg"
                onClick={handleFinishAndCopy}
                className="bg-coral hover:bg-coral/90 text-white hover:shadow-lg"
              >
                <Copy className="w-4 h-4 mr-2" />
                Finish & Copy
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
                {formData.mood.length > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          {formData.mood.join(", ")}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Mood: {formData.mood.join(", ")}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {formData.location && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {formData.location}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Location: {formData.location}</p>
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
                {(formData.cameraEffects || []).length > 0 && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Aperture className="w-3 h-3" />
                          {(formData.cameraEffects || []).join(", ")}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Camera: {(formData.cameraEffects || []).join(", ")}</p>
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
              title="General tips using your text prompt"
              tips={[
                "AI can be unpredictable—repeat and refine. If results fall short, describe what’s missing and tweak your prompt.",
                "The order of words can be as important as the worlds themselves",
                "Use structured dividers (–) to separate important elements within your prompt",
                "Adjust weight to control how strictly the AI follows your prompt",
                "Consider using a consistent seed for a series of related images",
              ]}
              helpImageSrc="/example.png"
              helpTitle="Results"
              helpText="There you go. You are now ready to have fun watching the fruits of your labor. \n\n
              Generate. Generate. Generate. Even with the optimal text prompt the nature of AI is random. \n"
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
          <h1 className="text-2xl font-semibold text-gray-900">Image Prompt Progress</h1>
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
            className={`p-4 rounded-lg transition-all duration-200 border-2 border-[#F3415E] hover:shadow-md hover:scale-[1.02] cursor-pointer ${currentStep === step.id
              ? "bg-[#FBFBEB] hover:bg-[#FBFBEB]/90"
              : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            onClick={() => setCurrentStep(step.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault()
                setCurrentStep(step.id)
              }
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentStep === step.id
                  ? "bg-[#F3415E] text-white"
                  : currentStep > step.id
                    ? "bg-[#36151E] text-white"
                    : "bg-gray-200 text-gray-600"
                  }`}
              >
                <step.icon className="w-4 h-4" />
              </div>
              <div className="text-sm font-bold text-slate-900">{step.title}</div>
            </div>
            <div className="text-xs text-black">{step.description}</div>
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
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        {currentStep < totalSteps ? (
          <Button onClick={nextStep}>
            Next Step
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleFinishAndCopy}>
            <Sparkles className="w-4 h-4 mr-2" />
            Finish & Copy
          </Button>
        )}
      </div>

      {/* Prompt Editor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit or Copy Your Prompts"
        className="max-w-4xl"
      >
        <div className="space-y-6">
          {/* Generated Prompt Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-gray-700 font-medium text-lg">Generated Prompt</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(editablePrompt)}
                  className="hover:bg-[#FBFBEB] hover:border-[#F3415E]"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Create plain text export
                    const textContent = `AI Image Generation Prompt
Author: ${formData.authorName || 'Unknown'}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

PROMPT:
${editablePrompt}

PARAMETERS:
- Aspect Ratio: ${formData.aspectRatio || 'Default'}
- Quality: ${formData.quality || 'Default'}
- Weight: ${formData.weight || 'Default'}
- Seed: ${formData.seed || 'Random'}

METADATA:
- Subject: ${formData.subject || 'N/A'}
- Style: ${formData.style || 'N/A'}
- Mood: ${formData.mood.length > 0 ? formData.mood.join(", ") : 'N/A'}
- Location: ${formData.location || 'N/A'}
- Composition: ${formData.composition || 'N/A'}
- Lighting: ${formData.lighting || 'N/A'}
- Camera: ${formData.cameraEffects && formData.cameraEffects.length > 0 ? formData.cameraEffects.join(", ") : 'N/A'}
 - Camera: ${(formData.cameraEffects || []).length > 0 ? (formData.cameraEffects || []).join(", ") : 'N/A'}
- Details: ${formData.details || 'N/A'}`

                    // Create and download text file
                    const dataBlob = new Blob([textContent], { type: 'text/plain' })
                    const url = URL.createObjectURL(dataBlob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `prompt-${Date.now()}.txt`
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    URL.revokeObjectURL(url)
                  }}
                  className="hover:bg-[#FBFBEB] hover:border-[#F3415E]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export TXT
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Create export data
                    const exportData = {
                      prompt: editablePrompt,
                      parameters: {
                        aspectRatio: formData.aspectRatio,
                        quality: formData.quality,
                        weight: formData.weight,
                        seed: formData.seed
                      },
                      metadata: {
                        author: formData.authorName || undefined,
                        subject: formData.subject,
                        style: formData.style,
                        mood: formData.mood.join(", "),
                        location: formData.location,
                        composition: formData.composition,
                        lighting: formData.lighting,
                        camera: formData.cameraEffects || [],
                        details: formData.details,
                        generatedAt: new Date().toISOString(),
                        source: "Image Prompt Wizard"
                      }
                    }

                    // Create and download JSON file
                    const dataStr = JSON.stringify(exportData, null, 2)
                    const dataBlob = new Blob([dataStr], { type: 'application/json' })
                    const url = URL.createObjectURL(dataBlob)
                    const link = document.createElement('a')
                    link.href = url
                    link.download = `prompt-${Date.now()}.json`
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    URL.revokeObjectURL(url)
                  }}
                  className="hover:bg-[#FBFBEB] hover:border-[#F3415E]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export JSON
                </Button>
              </div>
            </div>
            <Textarea
              value={editablePrompt}
              onChange={(e) => setEditablePrompt(e.target.value)}
              placeholder="Your generated prompt will appear here..."
              className="min-h-[200px] text-sm font-mono"
            />
          </div>

          <hr></hr>

          {/* Negative Prompt Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-gray-700 font-medium text-lg">Negative Prompt</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigator.clipboard.writeText(editableNegativePrompt)}
                className="hover:bg-[#FBFBEB] hover:border-[#F3415E]"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy to Clipboard
              </Button>
            </div>
            <Textarea
              value={editableNegativePrompt}
              onChange={(e) => setEditableNegativePrompt(e.target.value)}
              placeholder="Your negative prompt will appear here..."
              className="min-h-[150px] text-sm font-mono"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="default"
              onClick={() => {
                const fullPrompt = `Prompt:\n${editablePrompt}\n\n${editableNegativePrompt ? `Negative Prompt:\n${editableNegativePrompt}` : ""}`
                navigator.clipboard.writeText(fullPrompt)
              }}
              className=""
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Both Prompts
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="hover:bg-[#FBFBEB] hover:border-[#F3415E]"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Composition Examples Modal */}
      <Modal
        isOpen={isCompositionExamplesOpen}
        onClose={() => setIsCompositionExamplesOpen(false)}
        title="Composition Examples"
        className="max-w-6xl"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { value: "close-up", label: "Close-up", description: "Intimate, detailed view focusing on specific elements" },
              { value: "wide-angle-shot", label: "Wide Angle Shot", description: "Broad perspective showing the full scene" },
              { value: "birds-eye-view", label: "Bird's Eye View", description: "Overhead perspective looking down" },
              { value: "low-angle", label: "Low Angle", description: "Looking up from below for dramatic effect" },
              { value: "rule-of-thirds", label: "Rule of Thirds", description: "Composition following the rule of thirds grid" },
              { value: "drone-camera", label: "Drone Camera", description: "Aerial perspective with drone-like positioning" }
            ].map((composition) => (
              <div key={composition.value} className="space-y-3">
                <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={`/${composition.value.replace(/[^a-z0-9]/g, '-')}.jpg`}
                    alt={composition.label}
                    width={400}
                    height={225}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/example.png"
                    }}
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{composition.label}</h3>
                  <p className="text-sm text-gray-600">{composition.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {/* Lighting Examples Modal */}
      <Modal
        isOpen={isLightingExamplesOpen}
        onClose={() => setIsLightingExamplesOpen(false)}
        title="Lighting Examples"
        className="max-w-4xl"
      >
        <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
          <p className="text-sm text-gray-600">
            Different lighting techniques can dramatically change the mood and atmosphere of your image. Choose the
            lighting style that best matches your desired emotional tone.
          </p>
          <div className="flex flex-col gap-4">
            <div className="rounded-md overflow-hidden border">
              <Image
                src="/lighting.png"
                alt="Lighting Examples"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="rounded-md overflow-hidden border">
              <Image
                src="/lighting-2.png"
                alt="Lighting Examples 2"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </Modal>

      {/* Navigation Warning Modal */}
      <Modal
        isOpen={isNavigationWarningOpen}
        onClose={cancelNavigation}
        title="Unsaved Changes"
        className="max-w-md"
      >
        <div className="space-y-4">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              You have unsaved changes
            </h3>
            <p className="text-sm text-gray-600">
              Navigating away will lose all your progress. Are you sure you want to continue?
            </p>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={cancelNavigation}
              className="flex-1 sm:flex-none hover:bg-gray-50 hover:border-gray-300"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmNavigation}
              className="flex-1 sm:flex-none hover:bg-red-600 hover:shadow-lg"
            >
              Continue & Lose Progress
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
