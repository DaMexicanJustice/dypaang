"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Video } from "@/components/ui/video"
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
  Camera,
  Lightbulb,
  Layers,
  Hash,
  // Scissors,
  BookOpen,
} from "lucide-react"

const INITIAL_FORM_DATA = {
  subject: "",
  details: "",
  filmGrain: "",
  motionSpeed: "",
  cameraMovement: "",
  weight: "0.75",
  seed: "",
  selectedEmojis: [] as string[],
}

function TipCard({ icon, title, tips, helpVideoSrc, helpTitle, helpText }: { icon: React.ReactNode; title: string; tips: string[]; helpVideoSrc?: string; helpTitle?: string; helpText?: string }) {
  const [isHelpOpen, setIsHelpOpen] = useState(false)
  const canShowHelp = Boolean(helpVideoSrc || helpText)
  const displayHelpText = (helpText || "").replace(/\\n/g, "\n")

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-blue-800 flex items-center">
          {icon}
          <span className="ml-2">{title}</span>
        </h3>
        {canShowHelp && (
          <Button size="sm" variant="outline" className="h-7 px-2 text-xs hover:bg-blue-100 hover:border-blue-300" onClick={() => setIsHelpOpen(true)}>
            Example
          </Button>
        )}
      </div>
      <ul className="text-xs text-blue-700 space-y-1.5">
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
              {helpVideoSrc && (
                helpVideoSrc.endsWith('.mp4') ? (
                  <Video src={helpVideoSrc} alt={helpTitle || title} />
                ) : (
                  <Image src={helpVideoSrc} alt={helpTitle || title} width={960} height={540} className="w-full h-auto rounded-md border" />
                )
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

interface VideoPromptWizardProps {
  onNavigate?: (section: string) => void
}

export function VideoPromptWizard({ onNavigate }: VideoPromptWizardProps) {
  // Define initial state

  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNavigationWarningOpen, setIsNavigationWarningOpen] = useState(false)
  const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null)
  const [editablePrompt, setEditablePrompt] = useState("")
  // const [editableNegativePrompt, setEditableNegativePrompt] = useState("")



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

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const steps = [
    {
      id: 1,
      title: "Subject in focus & Details",
      description: "Define the subject(s) in focus of your video and the supporting details.",
      icon: ImageIcon,
    },
    {
      id: 2,
      title: "Visual Style & Motion",
      description: "Set film grain, camera movement, and motion effects",
      icon: Camera,
    },
    {
      id: 3,
      title: "Review & Generate",
      description: "Video prompt review",
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

    // Combine camera movement and motion speed with subject
    let subjectLine = ""
    const subjectParts = []

    if (formData.subject) subjectParts.push(formData.subject)
    if (formData.cameraMovement) subjectParts.push(formData.cameraMovement)
    if (formData.motionSpeed) subjectParts.push(`in ${formData.motionSpeed}`)

    if (subjectParts.length > 0) {
      subjectLine = subjectParts.join(" ")
    }

    if (subjectLine) parts.push(subjectLine)
    if (formData.details) parts.push(`– ${formData.details}`)
    if (formData.filmGrain) parts.push(`– ${formData.filmGrain}`)

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
    // setEditableNegativePrompt(formData.negativePrompt || "")
    setIsModalOpen(true)
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-blue-600 mr-2" />
                <h3 className="font-medium text-blue-800">Prompt Engineering Guide: Subject in focus & Details</h3>
              </div>
              <p className="text-sm text-blue-700 mb-2">
                The foundation of your video prompt starts with a clear subject. A subject is either a person, several people or objects.
                Once you understand your subject(s) - you will define additional details to describe them.
                Be precise and succinct when describing the appearance of subjects and remember to describe both people (clothes, age) as well as objects (in hand, on table, around them etc.)
                Camera movement and motion effects can be selected in the next step and will be combined with your subject description.
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ImageIcon className="w-5 h-5 text-blue-500 mr-2" />
                  Step 1: Generate an image using the image prompt wizard
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700">
                  <strong>What to do:</strong> Generate an image. It will be used together with this prompt to create your video.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">If you do not have an image yet, use the image prompt wizard to generate one:</h4>
                  <Button
                    variant="link"
                    className="p-0 h-auto"
                    onClick={() => onNavigate?.("generate-image-prompt")}
                  >
                    Image Prompt Wizard
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              <Label htmlFor="subject" className="text-gray-700 font-medium flex items-center">
                Main Subject in focus
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        Describe the subject(s) that will be the main focus of your video. Being specific helps the AI understand exactly what you
                        want. Consider naming people in your video to prevent AI-face issues where faces appear
                        deformed.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="subject"
                placeholder="e.g., James, Jacob and Emma in a warehouse venue on the dance floor."
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            {/* <div className="space-y-3">
              <Label htmlFor="details" className="text-gray-700 font-medium flex items-center">
                Additional Details
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        Add specific details about textures, objects, or elements. Using vivid adjectives like rough,
                        silky, or glossy helps capture the essence of different surfaces. Including an action (e.g.,
                        a person gazing at the sunset) adds dynamism.
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
            </div> */}

            <TipCard
              icon={<Lightbulb className="w-4 h-4" />}
              title="Subject & Concept Tips"
              tips={[
                "Name specific individuals (e.g., 'Sofie Madsen, Lars Nielsen, Jonas Pedersen') to prevent AI-face issues and create authentic characters",
                "Describe clothing and costumes in detail (e.g., 'flapper dresses, sequined tops, suspenders, tuxedo shirts, fedoras')",
                "Include dynamic actions and movements (e.g., 'dancing, laughing, clinking glasses, moving across the floor')",
                "Focus on candid moments over posed shots for authentic storytelling",
                "Specify age diversity and demographics (e.g., 'guests of various ages 20s to 60s')",
                "Use () to emphasize & group related concepts",
              ]}
              helpVideoSrc="/example.mp4"
              helpTitle="How to prompt to create a similar video as the example:"
              helpText="First we define the subjects of the video with specific names and details. Instead of simply typing 'people', we assign our subjects names and describe their appearance.\n\n
              For example: Sofie Madsen, Lars Nielsen, and Jonas Pedersen dressed in playful 1920s-inspired outfits: flapper dresses, sequined tops, suspenders, tuxedo shirts, fedoras, feathered headbands.\n\n
              Next we define additional details: (guests of various ages 20s to 60s) (candid moments in conversation, dancing, laughing, clinking glasses) (no one posing for the camera) (authentic celebration atmosphere) \n\n"
            />
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg border border-green-100">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-medium text-green-800">Prompt Engineering Guide: Visual Style & Motion</h3>
              </div>
              <p className="text-sm text-green-700 mb-2">
                Film grain, camera movement, and motion effects dramatically affect your video. These effects create varied cinematic experiences,
                while film grain adds character and atmosphere, camera movement guides the viewer&apos;s perspective, and motion effects control the dynamic feel.
              </p>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium flex items-center">
                Camera Movement
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        Camera movement adds dynamic perspective and visual interest to your video. Different movements
                        can create various emotional effects and guide the viewer&apos;s attention through the scene.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Select
                value={formData.cameraMovement}
                onValueChange={(value) => setFormData({ ...formData, cameraMovement: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose camera movement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Truck left past">Truck Left</SelectItem>
                  <SelectItem value="Truck right past">Truck Right</SelectItem>
                  <SelectItem value="Pan left to reveal">Pan Left</SelectItem>
                  <SelectItem value="Pan right to reveal">Pan Right</SelectItem>
                  <SelectItem value="Push in toward">Push In</SelectItem>
                  <SelectItem value="Pull out from">Pull Out</SelectItem>
                  <SelectItem value="Pedestal up to show">Pedestal Up</SelectItem>
                  <SelectItem value="Pedestal down to reveal">Pedestal Down</SelectItem>
                  <SelectItem value="Tilt up to reveal">Tilt Up</SelectItem>
                  <SelectItem value="Tilt down to show">Tilt Down</SelectItem>
                  <SelectItem value="Zoom in on">Zoom In</SelectItem>
                  <SelectItem value="Zoom out from">Zoom Out</SelectItem>
                  <SelectItem value="Shake during a candid moment">Shake</SelectItem>
                  <SelectItem value="Tracking shot following">Tracking Shot</SelectItem>
                  <SelectItem value="Static shot of">Static Shot</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium flex items-center">
                Motion & Speed
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        Motion and speed effects control the dynamic feel of your video. These effects can create
                        dramatic tension, smooth transitions, or emphasize specific moments in the scene.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Select
                value={formData.motionSpeed}
                onValueChange={(value) => setFormData({ ...formData, motionSpeed: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose motion effect" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="slow-motion">Slow Motion</SelectItem>
                  <SelectItem value="high-speed tracking">High-Speed Tracking</SelectItem>
                  <SelectItem value="motion blur">Motion Blur</SelectItem>
                  <SelectItem value="strobe effect">Strobe Effect</SelectItem>
                  <SelectItem value="timelapse">Timelapse</SelectItem>
                  <SelectItem value="ripple motion">Ripple Motion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label className="text-gray-700 font-medium flex items-center">
                Film Grain & Texture
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        Film grain and texture effects add character and atmosphere to your video. These effects can create
                        a vintage look, add cinematic quality, or enhance the overall mood of the scene.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Select
                value={formData.filmGrain}
                onValueChange={(value) => setFormData({ ...formData, filmGrain: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Choose film grain effect" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="35mm film grain">35mm Film Grain</SelectItem>
                  <SelectItem value="Portra 400 film">Portra 400 Film</SelectItem>
                  <SelectItem value="vintage film look">Vintage Film Look</SelectItem>
                  <SelectItem value="scratches">Scratches</SelectItem>
                  <SelectItem value="dust particles">Dust Particles</SelectItem>
                  <SelectItem value="flickering edges">Flickering Edges</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <TipCard
              icon={<Camera className="w-4 h-4" />}
              title="Film Grain, Camera Movement & Motion Tips"
              tips={[
                "Film grain effects add character and atmosphere to your video",
                "Camera movement guides the viewer&apos;s attention and creates dynamic perspective",
                "Motion effects control the dynamic feel and create dramatic tension",
                "Use () to emphasize cinematic techniques and group related visual concepts",
                "Specify ultra-high resolution requirements (e.g., '8K equivalent or higher')",
                "Consider the mood and atmosphere you want to create with your effects",
              ]}
              helpVideoSrc="/example.mp4"
              helpTitle="Getting the film grain, camera movement, and motion effects right"
              helpText="For the example video, we use film grain, camera movement, and motion effects to enhance the cinematic quality.\n\n
                Film grain: (35mm film grain for vintage look) (subtle texture to add character)\n\n
                Camera movement: (tracking shot following subjects) (dynamic perspective changes)\n\n
                Motion effects: (motion blur capturing natural movement) (smooth transitions between scenes)\n\n
                Style: (prioritize moments over portraits) (story over symmetry) (vibrant corporate party + vintage editorial + candid event videography)"
            />
          </div>
        )

      case 3:
        const generatedPrompt = generatePrompt()

        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-100">
              <div className="flex items-center mb-2">
                <BookOpen className="w-5 h-5 text-amber-600 mr-2" />
                <h3 className="font-medium text-amber-800">Prompt Engineering Guide: Finishing touches</h3>
              </div>
              <p className="text-sm text-amber-700 mb-2">
                Review your prompt elements below and navigate back to make changes. When you are satisfied and ready to generate videos with your text to video prompt
                use the &ldquo;Finish & Copy&rdquo; button to open the prompt editor.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-gray-700 font-medium">Generated Prompt Preview</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center text-sm text-blue-600">
                        <Layers className="w-4 h-4 mr-1" />
                        <span>Text To Video Prompt</span>
                        <HelpCircle className="w-4 h-4 ml-1" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm">
                      <p>
                        A well formed text prompt should include subject(s) and details about them set in an appropriate mood and environment,
                        where you are mindful of the compositional parts (thinking like a cinematographer), including natural language enhancements (--) and () to group and emphasize.
                        Speaking of emphasis do not forget about ℹ️ emojis.
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
                          {(() => {
                            const subjectParts = []
                            if (formData.subject) subjectParts.push(formData.subject)
                            if (formData.cameraMovement) subjectParts.push(formData.cameraMovement)
                            if (formData.motionSpeed) subjectParts.push(`in ${formData.motionSpeed}`)
                            const displayText = subjectParts.join(" ")
                            return displayText.length > 20 ? displayText.substring(0, 20) + "..." : displayText
                          })()}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Main subject: {(() => {
                          const subjectParts = []
                          if (formData.subject) subjectParts.push(formData.subject)
                          if (formData.cameraMovement) subjectParts.push(formData.cameraMovement)
                          if (formData.motionSpeed) subjectParts.push(`in ${formData.motionSpeed}`)
                          return subjectParts.join(" ")
                        })()}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {formData.filmGrain && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          {formData.filmGrain}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Film grain: {formData.filmGrain}</p>
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
                "AI can be unpredictable—repeat and refine. If results fall short, describe what's missing and tweak your prompt.",
                "The order of words can be as important as the worlds themselves",
                "Use structured dividers (–) to separate important elements within your prompt",
                "Adjust weight to control how strictly the AI follows your prompt",
                "Consider using a consistent seed for a series of related videos",
              ]}
              helpVideoSrc="/example.png"
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
          <h1 className="text-2xl font-semibold text-gray-900">Video Prompt Progress</h1>
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
            className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer ${currentStep === step.id
              ? "border-blue-300 bg-blue-50 hover:bg-blue-100"
              : currentStep > step.id
                ? "border-green-300 bg-green-50 hover:bg-green-100"
                : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentStep === step.id
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
        title="Edit or Copy Your Video Prompts"
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
                  className="hover:bg-green-50 hover:border-green-300 hover:text-green-700"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    // Create plain text export
                    const textContent = `AI Video Generation Prompt
Generated by BotanicCanvas Video Prompt Wizard
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

PROMPT:
${editablePrompt}

PARAMETERS:
- Weight: ${formData.weight || 'Default'}
- Seed: ${formData.seed || 'Random'}

METADATA:
- Subject: ${(() => {
                        const subjectParts = []
                        if (formData.subject) subjectParts.push(formData.subject)
                        if (formData.cameraMovement) subjectParts.push(formData.cameraMovement)
                        if (formData.motionSpeed) subjectParts.push(`in ${formData.motionSpeed}`)
                        return subjectParts.length > 0 ? subjectParts.join(" ") : 'N/A'
                      })()}
- Details: ${formData.details || 'N/A'}
- Film Grain: ${formData.filmGrain || 'N/A'}`

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
                  className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700"
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
                        weight: formData.weight,
                        seed: formData.seed
                      },
                      metadata: {
                        subject: (() => {
                          const subjectParts = []
                          if (formData.subject) subjectParts.push(formData.subject)
                          if (formData.cameraMovement) subjectParts.push(formData.cameraMovement)
                          if (formData.motionSpeed) subjectParts.push(`in ${formData.motionSpeed}`)
                          return subjectParts.length > 0 ? subjectParts.join(" ") : 'N/A'
                        })(),
                        details: formData.details,
                        filmGrain: formData.filmGrain,
                        generatedAt: new Date().toISOString(),
                        source: "BotanicCanvas Video Prompt Wizard"
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
                  className="hover:bg-purple-50 hover:border-purple-300 hover:text-purple-700"
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

          {/* Negative Prompt Section */}
          {/* <div className="space-y-3">
             <div className="flex items-center justify-between">
               <Label className="text-gray-700 font-medium text-lg">Negative Prompt</Label>
               <Button
                 variant="outline"
                 size="sm"
                 onClick={() => navigator.clipboard.writeText(editableNegativePrompt)}
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
           </div> */}

          {/* Action Buttons */}
          {/* <div className="flex justify-end gap-3 pt-4 border-t">
             <Button
               variant="default"
               onClick={() => {
                 const fullPrompt = `Prompt:\n${editablePrompt}\n\n${editableNegativePrompt ? `Negative Prompt:\n${editableNegativePrompt}` : ""}`
                 navigator.clipboard.writeText(fullPrompt)
               }}
               className="bg-coral hover:bg-coral/90 text-white"
             >
               <Copy className="w-4 h-4 mr-2" />
               Copy Both Prompts
             </Button>
             <Button
               variant="outline"
               onClick={() => setIsModalOpen(false)}
             >
               Close
             </Button>
           </div> */}
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
