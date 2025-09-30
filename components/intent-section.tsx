"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { XCircle, Wind, Zap, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface IntentSectionProps {
  activeTab: string
  setActiveSection: (section: string) => void
}

export function IntentSection({ activeTab, setActiveSection }: IntentSectionProps) {
  if (activeTab === "what-is-intent") {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto">
            <span className="text-3xl">🍌</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Introduction to Nano Banana</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Nano Banana is a large language model capable of generating text-to-images as well as multi-step editing.
          </p>
        </div>

        <div className="flex flex-row gap-6">
          <div className="flex flex-col gap-6">
            <Card>
              <CardHeader>
                <CheckCircle className="w-8 h-8 text-green-500 mb-2" />
                <CardTitle className="text-gray-900">Pros</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  <ul className="list-decimal list-inside space-y-2">
                    <li>
                      Its advanced model delivers consistent scene preservation
                    </li>
                    <li>
                      Its powerful features do not slow it down — generation is fast and seamless, making for an efficient workflow.
                    </li>
                    <li>
                      Available as a chat-to-edit model, enabling multi-step editing with layering technology.
                    </li>
                  </ul>
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="relative">
              <CardHeader>
                <Wind className="w-8 h-8 text-amber-500 mb-2" />
                <CardTitle className="text-gray-900">What Is Multi-Step Editing?</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  Multi-step editing means you can give a series of instructions — like a chain of edits — and the model applies them all at once, while keeping the image coherent. It’s like saying: <br></br><br></br>
                  <span className="font-semibold">“Make the person smile, turn their head slightly to the left, change the background to a sunset beach, and add sunglasses.” </span><br></br><br></br>
                  Instead of needing to do each of those edits separately, a multi-step editing model like Nano Banana can (in theory) handle all of them in one prompt and produce a realistic result that still looks like the same scene. <br></br>
                  The advantage is that it is <span className="underline">easier to work with and it does not degrade the image quality</span> as much as doing multiple single edits would.
                  <Button
                    variant="link"
                    className="absolute bottom-2 right-5 p-2 ml-1 underline"
                    onClick={() => setActiveSection("chat-to-edit-examples")}
                  >
                    Examples
                  </Button>
                </CardDescription>
              </CardContent>
            </Card>
          </div>
          <Card className="h-auto self-start">
            <CardHeader>
              <XCircle className="w-8 h-8 text-red-500 mb-2" />
              <CardTitle className="text-gray-900">Cons</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 flex flex-col gap-2">
                <ul className="list-decimal list-inside space-y-2 mt-2">
                  <li>
                    Unknown origins: Despite its popularity, Nano Banana’s developers remain anonymous. Some speculate Google is behind it, but there’s no official confirmation.
                  </li>
                  <li>
                    No clear documentation: Users and reviewers have noted the absence of technical papers or model architecture details, which makes it hard to assess its safety, biases, or limitations.
                  </li>
                  <li>
                    Marketing vs. reality: While Nano Banana claims to handle complex multi-step edits and preserve identity across changes, real-world testing shows mixed results. Some edits fail to maintain facial consistency or introduce subtle artifacts.
                  </li>
                  <li>
                    Contextual errors: In certain scenarios, the model struggles with nuanced instructions, especially when edits involve multiple subject
                  </li>
                </ul>
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card className="">
          <CardHeader>
            <CardTitle className="text-gray-900">Key Features</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm">
              Nano Banana is designed more for editing and composition than for generating images from scratch. Keep an eye out for a model that outperforms it when starting from scratch and then switch to Nano Banana for chat-to-edit. <br></br>
              For now it performs satisfactory for photorealism and “real” location and people. In other words it’s not ideal for fantasy art or the surreal.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Badge variant="secondary" className="justify-center py-2 bg-[#F3415E]  text-white">
                Multi-Step Editing
              </Badge>
              <Badge variant="secondary" className="justify-center py-2 bg-[#F3415E]  text-white">
                Intent-driven
              </Badge>
              <Badge variant="secondary" className="justify-center py-2 bg-[#F3415E]  text-white">
                Chat-to-edit
              </Badge>
              <Badge variant="secondary" className="justify-center py-2 bg-[#F3415E]  text-white">
                Scene Consistency
              </Badge>
              <Badge variant="secondary" className="justify-center py-2 bg-[#F3415E]  text-white">
                10-15s Generation Speed
              </Badge>
              <Badge variant="secondary" className="justify-center py-2 bg-[#F3415E]  text-white">
                Omni-reference
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-0 border-[#F3415E]-75">
          <CardHeader>
            <CardTitle>Final remarks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <ul className="text-gray-700 space-y-2 text-sm">
              <li>
                With every LLM vying for your attention and investment, bold promises are everywhere — but the competitive landscape calls for skepticism. Testing is essential to determine how well each model meets needs and delivers real value.
              </li>
              <li>
                Nano Banana has strong visibility on platforms like YouTube, with active discussions that signal growing interest. A model that wasn’t worth exploring wouldn’t attract this level of tutorial support or community buzz.
              </li>
              <li>Ready to get started? Follow the tips and examples in the image flow!</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto">
          <Zap className="w-8 h-8 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Chat-To-Edit Example</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          The OpenArt.AI chat-to-edit feature supports Nano Banana as its model-- providing multi-step editing capabilities.
        </p>
        <p className="font-semibold">Chosen an image from history 🕜:</p>

        <div className="flex flex-col justify-center items-end gap-4">
          <Image alt="ex-0" src="/chat-to-edit-ex-0.jpg" height={200} width={300}></Image>
          <p className="text-xs opacity-75">attachment</p>
        </div>

      </div>

      {/* Dypång Event Bureau Card - ChatGPT Style */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-[#F3415E] " />
            <CardTitle className="text-lg text-gray-900">Chat-To-Edit intent-driven conversation</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Message */}
          <div className="flex gap-3 justify-end">
            <div className="flex-1"></div>
            <div className="flex-1 flex justify-end">
              <div className="bg-[#F3415E]  p-4 rounded-2xl rounded-tr-sm max-w-[80%]">
                <p className="text-white">
                  Add furniture and seating area for a summer festival with people socializing caught in a candid moment.
                </p>
              </div>
            </div>
            <div className="w-8 h-8 bg-[#F3415E]  rounded-full flex items-center justify-center flex-shrink-0 p-5">
              <span className="text-white text-sm font-bold">You</span>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-[#05092E]  rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-sm max-w-[80%]">
                <p className="text-gray-700">
                  Working... 💭 <br></br>
                  <Image alt="ex-1" src="/chat-to-edit-ex-1.jpg" height={100} width={200}></Image>
                </p>
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-3 justify-end">
            <div className="flex-1"></div>
            <div className="flex-1 flex justify-end">
              <div className="bg-[#F3415E]  p-4 rounded-2xl rounded-tr-sm max-w-[80%]">
                <p className="text-white">
                  Change the lighting to golden-hour
                </p>
              </div>
            </div>
            <div className="w-8 h-8 bg-[#F3415E]  rounded-full flex items-center justify-center flex-shrink-0 p-5">
              <span className="text-white text-sm font-bold">You</span>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-[#05092E]  rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-sm max-w-[80%]">
                <p className="text-gray-700">
                  Working... 💭 <br></br>
                  Changed the lighting to golden-hour. <br></br>
                  <Image alt="ex-2" src="/chat-to-edit-ex-2.jpg" height={100} width={200}></Image>
                </p>
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-3 justify-end">
            <div className="flex-1"></div>
            <div className="flex-1 flex justify-end">
              <div className="bg-[#F3415E]  p-4 rounded-2xl rounded-tr-sm max-w-[80%]">
                <p className="text-white">
                  Upscale the image and make the people look more like they are in their 40s
                </p>
              </div>
            </div>
            <div className="w-8 h-8 bg-[#F3415E]  rounded-full flex items-center justify-center flex-shrink-0 p-5">
              <span className="text-white text-sm font-bold">You</span>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-[#05092E]  rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-sm max-w-[80%]">
                <p className="text-gray-700">
                  Working... 💭 <br></br>
                  Upscaled the image and adjusted the ages of the people to look more like they are in their 40s. <br></br>
                  <Image alt="ex-3" src="/chat-to-edit-ex-2.jpg" height={200} width={300}></Image>
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* <div className="space-y-6">
        {[
          {
            intent: "Event Photography",
            prompt: "People at a party mingling and in high spirits.",
            enhanced:
              "“A stylish group of professionals in their 40s gathered in a modern event space, laughing candidly while holding drinks, warm ambient lighting, chic décor with natural wood and greenery, people caught mid-conversation and mid-laughter—diverse group, vibrant yet sophisticated energy.”",
            color: "blue",
          },
          {
            intent: "Dining & Social Events",
            prompt: "People eating dinner at a table-- celebrating a holiday",
            enhanced:
              "“Candid photo of a diverse group of adults in their 40s seated around a beautifully decorated dinner table, clinking glasses of wine, warm golden lighting from candles, elegant table setting, relaxed smiles and lively conversation—atmosphere of warmth, connection, and joy.”",
            color: "pink",
          },
          {
            intent: "Celebration & Toast Moments",
            prompt: "People celebrating and toasting to each other by a table.",
            enhanced:
              "“Candid shot of people in their 40s dressed in smart-casual attire, raising glasses in a toast, warm and inviting lighting, confetti gently falling, background filled with laughter and clapping—diverse group radiating joy and shared celebration.”",
            color: "green",
          },
        ].map((example, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-${example.color}-500`} />
                <CardTitle className="text-lg text-gray-900">{example.intent}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">Basic Prompt:</div>
                <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{example.prompt}</p>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-600 mb-2">Intent-Enhanced Prompt:</div>
                <p className="text-gray-700 bg-green-50 p-3 rounded-lg">{example.enhanced}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div> */}
    </div>
  )
}
