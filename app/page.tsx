"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Lightbulb, MessageCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

const familyIcebreakers = [
  "What family recipe do you hope never disappears?",
  "What's the funniest family story you've heard recently?",
  "If you could ask any family member from the past one question, what would it be?",
  "What family tradition means the most to you?",
  "What's something you learned from a family member that you still use today?",
  "What's the most adventurous thing someone in our family has done?",
  "What family photo always makes you smile?",
  "What's a family saying or phrase that always stuck with you?",
]

const conversationNudges = [
  "What's the story behind that?",
  "How did that make you feel?",
  "What would you do differently?",
  "What surprised you most about that experience?",
  "How has that changed over the years?",
]

const listeningTips = [
  "Summarize what they said before adding your point",
  "Listen to understand",
  "Share from personal experience, not general claims",
  "Ask clarifying questions",
]

const conversationScenarios = [
  {
    situation: "Tension rises",
    tips: [
      "Pause and ask a clarifying question: ‘Can you explain why you think that?’",
      "Redirect to personal experiences rather than general arguments",
      "Suggest taking a break or changing topics if needed",
    ],
  },
  {
    situation: "The conversation stays surface-level",
    tips: [
      "Ask 'why' or 'how' questions to go deeper",
      "Share something vulnerable about yourself first",
      "Ask about feelings, not just facts: 'How did that affect you?'",
    ],
  },
]

export default function IcebreakerApp() {
  const [currentIcebreaker, setCurrentIcebreaker] = useState<string>("")
  const [showNudges, setShowNudges] = useState(false)
  const [showListening, setShowListening] = useState(false)
  const [conversationStarted, setConversationStarted] = useState(false)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("conversation") === "true") {
      if (!currentIcebreaker) {
        const randomIcebreaker = familyIcebreakers[Math.floor(Math.random() * familyIcebreakers.length)]
        setCurrentIcebreaker(randomIcebreaker)
      }
      setConversationStarted(true)
      // Clean up URL parameter
      window.history.replaceState({}, "", "/")
    }
  }, [currentIcebreaker])

  const startConversation = () => {
    const randomIcebreaker = familyIcebreakers[Math.floor(Math.random() * familyIcebreakers.length)]
    setCurrentIcebreaker(randomIcebreaker)
    setConversationStarted(true)
    setShowNudges(false)
  }

  const getNewIcebreaker = () => {
    const randomIcebreaker = familyIcebreakers[Math.floor(Math.random() * familyIcebreakers.length)]
    setCurrentIcebreaker(randomIcebreaker)
    setShowNudges(false)
  }

  const toggleNudges = () => {
    setShowNudges(!showNudges)
    if (!showNudges) {
      setShowListening(false)
    }
  }

  const toggleListening = () => {
    setShowListening(!showListening)
    if (!showListening) {
      setShowNudges(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div
        className={`absolute bottom-0 left-0 -translate-x-6 translate-y-8 z-10 ${conversationStarted ? "hidden md:block" : "block"}`}
      >
        <img
          src="/robot-logo.png"
          alt="Connecto Robot"
          className="w-50 h-50 md:w-80 md:h-80 opacity-90 hover:opacity-100 transition-all duration-300 transform rotate-12 hover:rotate-6"
          style={{
            mixBlendMode: "multiply",
            filter: "drop-shadow(0 0 0 transparent)",
          }}
        />
      </div>

      <div className="mx-auto max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2 pt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold text-foreground text-balance">Connecto</h1>
          </div>
          <p className="text-muted-foreground text-pretty">Fostering meaningful conversations</p>
        </div>

        {!conversationStarted ? (
          /* Start Screen */
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary/5 min-w-[350px] min-h-[150px]">
              <CardContent className="p-6 text-center space-y-6">
                <h2 className="text-xl font-semibold text-foreground">Ready to connect?</h2>
                <Button
                  onClick={startConversation}
                  className="w-60 h-12 text-base font-medium bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Start Conversation
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          /* Conversation Screen */
          <div className="space-y-6">
            {/* Current Icebreaker */}
            <Card className="border-primary/20 bg-primary/5 min-w-[350px]">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-foreground">
                    Here's a question to get the conversation started:
                  </h2>
                </div>
                <p className="text-lg text-foreground font-medium text-pretty">"{currentIcebreaker}"</p>

                <div className="flex justify-start pt-2">
                  <Link href="/connect">
                    <Button variant="outline" className="w-32 h-8 text-xs font-medium bg-transparent" size="sm">
                      Need Help?
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3 flex flex-col items-center">
              <Button
                onClick={getNewIcebreaker}
                className="w-60 h-12 text-base font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
                size="lg"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Next Question
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={toggleNudges}
                variant={showNudges ? "default" : "outline"}
                className="h-12 text-sm font-medium"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Curious Questions
              </Button>
              <Button
                onClick={toggleListening}
                variant={showListening ? "default" : "outline"}
                className="h-12 text-sm font-medium"
              >
                <Heart className="h-4 w-4 mr-2" />
                Conversation Tips
              </Button>
            </div>

            {/* Conversation Nudges */}
            {showNudges && (
              <Card className="animate-in slide-in-from-bottom-4 duration-300">
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2">
                    {conversationNudges.map((nudge, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">"{nudge}"</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Listening Tips */}
            {showListening && (
              <Card className="animate-in slide-in-from-bottom-4 duration-300">
                <CardContent className="p-4 space-y-3">
                  <div className="space-y-2">
                    {listeningTips.map((tip, index) => (
                      <div key={index} className="p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">{tip}</p>
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
