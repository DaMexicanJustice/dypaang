"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, MessageCircle, Layers, ArrowRightLeft, Sparkles } from "lucide-react"

export function PromptVsIntentSection() {
    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto">
                    <Brain className="w-8 h-8 text-yellow-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Prompt Engineering vs. Intent-Driven Editing</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Understand the difference between crafting a detailed text prompt and using intent-driven workflows—especially with Nano Banana’s multi-step editing capabilities.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Prompt Engineering */}
                <Card>
                    <CardHeader>
                        <MessageCircle className="w-8 h-8 text-blue-500 mb-2" />
                        <CardTitle>Prompt Engineering</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                <li>Requires crafting a detailed, descriptive text prompt before image generation.</li>
                                <li>All desired attributes—lighting, subject, mood, style—must be included up front.</li>
                                <li>Best for one-shot image creation or when you know exactly what you want.</li>
                                <li>Example: <span className="italic text-gray-500">“A cozy café at sunset, warm lighting, people laughing, vintage decor, 16:9 aspect ratio.”</span></li>
                            </ul>
                        </CardDescription>
                    </CardContent>
                </Card>

                {/* Intent-Driven Editing */}
                <Card>
                    <CardHeader>
                        <Sparkles className="w-8 h-8 text-pink-500 mb-2" />
                        <CardTitle>Intent-Driven Editing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                <li>Start with a base image and iteratively refine it using natural language instructions.</li>
                                <li>Focus on your intent—describe what you want to change or improve at each step.</li>
                                <li>Ideal for multi-step workflows, experimentation, and evolving creative direction.</li>
                                <li>Example: <span className="italic text-gray-500">“Make the lighting warmer.” → “Add more people.” → “Change the decor to modern style.”</span></li>
                            </ul>
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <Layers className="w-8 h-8 text-green-500 mb-2" />
                    <CardTitle>Why Nano Banana Excels at Intent-Driven Editing</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside text-gray-700 space-y-2 text-sm">
                        <li>
                            <span className="font-semibold">Multi-step editing:</span> Nano Banana lets you refine images step by step, responding to your evolving intent without decreasing quality of the original image.
                        </li>
                        <li>
                            <span className="font-semibold">Conversational workflow:</span> Use natural language to guide edits, making the process more intuitive and creative.
                        </li>
                        <li>
                            <span className="font-semibold">Flexible and forgiving:</span> No need to get everything perfect in one prompt—adjust and iterate as you go.
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="bg-[#05092E]">
                <CardHeader>
                    <ArrowRightLeft className="w-8 h-8 text-white mb-2" />
                    <CardTitle className="text-white">Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-white text-sm">
                        <span className="font-semibold">Prompt engineering</span> is about precision and up-front detail, while <span className="font-semibold">intent-driven editing</span> (with tools like Nano Banana) is about flexibility, iteration, and creative flow. Choose the approach that fits your workflow—or combine both for the best results!
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}