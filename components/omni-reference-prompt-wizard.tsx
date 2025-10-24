"use client"

import type React from "react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
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
    Sliders,
    Hash,
    BookOpen,
    MessageSquare,
    Plus,
    X,
    Edit3,
} from "lucide-react"

interface IntentSectionProps {
    setActiveSection: (section: string) => void
}

// Types
interface FormData {
    mainSubject: string
    subjectDescription: string
    aspectRatio: string
    chatEdits: string
    selectedEmojis: string[]
    props: string[]
    includeChatEdit: boolean
}

interface StepProps {
    formData: FormData
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
    propInput: string
    setPropInput: React.Dispatch<React.SetStateAction<string>>
}

const INITIAL_FORM_DATA: FormData = {
    mainSubject: "",
    subjectDescription: "",
    aspectRatio: "",
    chatEdits: "",
    selectedEmojis: [],
    props: [],
    includeChatEdit: false,
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
                    <div className="bg-white relative z-10 w-full max-w-lg  rounded-lg border shadow-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-4 border-b flex items-center justify-between sticky top-0 ">
                            <div className="text-sm font-bold text-gray-900">{helpTitle || title}</div>
                            <Button size="sm" variant="ghost" onClick={() => setIsHelpOpen(false)}>Close</Button>
                        </div>
                        <div className="p-4 space-y-3">
                            {helpImageSrc && (
                                <Image src={helpImageSrc} alt={helpTitle || title} className="w-full h-auto rounded-md border" width={300} height={400} />
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

// Step Components
function Step1BackgroundPlanning({ setIsVenueExamplesOpen }: { setIsVenueExamplesOpen: (open: boolean) => void }) {
    return (
        <div className="space-y-6">
            <div className="bg-[#F4274A] p-4 rounded-lg">
                <div className="flex items-center mb-2">
                    <BookOpen className="w-5 h-5 text-white mr-2" />
                    <h3 className="font-medium text-white">Omni Reference Guide: Background</h3>
                </div>
                <p className="text-sm text-white mb-2">
                    Before proceeding with the step-by-step guide, make sure you have selected Nano Banana as your AI brain in OpenArt AI.
                    Then you will need to prepare your background references.<br></br>
                    This step-by-step guide will help you through each part of the process.
                </p>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <ImageIcon className="w-5 h-5 text-white mr-2" />
                            Pre-Step 0: Choose Nano Banana in OpenArt AI
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-gray-700">
                            <strong>What to do:</strong> If you have not already, go to OpenArt AI and select Nano Banana as your AI brain from the dropdown menu.
                        </p>
                        <div className="p-4 rounded-lg">
                            <h4 className="font-medium text-white mb-2">Screenshot:</h4>
                            <Image src="/nano-banana-reference.png" alt="Omni Reference Screenshot" width={300} height={400} />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <ImageIcon className="w-5 h-5 text-white mr-2" />
                            Step 1: Define Your Backgrounds
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-gray-700">
                            <strong>What to do:</strong> Choose a background and add it to the omni reference window in openart.ai. Nano Banana supports up to 4 backgrounds-- the more you use the better. Consider different angles.
                            <br></br>
                            <br></br>
                            <span className="font-semibold">Your images should be:</span>
                        </p>
                        <ul className="list-disc pl-5">
                            <li>Well illuminated</li>
                            <li>Not including any people</li>
                            <li>Clear and sharp</li>
                            <li>Taken from different angles</li>
                            <li>The same image format — for example all horizontal photos (landscape)</li>
                        </ul>
                        <div className="mt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setIsVenueExamplesOpen(true)}
                                className="hover:bg-[#F4274A] hover:text-white"
                            >
                                <ImageIcon className="w-4 h-4 mr-2" />
                                View Examples
                            </Button>
                        </div>
                        <div className="p-4 rounded-lg">
                            <h4 className="font-medium text-white mb-2">Screenshot:</h4>
                            <Image src="/omni-reference-screenshot.png" alt="Omni Reference Screenshot" width={300} height={400} />
                        </div>
                    </CardContent>
                </Card>

                {/* <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Palette className="w-5 h-5 text-white mr-2" />
                            Step 2: Plan Your Props (Up to 3)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-gray-700">
                            <strong>What to do:</strong> Choose up to 3 props and add them to the omni reference window in openart.ai as images.
                        </p>
                        <div className="bg-purple-50 p-4 rounded-lg">
                            <h4 className="font-medium text-white mb-2">Screenshot:</h4>
                            <Image src="/omni-reference-screenshot-2.png" alt="Omni Reference Screenshot" width={300} height={400} />
                        </div>
                        <p className="text-sm text-gray-600">
                            <strong>Tip:</strong> Props should create the atmosphere you want.
                        </p>
                    </CardContent>
                </Card> */}

                <div className="bg-[#05092E] p-4 rounded-lg border">
                    <div className="flex items-start">
                        <Lightbulb className="w-5 h-5 text-white mr-3 mt-0.5 flex-shrink-0" />
                        <div>
                            <h4 className="font-medium text-white mb-2">Ready to Continue?</h4>
                            <p className="text-sm text-white">
                                Once you have your backgrounds planned out, click /Next Step/ to start entering them into the step-by-step guide.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function Step2MainSubject({ formData, setFormData }: StepProps) {
    return (
        <div className="space-y-6">
            <div className="bg-[#F4274A] p-4 rounded-lg">
                <div className="flex items-center mb-2">
                    <BookOpen className="w-5 h-5 text-white mr-2" />
                    <h3 className="font-medium text-white">Omni Reference Guide: Main Subject</h3>
                </div>
                <p className="text-sm text-white mb-2">
                    Describe the main focus of your image — for example, a seating area, a stage, or a plaza.
                    This refers to what we would typically say the picture is of.
                </p>
            </div>

            <div className="space-y-3">
                <Label htmlFor="mainSubject" className="text-gray-700 font-medium flex items-center">
                    Main Subject Description
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                                <p>
                                    Describe your main subject in detail. This should be your background/venue.
                                    Be specific about the atmosphere, style, and key features.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Label>
                <Textarea
                    id="mainSubject"
                    placeholder="E.g Open area outside a warehouse building with a seating area"
                    value={formData.mainSubject}
                    onChange={(e) => setFormData({ ...formData, mainSubject: e.target.value })}
                    className="min-h-[100px]"
                />
            </div>

            <TipCard
                icon={<Camera className="w-4 h-4" />}
                title="Main Subject Tips"
                tips={[
                    "Be mindful of the order of words in your sentence, it is important for the AI to understand the context.",
                    "Include key architectural or design elements",
                    "Keep descriptions clear and prioritized",
                ]}
                helpImageSrc="/chat-to-edit-ex-0.jpg"
                helpTitle="Example Main Subject Description"
                helpText="A modernized industrial building located between Aarhus city center and the harbor, originally a shipbuilding hall now repurposed as a creative space."
            />
        </div>
    )
}

function Step3SubjectDetails({ formData, setFormData, propInput, setPropInput }: StepProps) {
    const handleAddProp = () => {
        if (propInput.trim()) {
            addProp(propInput)
            setPropInput("")
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleAddProp()
        }
    }

    const addProp = (prop: string) => {
        if (prop.trim() && !formData.props.includes(prop.trim()) && formData.props.length < 5) {
            setFormData({ ...formData, props: [...formData.props, prop.trim()] })
        }
    }

    const removeProp = (index: number) => {
        setFormData({ ...formData, props: formData.props.filter((_, i) => i !== index) })
    }

    return (
        <div className="space-y-6">
            <div className="bg-[#F4274A] p-4 rounded-lg">
                <div className="flex items-center mb-2">
                    <BookOpen className="w-5 h-5 text-white mr-2" />
                    <h3 className="font-medium text-white">Omni Reference Guide: Objects</h3>
                </div>
                <p className="text-sm text-white mb-2">
                    Define objects that surround your main subject. For example: several potted plants, pallet furniture, etc.
                    Each object will be automatically wrapped in parentheses.
                </p>
            </div>

            <div className="space-y-3">
                <Label htmlFor="propInput" className="text-gray-700 font-medium flex items-center">
                    Add objects
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <HelpCircle className="w-4 h-4 text-gray-400 ml-2 inline" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                                <p>
                                    Enter an object description and click + or press Enter to add it.
                                    Each object will be wrapped in parentheses automatically.
                                </p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Label>
                <div className="flex gap-2">
                    <Input
                        id="propInput"
                        placeholder={formData.props.length >= 5 ? "Maximum 5 objects reached" : "e.g., several potted plants on a pallet furniture table in the foreground"}
                        value={propInput}
                        onChange={(e) => setPropInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="flex-1"
                        disabled={formData.props.length >= 5}
                    />
                    <Button
                        type="button"
                        onClick={handleAddProp}
                        disabled={!propInput.trim() || formData.props.length >= 5}
                        size="sm"
                    >
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
                {formData.props.length < 5 && (
                    <p className="text-xs text-gray-500 mt-1 ml-1">
                        Press <span className="font-semibold">Enter</span> or click <span className="font-semibold">+</span> to add a prop.
                    </p>
                )}
            </div>

            {formData.props.length > 0 && (
                <div className="space-y-3">
                    <Label className="text-gray-700 font-medium">Added objects</Label>
                    <div className="flex flex-wrap gap-2">
                        {formData.props.map((prop, index) => (
                            <Badge key={index} variant="default" className="flex items-center gap-1 p-2">
                                ({prop})
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeProp(index)}
                                    className="h-4 w-4 p-0 hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
                                >
                                    <X className="w-3 h-3" />
                                </Button>
                            </Badge>
                        ))}
                    </div>
                </div>
            )}

            <TipCard
                icon={<Sliders className="w-4 h-4" />}
                title="Objects Tips"
                tips={[
                    "Be specific about quantity and placement",
                    "Keep descriptions clear and concise",
                    "Focus on the most important visual elements",
                    "objects will be automatically formatted with parentheses",
                ]}
                helpImageSrc="/example-2.jpg"
                helpTitle="Example Objects"
                helpText="(several potted plants) (vintage pallet furniture) (cozy seating arrangements)"
            />
        </div>
    )
}

function Step4TechnicalSettings() {
    return (
        <div className="space-y-6">
            <div className="bg-[#F4274A] p-4 rounded-lg">
                <div className="flex items-center mb-2">
                    <BookOpen className="w-5 h-5 text-white mr-2" />
                    <h3 className="font-medium text-white">Omni Reference Guide: Technical Settings</h3>
                </div>
                <p className="text-sm text-white mb-2">
                    Configure your Output size and number of images directly in OpenArt AI.
                </p>
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <MessageSquare className="w-5 h-5 text-white mr-2" />
                            Step 1: Set Output size in OpenArt AI
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-gray-700">
                            <strong>What to do:</strong> In OpenArt AI, select your desired Output size from the size dropdown menu.
                        </p>
                        <div className="bg-[#05092E] p-4 rounded-lg">
                            <h4 className="font-medium text-white mb-2">Recommended Options:</h4>
                            <ul className="text-sm text-white space-y-1">
                                <li>• 16:9 - Great for wide scenes and landscapes</li>
                                <li>• 1:1 - Perfect for social media and focused compositions</li>
                                <li>• 9:16 - Ideal for portrait-oriented content</li>
                                <li>• 4:3 - Standard format for general use</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center">
                            <Hash className="w-5 h-5 text-white mr-2" />
                            Step 2: Set number of images to generate in OpenArt AI
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="text-gray-700">
                            <strong>What to do:</strong> Choose how many images to generate at once in OpenArt AI.
                        </p>
                        <div className="bg-[#05092E] p-4 rounded-lg">
                            <h4 className="font-medium text-white mb-2">Number of images to generate</h4>
                            <ul className="text-sm text-white space-y-1">
                                <li>• 1 image - Good starting point for evaluating your text to image prompt</li>
                                <li>• 2 images - Good starting point for testing</li>
                                <li>• 3 images - Balanced variety and consistency</li>
                                <li>• 4 images - Maximum variety between results</li>
                            </ul>
                        </div>
                        <p className="text-sm text-gray-600">
                            <strong>Tip:</strong> More images per batch means greater variation between results.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <TipCard
                icon={<MessageSquare className="w-4 h-4" />}
                title="Technical Settings Tips"
                tips={[
                    "Configure these settings directly in OpenArt AI",
                    "16:9 is great for wide scenes and landscapes",
                    "1:1 works well for social media and focused compositions",
                    "Start with 2-3 images to find a good base result",
                    "Use 4 images when you want maximum variety",
                ]}
                helpImageSrc="/omni-reference-screenshot-3.png"
                helpTitle="OpenArt AI Settings"
                helpText="In OpenArt AI, you'll find the Output size and number of images to generate settings in the generation panel. Set these according to your needs before generating your image."
            />
        </div>
    )
}

export function OmniReferencePromptWizard({ setActiveSection }: IntentSectionProps) {
    const [currentStep, setCurrentStep] = useState(1)
    const [formData, setFormData] = useState(INITIAL_FORM_DATA)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isNavigationWarningOpen, setIsNavigationWarningOpen] = useState(false)
    const [pendingNavigation, setPendingNavigation] = useState<(() => void) | null>(null)
    const [editablePrompt, setEditablePrompt] = useState("")
    const [propInput, setPropInput] = useState("")
    const [isVenueExamplesOpen, setIsVenueExamplesOpen] = useState(false)

    // Reset wizard when component mounts
    useEffect(() => {
        setCurrentStep(1)
        setFormData(INITIAL_FORM_DATA)
    }, [])

    // Handle browser navigation warnings (refresh, back button, URL changes)
    useEffect(() => {
        const hasUnsavedChanges = () => {
            return Object.values(formData).some(value => {
                if (Array.isArray(value)) {
                    return value.length > 0
                }
                return value !== "" && value !== "2"
            })
        }

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

    const totalSteps = 5;
    const progress = (currentStep / totalSteps) * 100

    const steps = [
        {
            id: 1,
            title: "Background Planning",
            description: "Plan your background(s) before entering them.",
            icon: ImageIcon,
        },
        {
            id: 2,
            title: "Main Subject",
            description: "Describe your main subject (background/venue). Keep detail level low since you're using image references",
            icon: Camera,
        },
        {
            id: 3,
            title: "Objects",
            description: "Define objects that surround your main subject.",
            icon: Sliders,
        },
        {
            id: 4,
            title: "Technical Settings",
            description: "Choose Output size and number of images to generate for generation.",
            icon: MessageSquare,
        },
        {
            id: 5,
            title: "Final Details",
            description: "Add final details and upscale the result.",
            icon: Sparkles,
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
        const parts = []

        if (formData.mainSubject) parts.push(formData.mainSubject)
        if (formData.props.length > 0) {
            const propsText = formData.props.map(prop => `(${prop})`).join(" ")
            parts.push(propsText)
        }
        if (formData.subjectDescription) parts.push(formData.subjectDescription)
        if (formData.chatEdits) parts.push(`Edits: ${formData.chatEdits}`)

        return parts.join("\n")
    }

    const handleFinishAndCopy = () => {
        const generatedPrompt = generatePrompt()
        setEditablePrompt(generatedPrompt)
        setIsModalOpen(true)
    }

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <Step1BackgroundPlanning setIsVenueExamplesOpen={setIsVenueExamplesOpen} />
            case 2:
                return <Step2MainSubject formData={formData} setFormData={setFormData} propInput={propInput} setPropInput={setPropInput} />
            case 3:
                return <Step3SubjectDetails formData={formData} setFormData={setFormData} propInput={propInput} setPropInput={setPropInput} />
            case 4:
                return <Step4TechnicalSettings />
            case 5:
                // Final Details step (when chat edit is included)
                const generatedPromptFinal = generatePrompt()
                return (
                    <div className="space-y-6">
                        <div className="bg-[#F4274A] p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <BookOpen className="w-5 h-5 text-white mr-2" />
                                <h3 className="font-medium text-white">Omni Reference Guide: Final Details & Upscaling</h3>
                            </div>
                            <p className="text-sm text-white mb-2">
                                Add any final details and prepare to upscale your result to 2x for better resolution.
                                Review your complete prompt before generating.
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className=" p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Sparkles className="w-5 h-5 text-white mr-2" />
                                    Step 1: Generate and Review Your Result
                                </h3>
                                <div className="space-y-3">
                                    <p className="text-gray-700">
                                        <strong>What to do:</strong> Use your omni reference prompt to generate your image in OpenArt AI and review the results.
                                    </p>
                                    <div className="bg-[#05092E] p-4 rounded-lg">
                                        <h4 className="font-medium text-white mb-2">Review Checklist:</h4>
                                        <ul className="text-sm text-white space-y-1">
                                            <li>• Composition looks balanced and appealing</li>
                                            <li>• All objects are positioned correctly</li>
                                            <li>• Lighting and atmosphere match your vision</li>
                                            <li>• Overall quality meets your expectations</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className=" p-6 rounded-lg border border-gray-200">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                    <Layers className="w-5 h-5 text-white mr-2" />
                                    Step 2: Upscale to 2x Resolution
                                </h3>
                                <div className="space-y-3">
                                    <p className="text-gray-700">
                                        <strong>What to do:</strong> Once satisfied with your result, upscale it to 2x for better resolution and detail.
                                    </p>
                                    <div className="bg-[#05092E] p-4 rounded-lg">
                                        <h4 className="font-medium text-white mb-2">Upscaling Process:</h4>
                                        <ul className="text-sm text-white space-y-1">
                                            <li>• Select your best generated image</li>
                                            <li>• Click the upscale option in OpenArt AI</li>
                                            <li>• Choose 2x upscaling for optimal quality</li>
                                            <li>• Wait for the higher resolution version</li>
                                        </ul>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        <strong>Tip:</strong> 2x upscaling will double both width and height, giving you much better resolution for printing or detailed viewing.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-gray-700 font-medium">Generated Prompt Preview</Label>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="flex items-center text-sm text-white">
                                                <Layers className="w-4 h-4 mr-1" />
                                                <span>Omni Reference Prompt</span>
                                                <HelpCircle className="w-4 h-4 ml-1" />
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent className="max-w-sm">
                                            <p>
                                                Your complete omni reference prompt ready for generation.
                                                Review all elements before proceeding.
                                            </p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="p-4 bg-[#F4274A] rounded-lg border whitespace-pre-line">
                                <p className="text-white font-semibold">
                                    {generatedPromptFinal || "Complete the previous steps to generate your prompt"}
                                </p>
                            </div>
                        </div>

                        {/* Chat to Edit Instructions - Only shown if user chose to include chat edit */}
                        {formData.includeChatEdit && (
                            <div className="space-y-6">
                                <div className="bg-[#F4274A] p-4 rounded-lg">
                                    <div className="flex items-center mb-2">
                                        <MessageSquare className="w-5 h-5 text-white mr-2" />
                                        <h3 className="font-medium text-white">Chat to Edit Instructions</h3>
                                    </div>
                                    <p className="text-sm text-white mb-4">
                                        Now go to Openart.ai and generate your image! If you have any adjustments after seeing your picture, use chat-to-edit to fine-tune the final details!
                                    </p>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 rounded-lg border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <Sparkles className="w-5 h-5 text-white mr-2" />
                                            Step 1: Generate Your Initial Image
                                        </h3>
                                        <div className="space-y-3">
                                            <p className="text-gray-700">
                                                <strong>What to do:</strong> Use your omni reference prompt to generate your initial image in OpenArt AI.
                                            </p>
                                            <div className="bg-[#05092E] p-4 rounded-lg">
                                                <h4 className="font-medium text-white mb-2">After Generation:</h4>
                                                <ul className="text-sm text-white space-y-1">
                                                    <li>• Review the generated image(s)</li>
                                                    <li>• Identify what you would like to change or improve</li>
                                                    <li>• Note specific details you want to modify</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-lg border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <MessageSquare className="w-5 h-5 text-white mr-2" />
                                            Step 2: Access Chat to Edit
                                        </h3>
                                        <div className="space-y-3">
                                            <p className="text-gray-700">
                                                <strong>What to do:</strong> In OpenArt AI, go to the <a target="_blank" className="underline text-blue-500 hover:scale-105" href="https://openart.ai/image/chat">Chat to Edit</a> section and select your desired image from the history.
                                            </p>
                                            <div className="bg-[#05092E] p-4 rounded-lg">
                                                <h4 className="font-medium text-white mb-2">Chat to Edit Process:</h4>
                                                <ul className="text-sm text-white space-y-1">
                                                    <li>• Navigate to the Chat to Edit tab in OpenArt AI</li>
                                                    <li>• Browse your generation history</li>
                                                    <li>• Select the image you want to edit</li>
                                                    <li>• Use the chat interface to describe your desired changes</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-lg border border-gray-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                                            <Edit3 className="w-5 h-5 text-white mr-2" />
                                            Step 3: Describe Your Changes
                                        </h3>
                                        <div className="space-y-3">
                                            <p className="text-gray-700">
                                                <strong>What to do:</strong> In the chat interface, describe the specific changes you want to make to your image.
                                            </p>
                                            <div className="bg-[#05092E] p-4 rounded-lg">
                                                <h4 className="font-medium text-white mb-2">Example Edit Requests:</h4>
                                                <ul className="text-sm text-white space-y-1">
                                                    <li>• Add golden hour lighting</li>
                                                    <li>• Add string lights</li>
                                                </ul>
                                            </div>
                                            <p className="text-sm text-gray-600">
                                                <strong>Tip:</strong> Be specific and focus on one or two key changes at a time for best results.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <TipCard
                                    icon={<Sparkles className="w-4 h-4" />}
                                    title="Chat to Edit Tips"
                                    tips={[
                                        "Generate your initial image first using your omni reference prompt",
                                        "Browse your generation history to find the image to edit",
                                        "Be specific about what you want to change",
                                        "Mention lighting changes (golden hour, dramatic shadows)",
                                        "Focus on one or two key changes at a time",
                                    ]}
                                    helpImageSrc="/chat-to-edit-ex-1.jpg"
                                    helpTitle="Chat to Edit Process"
                                    helpText="After generating your image, use OpenArt AI's Chat to Edit feature to refine it. Select your image from history and describe the changes you want in the chat interface."
                                />
                            </div>
                        )}

                        <TipCard
                            icon={<Sparkles className="w-4 h-4" />}
                            title="Final Tips"
                            tips={[
                                "Remember AI is an iterative process, so you may need to tweak your prompt to get the desired result.",
                                "Sometimes sticking to your prompt and regenerating to get the desired result is better than tweaking the prompt.",
                            ]}
                            helpImageSrc="/chat-to-edit-ex-2.jpg"
                            helpTitle="Ready for Generation & Upscaling"
                            helpText="Your omni reference prompt is complete! Use this with your image references in OpenArt AI to generate your scene. Once satisfied with the result, upscale to 2x for optimal resolution and detail."
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
                    <h1 className="text-2xl font-semibold text-gray-900">Omni Reference Prompt Progress</h1>
                    <div className="text-sm text-gray-600">
                        Step {currentStep} of {totalSteps}
                    </div>
                </div>
                <Progress value={progress} className="h-2" />
            </div>

            {/* Steps Navigation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {steps.map((step) => (
                    <div
                        key={step.id}
                        onClick={() => {
                            // Don't allow clicking on step 7 (final details after chat edit) if user didn't choose to include chat edit
                            if (step.id === 7 && !formData.includeChatEdit) return
                            setCurrentStep(step.id)
                        }}
                        className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md hover:scale-[1.02] cursor-pointer ${currentStep === step.id
                            ? "border-[#F4274A] bg-[#FBFBEB]"
                            : currentStep > step.id
                                ? "border-[#05092E] bg-[#FBFBEB] hover:bg-[#F4274A]/10"
                                : "border-[#05092E]  hover:bg-[#FBFBEB]"
                            }`}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${currentStep === step.id
                                    ? "bg-[#F4274A] text-white"
                                    : currentStep > step.id
                                        ? "bg-[#05092E] text-white"
                                        : "bg-[#FBFBEB] text-[#05092E]"
                                    }`}
                            >
                                <step.icon className="w-4 h-4" />
                            </div>
                            <div className="text-sm font-medium text-[#05092E]">{step.title}</div>
                        </div>
                        <div className="text-xs text-[#05092E]">{step.description}</div>
                    </div>
                ))}
            </div>

            {currentStep === 1 && (
                <div className="mb-8 p-6 bg-[#FBFBEB] border-l-4 border-[#F4274A]">
                    <h2 className="mb-3 text-lg">Welcome to the venue image prompt flow</h2>
                    <p className="mb-6">
                        The following flow will help you create a prompt for generating inspiring images set in one of your real-life venues! Using AI, we will blend themes of an upcoming event with a venue you already know, giving your client a small preview of what their future event could look like.
                    </p>
                </div>
            )}

            {/* Main Content */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-gray-900">
                        <Sparkles className="w-5 h-5 text-white" />
                        {steps[currentStep - 1]?.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600">{steps[currentStep - 1].description}</CardDescription>
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
                title="Edit or Copy Your Omni Reference Prompt"
                className="max-w-4xl bg-[#FBFBEB]"
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
                                    className="hover:bg-[#F4274A] hover:text-white"
                                >
                                    <Copy className="w-4 h-4 mr-2" />
                                    Copy to Clipboard
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const textContent = `Omni Reference AI Generation Prompt
Generated by BotanicCanvas Omni Reference step-by-step guide
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

PROMPT:
${editablePrompt}

SETTINGS:
- Output size: ${formData.aspectRatio || 'Default'}

METADATA:
- Main Subject: ${formData.mainSubject || 'N/A'}
- Subject Details: ${formData.subjectDescription || 'N/A'}
- Chat Edits: ${formData.chatEdits || 'N/A'}`

                                        const dataBlob = new Blob([textContent], { type: 'text/plain' })
                                        const url = URL.createObjectURL(dataBlob)
                                        const link = document.createElement('a')
                                        link.href = url
                                        link.download = `omni-reference-prompt-${Date.now()}.txt`
                                        document.body.appendChild(link)
                                        link.click()
                                        document.body.removeChild(link)
                                        URL.revokeObjectURL(url)
                                    }}
                                    className="hover:bg-[#F4274A] hover:text-white"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Export TXT
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        const jsonData = {
                                            metadata: {
                                                generatedBy: "BotanicCanvas Omni Reference step-by-step guide",
                                                date: new Date().toLocaleDateString(),
                                                time: new Date().toLocaleTimeString(),
                                                version: "1.0"
                                            },
                                            prompt: editablePrompt,
                                            settings: {
                                                aspectRatio: formData.aspectRatio || 'Default'
                                            },
                                            formData: {
                                                mainSubject: formData.mainSubject || 'N/A',
                                                subjectDescription: formData.subjectDescription || 'N/A',
                                                chatEdits: formData.chatEdits || 'N/A',
                                                props: formData.props
                                            }
                                        }

                                        const jsonContent = JSON.stringify(jsonData, null, 2)
                                        const dataBlob = new Blob([jsonContent], { type: 'application/json' })
                                        const url = URL.createObjectURL(dataBlob)
                                        const link = document.createElement('a')
                                        link.href = url
                                        link.download = `omni-reference-prompt-${Date.now()}.json`
                                        document.body.appendChild(link)
                                        link.click()
                                        document.body.removeChild(link)
                                        URL.revokeObjectURL(url)
                                    }}
                                    className="hover:bg-[#F4274A] hover:text-white"
                                >
                                    <Download className="w-4 h-4 mr-2" />
                                    Export JSON
                                </Button>
                            </div>
                        </div>
                        <Textarea
                            value={editablePrompt}
                            onChange={(e) => setEditablePrompt(e.target.value)}
                            placeholder="Your generated omni reference prompt will appear here..."
                            className="min-h-[200px] text-sm font-mono border-gray-300 focus:border-[#F4274A] focus:ring-[#F4274A] bg-[#FBFBEB]"
                        />
                    </div>
                    <div className="p-6 rounded-lg bg-[#05092E]">
                        <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                            <MessageSquare className="w-5 h-5 text-white mr-2" />
                            Do you have any adjustments to your image?
                        </h3>
                        <div className="space-y-3">
                            <p className="text-white">
                                If you have any adjustments after seeing your picture, use <a className="text-blue-300 hover:cursor-pointer hover:underline" target="_blank" href="https://openart.ai/image/chat">Chat‑to‑Edit</a> to fine-tune the final details!
                            </p>
                            <div className="p-4 rounded-lg">
                                <h4 className="font-medium text-white mb-2">Editing Process:</h4>
                                <ul className="list-disc list-inside text-sm text-white space-y-1">
                                    <li>In OpenArt.AI Click the <a className="text-blue-300 hover:cursor-pointer hover:underline" target="_blank" href="https://openart.ai/image/chat">Chat‑to‑Edit</a> option</li>
                                    <li>Choose either upload image or select from history if its already on openart!</li>
                                    <li>Type a clear instruction (e.g., “Change to golden hour lighting”)</li>
                                    <li>Review the updated version and repeat if needed</li>
                                </ul>
                            </div>
                            <div className="flex flex-row gap-1 justify-center items-center">
                                <p className="text-sm text-white">
                                    <strong>Tip:</strong> Want to know more about chat-to-edit?
                                </p>
                                <button
                                    className="p-0 text-blue-300 hover:cursor-pointer hover:underline text-sm"
                                    onClick={() => {
                                        const confirmed = window.confirm("Are you sure you want to navigate to the toolbox?");
                                        if (confirmed) {
                                            setActiveSection("chat-to-edit-examples");
                                        }
                                    }}
                                >
                                    go to the toolbox.
                                </button>
                            </div>
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

            {/* Venue Examples Modal */}
            <Modal
                isOpen={isVenueExamplesOpen}
                onClose={() => setIsVenueExamplesOpen(false)}
                title="Venue Background Examples"
                className="max-w-4xl bg-[#FBFBEB]"
            >
                <div className="space-y-6">
                    <div className="text-center">
                        <p className="text-gray-700 mb-4">
                            These are examples of venue images that work well as background references for omni reference.
                            Notice how they are well-illuminated, clear, and taken from different angles.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                            <h4 className="font-medium text-gray-900 text-center">Venue Example 1</h4>
                            <Image
                                src="/venue-1.jpg"
                                alt="Venue example 1"
                                width={400}
                                height={300}
                                className="w-full h-auto rounded-lg border shadow-md"
                            />
                            <p className="text-sm text-gray-600 text-center">
                                Wide angle view showing the full venue space
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-medium text-gray-900 text-center">Venue Example 2</h4>
                            <Image
                                src="/venue-2.jpg"
                                alt="Venue example 2"
                                width={400}
                                height={300}
                                className="w-full h-auto rounded-lg border shadow-md"
                            />
                            <p className="text-sm text-gray-600 text-center">
                                Different angle highlighting architectural details
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="font-medium text-gray-900 text-center">Venue Example 3</h4>
                            <Image
                                src="/venue-3.jpg"
                                alt="Venue example 3"
                                width={400}
                                height={300}
                                className="w-full h-auto rounded-lg border shadow-md"
                            />
                            <p className="text-sm text-gray-600 text-center">
                                Close-up view showing texture and lighting
                            </p>
                        </div>
                    </div>

                    <div className="bg-[#05092E] p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">Key Characteristics to Notice:</h4>
                        <ul className="text-sm text-white space-y-1">
                            <li>• All images are well-illuminated with good lighting</li>
                            <li>• No people are visible in any of the shots</li>
                            <li>• Images are clear and sharp with good detail</li>
                            <li>• Each image shows a different angle of the venue</li>
                            <li>• All images maintain consistent horizontal orientation</li>
                        </ul>
                    </div>
                </div>
            </Modal>


        </div>
    )
}
