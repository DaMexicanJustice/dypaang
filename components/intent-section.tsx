"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Brain, Target, Lightbulb, Zap } from "lucide-react"

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

      <div className="space-y-6">
        {[
          {
            intent: "Commercial Product Photography",
            prompt: "A sleek smartphone on a minimalist white background",
            enhanced:
              "A sleek smartphone on a minimalist white background, professional product photography for e-commerce, clean lighting, high-end commercial appeal, studio quality",
            color: "blue",
          },
          {
            intent: "Social Media Content",
            prompt: "A cup of coffee on a wooden table",
            enhanced:
              "A cup of coffee on a wooden table, Instagram-worthy lifestyle shot, warm natural lighting, cozy atmosphere, millennial aesthetic, shareable content",
            color: "pink",
          },
          {
            intent: "Editorial Illustration",
            prompt: "A person reading a book in a library",
            enhanced:
              "A person reading a book in a library, editorial illustration for magazine article about education, thoughtful mood, intellectual atmosphere, sophisticated composition",
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
