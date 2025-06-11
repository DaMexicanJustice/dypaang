"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video, Clock, Clapperboard } from "lucide-react"

export function VideoPromptWizard() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="text-center space-y-6 py-12">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
          <Video className="w-8 h-8 text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Video Prompt Generator</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Create compelling prompts for AI video generation. Coming soon with advanced features for motion, timing, and
          cinematic effects.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12">
          <Card>
            <CardHeader className="text-center">
              <Clapperboard className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <CardTitle className="text-lg text-gray-900">Scene Direction</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Define camera movements, angles, and scene composition for dynamic video generation.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Clock className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
              <CardTitle className="text-lg text-gray-900">Timing Control</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Specify duration, pacing, and temporal elements to create perfectly timed sequences.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Video className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <CardTitle className="text-lg text-gray-900">Motion Effects</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600">
                Add motion blur, transitions, and cinematic effects for professional results.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <Button variant="outline" size="lg" className="mt-8">
          Notify Me When Available
        </Button>
      </div>
    </div>
  )
}
