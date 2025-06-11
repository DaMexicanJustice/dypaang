"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, ImageIcon, Video, Brain, Zap, ArrowRight, Clock, Users } from "lucide-react"

interface TutorialsSectionProps {
  activeTab: string
}

export function TutorialsSection({ activeTab }: TutorialsSectionProps) {
  const tutorials = {
    "prompt-images": {
      title: "How to Prompt Images",
      icon: ImageIcon,
      color: "rose",
      lessons: [
        { title: "Basic Image Prompting", duration: "5 min", level: "Beginner" },
        { title: "Style and Aesthetics", duration: "8 min", level: "Intermediate" },
        { title: "Advanced Composition", duration: "12 min", level: "Advanced" },
        { title: "Technical Parameters", duration: "6 min", level: "Intermediate" },
      ],
    },
    "prompt-videos": {
      title: "How to Prompt Videos",
      icon: Video,
      color: "blue",
      lessons: [
        { title: "Video Prompting Basics", duration: "7 min", level: "Beginner" },
        { title: "Motion and Timing", duration: "10 min", level: "Intermediate" },
        { title: "Cinematic Techniques", duration: "15 min", level: "Advanced" },
        { title: "Scene Transitions", duration: "8 min", level: "Intermediate" },
      ],
    },
    "use-intent": {
      title: "How to Use Intent",
      icon: Brain,
      color: "green",
      lessons: [
        { title: "Understanding Intent", duration: "6 min", level: "Beginner" },
        { title: "Intent Categories", duration: "9 min", level: "Intermediate" },
        { title: "Context-Driven Prompts", duration: "11 min", level: "Advanced" },
        { title: "Intent Best Practices", duration: "7 min", level: "Intermediate" },
      ],
    },
    "prompt-engineering": {
      title: "Prompt Engineering Guide",
      icon: Zap,
      color: "amber",
      lessons: [
        { title: "Prompt Structure", duration: "8 min", level: "Beginner" },
        { title: "Advanced Techniques", duration: "12 min", level: "Advanced" },
        { title: "Optimization Strategies", duration: "10 min", level: "Intermediate" },
        { title: "Common Pitfalls", duration: "6 min", level: "Beginner" },
      ],
    },
  }

  const currentTutorial = tutorials[activeTab as keyof typeof tutorials]

  if (!currentTutorial) {
    return (
      <div className="p-8 max-w-4xl mx-auto">
        <div className="text-center space-y-6 py-12">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto" />
          <h1 className="text-3xl font-bold text-gray-900">Tutorials</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Master the art of prompt engineering with our comprehensive guides.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <div
          className={`w-16 h-16 bg-${currentTutorial.color}-100 rounded-2xl flex items-center justify-center mx-auto`}
        >
          <currentTutorial.icon className={`w-8 h-8 text-${currentTutorial.color}-600`} />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{currentTutorial.title}</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Step-by-step guidance to master this essential skill.</p>
      </div>

      <div className="grid gap-4">
        {currentTutorial.lessons.map((lesson, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 bg-${currentTutorial.color}-500 rounded-xl flex items-center justify-center text-white font-medium`}
                  >
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">{lesson.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {lesson.duration}
                      </div>
                      <Badge
                        variant="secondary"
                        className={
                          lesson.level === "Beginner"
                            ? "bg-green-100 text-green-700"
                            : lesson.level === "Intermediate"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                        }
                      >
                        {lesson.level}
                      </Badge>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                  Start Lesson
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className={`bg-${currentTutorial.color}-50`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-900">
            <Users className="w-5 h-5" />
            Community Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-gray-600">
            Join our community of prompt engineers to share techniques, get feedback on your prompts, and learn from
            real-world examples. Connect with others who are mastering the art of AI communication.
          </CardDescription>
          <Button variant="outline" className="mt-4">
            Join Community
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
