"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Target, Lightbulb, Zap, ArrowLeftRight } from "lucide-react"

interface IntentSectionProps {
  activeTab: string
}

export function IntentSection({ activeTab }: IntentSectionProps) {
  if (activeTab === "what-is-intent") {
    return (
      <div className="p-8 max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
            <Brain className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Understanding Intent</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Intent-driven prompting helps AI models understand not just what you want, but why you want it.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <ArrowLeftRight className="w-8 h-8 text-blue-500 mb-2" />
              <CardTitle className="text-gray-900">Prompt engineering or intent-driven</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                You either choose or combine both approaches: <br></br><br></br><strong>Prompt Engineering:</strong> You describe all the details yourself - composition, lighting, style, etc. <br></br><br></br> <strong>Intent-Driven:</strong> You describe your intention, what it&apos;s used for, and ask ChatGPT questions - letting ChatGPT handle the prompt engineering for you.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Target className="w-8 h-8 text-green-500 mb-2" />
              <CardTitle className="text-gray-900">Purpose-Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Intent helps define the purpose behind your creative vision. Instead of just describing visuals, you
                communicate the emotional impact, target audience, and desired outcome.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Lightbulb className="w-8 h-8 text-amber-500 mb-2" />
              <CardTitle className="text-gray-900">Context Awareness</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                By including intent, AI models can make better decisions about style, composition, and details that
                align with your specific use case and goals.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle className="text-gray-900">Key Intent Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Badge variant="secondary" className="justify-center py-2">
                Commercial
              </Badge>
              <Badge variant="secondary" className="justify-center py-2">
                Artistic
              </Badge>
              <Badge variant="secondary" className="justify-center py-2">
                Educational
              </Badge>
              <Badge variant="secondary" className="justify-center py-2">
                Personal
              </Badge>
              <Badge variant="secondary" className="justify-center py-2">
                Marketing
              </Badge>
              <Badge variant="secondary" className="justify-center py-2">
                Editorial
              </Badge>
              <Badge variant="secondary" className="justify-center py-2">
                Social Media
              </Badge>
              <Badge variant="secondary" className="justify-center py-2">
                Conceptual
              </Badge>
            </div>
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
        <h1 className="text-3xl font-bold text-gray-900">Intent Examples</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          See how different intents shape the same basic prompt in various ways.
        </p>
      </div>

      {/* Dypång Event Bureau Card - ChatGPT Style */}
      <Card className="bg-white border-gray-200">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <CardTitle className="text-lg text-gray-900">ChatGPT intent-driven conversation</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Message */}
          <div className="flex gap-3 justify-end">
            <div className="flex-1"></div>
            <div className="flex-1 flex justify-end">
              <div className="bg-purple-500 p-4 rounded-2xl rounded-tr-sm max-w-[80%]">
                <p className="text-white">
                  I am creating text to image prompts and images for a Danish company called dypång. (This is their website https://www.dypång.dk, look up what they do). I want to create text prompts that will be used to showcase venues and events, so they should invoke emotion, a promise of a cool experience, ideally candid moments captured of people enjoying the event -- to help sell events.
                </p>
              </div>
            </div>
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">You</span>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-sm max-w-[80%]">
                <p className="text-gray-700">
                  You are on the right track! From my research, dypång is an event bureau based in Aarhus, Denmark, focused on creating immersive, emotionally charged events that foster movement, energy, and connection—including company days, kick-offs, product launches, jubilees, conferences, family days, summer parties, and Christmas celebrations
                  dypaang.dk
                  +2
                  dypaang.dk
                  +2
                  .

                  They create experiences that are simultaneously sanselige & snorlige —meaning deeply sensory, yet precisely controlled—combining creativity with structure to produce memorable, emotionally resonant moments
                </p>
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-3 justify-end">
            <div className="flex-1"></div>
            <div className="flex-1 flex justify-end">
              <div className="bg-purple-500 p-4 rounded-2xl rounded-tr-sm max-w-[80%]">
                <p className="text-white">
                  Just to check tell me what types of events they specialize in
                </p>
              </div>
            </div>
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">You</span>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-sm max-w-[80%]">
                <p className="text-gray-700">
                  They specialize in company days, kick-offs, product launches, jubilees, conferences, family days, summer parties, and Christmas celebrations.
                </p>
              </div>
            </div>
          </div>

          {/* User Message */}
          <div className="flex gap-3 justify-end">
            <div className="flex-1"></div>
            <div className="flex-1 flex justify-end">
              <div className="bg-purple-500 p-4 rounded-2xl rounded-tr-sm max-w-[80%]">
                <p className="text-white">
                  My event is for a target diverse group in the 40s
                </p>
              </div>
            </div>
            <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">You</span>
            </div>
          </div>

          {/* AI Response */}
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">AI</span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 p-4 rounded-2xl rounded-tl-sm max-w-[80%]">
                <p className="text-gray-700">
                  Perfect — thank you for clarifying!
                  If the target audience is a diverse group in their 40s, we’ll want to reflect:

                  Confidence & maturity → people who know how to enjoy themselves without it being over-the-top.

                  Diversity → a mix of ages (late 30s–50s), genders, ethnicities, styles.

                  Energy with sophistication → not wild party vibes, but joyful, relaxed, connected.

                  Candid, genuine emotion → laughter, conversation, dancing, meaningful connections.½
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
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
      </div>
    </div>
  )
}
