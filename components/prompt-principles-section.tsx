"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Camera, Aperture, User, Layers, Smile, Sparkles, Image as ImageIcon, MapPin } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { Button } from "./ui/button"


export function PromptPrinciplesSection() {
    const [revealed, setRevealed] = useState(false);
    const [expanded, setExpanded] = useState(false);

    // The full prompt text
    const promptText = `Spacious warehouse with industrial charm, high ceilings, roaring 20s-inspired corporate party for JYSK themed “The Great Gatsby” with diverse named individuals such as Sofie Madsen, Lars Nielsen, Jonas Pedersen, Raaj Singh, Aisha Al-Jazuli dressed in playful 1920s inspired outfits: flapper dresses, sequined tops, suspenders, tuxedo shirts, fedoras, feathered headbands
Captured candidly in the midst of conversation, dancing, laughing, clinking glasses, or moving across the floor; no one posing for the camera; authentic guests of various ages 20s to 60s immersed in the celebration

(Stage for entertainment, disco balls, confetti in the air, fog machines)

🥳🎭📸🍸🍾
(A vibrant night of vintage fun, team celebration, and high-energy festivity)
(Joyful atmosphere, upbeat and genuine)

(Colorful strobes in purple, blue, and gold hues illuminate the scene
Disco balls shimmer overhead
Energetic lighting design
Fog machines add haze, cutting beams of light through the crowd)

– Candid photography
– Wide angle shot
-- Aspect ratio: 16:9`;

    // Truncate after 4 lines or ~300 chars for preview
    const previewText = promptText.split('\n').slice(0, 4).join('\n') + '...';


    return (
        <div className="p-8 max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                    <ImageIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900">Key Principles for Text-to-Image Prompting</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Crafting effective prompts is essential for generating high-quality images. The image & video flows are based on these core principles to help you get the best results.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Lighting */}
                <Card>
                    <CardHeader>
                        <Sun className="w-8 h-8 text-yellow-500 mb-2" />
                        <CardTitle>Lighting</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Lighting plays a crucial role in setting the mood and atmosphere of an image. Specify the type of lighting. Consider defining multiple light sources for dynamic interplay and using lighting techniques like chiaroscuro to create depth and contrast.<br />
                            <span className="text-sm text-gray-500">e.g. golden hour, soft diffused light, dramatic shadows</span>
                        </CardDescription>
                    </CardContent>
                </Card>

                {/* Composition */}
                <Card>
                    <CardHeader>
                        <Camera className="w-8 h-8 text-indigo-500 mb-2" />
                        <CardTitle>Composition</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Describe the arrangement of subjects and objects. <br />
                            <span className="text-sm text-gray-500">e.g. &quot;rule of thirds&quot;, &quot;centered portrait&quot;, &quot;wide shot&quot;</span>
                        </CardDescription>
                    </CardContent>
                </Card>

                {/* Camera Effects */}
                <Card>
                    <CardHeader>
                        <Aperture className="w-8 h-8 text-pink-500 mb-2" />
                        <CardTitle>Camera Effects</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Selecting the right lens and camera angle can dramatically transform the perspective and impact of an image. Lenses offer distinct visual effects and depth, influencing how subjects and environments are perceived. Similarly, camera angles add dynamic variation to composition, shaping the experience and enhancing the storytelling potential of each shot.<br />
                            <span className="text-sm text-gray-500">e.g. &quot;bokeh&quot;, &quot;shallow depth of field&quot;, &quot;motion blur&quot;</span>
                        </CardDescription>
                    </CardContent>
                </Card>

                {/* Subject */}
                <Card>
                    <CardHeader>
                        <User className="w-8 h-8 text-green-500 mb-2" />
                        <CardTitle>Subject</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Clearly define the main subject(s) of the image. <br />
                            <span className="text-sm text-gray-500">e.g. &quot;Open warehouse area with a main floor and a stage backdrop&quot;, &quot;Open area with seating areas and food trucks off to the side&quot;</span>
                            <br></br>
                            Note there can be overlap between subject and location and you can join them together!
                        </CardDescription>
                    </CardContent>
                </Card>

                {/* Additional Details */}
                <Card>
                    <CardHeader>
                        <Layers className="w-8 h-8 text-orange-500 mb-2" />
                        <CardTitle>Objects & Textures</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Mention important objects, textures, or materials. <br />
                            <span className="text-sm text-gray-500">e.g. &quot;pallet furniture benches, rough wooden texture&quot;, &quot;opened black parasols, nylon&quot;, &quot;fairy lights hanging over head, thin stringy rope&quot;</span>
                        </CardDescription>
                    </CardContent>
                </Card>

                {/* Emojis for Mood */}
                <Card>
                    <CardHeader>
                        <Smile className="w-8 h-8 text-yellow-400 mb-2" />
                        <CardTitle>Emojis for Mood</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Use emojis to quickly convey mood or atmosphere. <br />
                            <span className="text-sm text-gray-500">e.g. &quot;😊🌅🎉&quot; for happy, sunset, celebration</span>
                        </CardDescription>
                    </CardContent>
                </Card>

                {/* Buzz Words for Mood */}
                <Card>
                    <CardHeader>
                        <Sparkles className="w-8 h-8 text-purple-500 mb-2" />
                        <CardTitle>Buzz Words for Mood</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Add descriptive words to set the vibe. <br />
                            <span className="text-sm text-gray-500">e.g. &quot;vibrant&quot;, &quot;cozy&quot;, &quot;elegant&quot;, &quot;energetic&quot;</span>
                        </CardDescription>
                    </CardContent>
                </Card>

                {/* Aspect Ratio */}
                <Card>
                    <CardHeader>
                        <ImageIcon className="w-8 h-8 text-gray-500 mb-2" />
                        <CardTitle>Aspect Ratio</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Specify the image shape for best results. <br />
                            <span className="text-sm text-gray-500">e.g. &quot;16:9&quot;, &quot;square&quot;, &quot;portrait&quot;</span>
                        </CardDescription>
                    </CardContent>
                </Card>

                {/* Location Description */}
                <Card>
                    <CardHeader>
                        <MapPin className="w-8 h-8 text-red-500 mb-2" />
                        <CardTitle>Location Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            Set the scene with a clear location. <br />
                            <span className="text-sm text-gray-500">e.g. &quot;outdoor area by the water&quot;, &quot;inside a warehouse building&quot;, &quot;urban rooftop&quot;</span>
                        </CardDescription>
                    </CardContent>
                </Card>
            </div>

            <Card className="bg-[#05092E]">
                <CardHeader>
                    <CardTitle className="text-white">Structure of a prompt</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-col items-center space-y-6 py-2">
                        {/* Top Row */}
                        <div className="flex flex-row justify-center items-center space-x-8">
                            <span className="text-white font-semibold tracking-wide">SUBJECT</span>
                            <span className="text-white font-semibold tracking-wide">...ADDITIONAL...OBJECTS...</span>
                            <span className="text-2xl">😌 🌍 🖼️ ☁️ 🍃</span>
                        </div>
                        {/* Middle Row */}
                        <div className="flex flex-row justify-center items-center space-x-16">
                            <span className="text-white font-semibold tracking-wide">LOCATION</span>
                            <span className="text-white font-semibold tracking-wide">LIGHTING</span>
                            <span className="text-white font-semibold tracking-wide">(…MOODS…)</span>
                        </div>
                        {/* Bottom Row */}
                        <div className="flex flex-row justify-center items-center space-x-16">
                            <span className="text-white font-semibold tracking-wide">COMPOSITION</span>
                            <span className="text-white font-semibold tracking-wide">CAMERA EFFECTS</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-[#05092E]">
                <CardHeader>
                    <CardTitle className="text-white">Natural Language Enhancements for prompts</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-white">
                        AI text-to-image models don’t think like humans and can’t read your mind—they only generate visuals based on the words and structure you give them. To get better results, you need to guide the model with clear natural language and structured hints.</p>

                    <div className="flex flex-col items-center space-y-6 py-2">

                        {/* Enhancement Explanation */}
                        <div className="mt-6 text-center max-w-2xl">
                            <p className="text-white text-sm">
                                <span className="font-semibold">Tip:</span> Use <span className="font-mono px-1 rounded bg-white/10 text-[#F3415E]">( )</span> to group concepts and ideas for clarity and emphasis.<br />
                                Use <span className="font-mono px-1 rounded bg-white/10 text-[#F3415E]">--</span> to separate technical details or parameters (e.g. <span className="font-mono">--aspect ratio: 16:9</span>).
                            </p>
                            <p className="text-white text-xs mt-2 opacity-80">
                                This structure helps AI better understand your intent and improves the quality of generated images.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="bg-[#F3415E]">
                <CardHeader>
                    <CardTitle className="text-white">Tips for Effective Prompts</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="list-disc list-inside text-gray-200 space-y-2 text-sm font-semibold">
                        <li>Be specific and concise—avoid ambiguity.</li>
                        <li>Combine multiple principles for richer results.</li>
                        <li>Experiment with different moods and effects.</li>
                        <li>Review outputs and refine your prompt iteratively.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="flex flex-col md:flex-row items-stretch bg-white border-[#F3415E] overflow-hidden pr-5">
                {/* Text Section */}
                <div className="flex-1 p-6 flex flex-col justify-center">
                    <CardTitle className="text-xl font-bold mb-2 text-[#05092E]">Putting it all together</CardTitle>
                    <CardDescription className="text-gray-700 whitespace-pre-line">
                        {expanded ? promptText : previewText}
                        <Button
                            variant="link"
                            onClick={() => setExpanded((v) => !v)}
                        >
                            {expanded ? "Show less" : "Read more"}
                        </Button>
                    </CardDescription>
                </div>
                {/* Image Section */}
                <div className="relative flex-shrink-0 w-full md:w-1/2 bg-gray-100 flex items-center justify-center min-h-96">
                    <div className="relative w-full h-96 flex items-center justify-center">
                        <Image
                            height={600}
                            width={800}
                            src="/great-gatsby.png"
                            alt="Great Gatsby Party Result"
                            className={`object-cover w-full rounded-lg h-full max-h-96 transition-all duration-500 ${revealed ? "blur-0" : "blur-md"}`}
                            style={{ filter: revealed ? "none" : "blur(16px)" }}
                        />
                        {!revealed && (
                            <button
                                className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all duration-300 hover:cursor-pointer"
                                onClick={() => setRevealed(true)}
                                tabIndex={0}
                                aria-label="Reveal image"
                            >
                                <span className="text-white text-2xl font-bold px-8 py-4 rounded-lg bg-black/60 shadow-lg border-2 border-white hover:bg-black/80 transition">
                                    Generate Image
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            </Card>
        </div>
    )
}