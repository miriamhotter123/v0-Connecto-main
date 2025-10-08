"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Clock, Zap, Heart } from "lucide-react"
import Link from "next/link"

const conversationStates = [
  {
    id: "awkward",
    title: "Getting Awkward",
    icon: Clock,
    description: "Conversation feels quiet or uncomfortable",
    color: "bg-orange-100 border-orange-200 hover:bg-orange-150",
    tips: [
      'Ask an open-ended question: "Can you tell me more about that?"',
      "Circle back to something interesting they mentioned earlier",
      "Ask about their current projects or what they're excited about",
    ],
  },
  {
    id: "tension",
    title: "Tension Rising",
    icon: Zap,
    description: "People disagree or conflict is emerging",
    color: "bg-red-100 border-red-200 hover:bg-red-150",
    tips: [
      "Redirect to personal experiences rather than general arguments",
      "Suggest taking a break or changing topics if needed",
      "Ask questions that focus on feelings rather than positions",
    ],
  },
  {
    id: "surface",
    title: "Staying Surface-Level",
    icon: Heart,
    description: "Conversation isn't going deeper",
    color: "bg-green-100 border-green-200 hover:bg-green-150",
    tips: [
      "Ask 'why' or 'how' questions to go deeper",
      "Share something vulnerable about yourself first",
      "Ask about feelings, not just facts: 'How did that affect you?'",
      "Follow up with: 'What was that like for you?'",
    ],
  },
]

const conversationNudges = [
  "What's the story behind that?",
  "How did that make you feel?",
  "What would you do differently?",
  "Who taught you that?",
  "What surprised you most about that experience?",
  "How has that changed over the years?",
]

export default function ConnectMorePage() {
  const [selectedState, setSelectedState] = useState<string | null>(null)
  const [showNudges, setShowNudges] = useState(false)

  const selectedStateData = conversationStates.find((state) => state.id === selectedState)

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-md space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4">
          <Link href="/?conversation=true">
            <Button variant="ghost" size="sm" className="p-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">How's The Conversation Going?</h1>
          </div>
        </div>

        {!selectedState ? (
          /* State Selection Grid */
          <div className="space-y-4">
            <p className="text-center text-muted-foreground text-pretty">
              Tap the situation that best describes your conversation right now:
            </p>

            <div className="grid grid-cols-1 gap-3">
              {conversationStates.map((state) => {
                const IconComponent = state.icon
                return (
                  <Card
                    key={state.id}
                    className={`cursor-pointer transition-all duration-200 ${state.color}`}
                    onClick={() => setSelectedState(state.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white/50 rounded-lg">
                          <IconComponent className="h-5 w-5 text-foreground" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{state.title}</h3>
                          <p className="text-sm text-muted-foreground text-pretty">{state.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ) : (
          /* Selected State Tips */
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setSelectedState(null)} className="p-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">Back to help options</span>
            </div>

            <Card className={selectedStateData?.color}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/50 rounded-lg">
                    {selectedStateData && <selectedStateData.icon className="h-5 w-5 text-foreground" />}
                  </div>
                  <h2 className="text-xl font-semibold text-foreground">{selectedStateData?.title}</h2>
                </div>
                <p className="text-muted-foreground text-pretty">{selectedStateData?.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 space-y-3">
                <h3 className="font-semibold text-foreground">Here's what you can try:</h3>
                <div className="space-y-3">
                  {selectedStateData?.tips.map((tip, index) => (
                    <div key={index} className="p-3 bg-muted rounded-lg">
                      <p className="text-sm text-muted-foreground">• {tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {showNudges && (
              <Card className="animate-in slide-in-from-bottom-4 duration-300">
                <CardContent className="p-4 space-y-3">
                  <h3 className="font-semibold text-foreground">Try these conversation starters:</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {conversationNudges.slice(0, 4).map((nudge, index) => (
                      <div key={index} className="p-2 bg-primary/5 rounded text-xs text-muted-foreground text-center">
                        "{nudge}"
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
