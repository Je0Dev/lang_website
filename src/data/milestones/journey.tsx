import React from "react";
import { GraduationCap, MessageCircle, Zap } from "lucide-react";
import { JourneyItem } from "./types";

export const journeyItems: JourneyItem[] = [
  {
    id: 1,
    title: "Advanced Fluency (C1-C2)",
    company: "The Final Boss",
    period: "Endgame",
    desc: "This is the stage where you breathe and think like a native.",
    longDesc: "This is the stage where you breathe and think like a native. Complex conversations without hesitation, reading literature and technical documents, expressing nuanced opinions.",
    icon: <GraduationCap className="w-10 h-10" />,
    color: "bg-brand-blue",
    textColor: "text-brand-blue",
    hex: "#1cb0f6",
    links: [
      { text: "TED Talks", url: "https://www.ted.com/talks" },
      { text: "The Economist", url: "https://www.economist.com/podcasts" }
    ],
    highlights: [
      "Complex conversations without hesitation",
      "Reading literature and technical documents",
      "Expressing nuanced opinions",
      "Thinking directly in the target language"
    ],
    tips: [
      "Native media consumption daily",
      "Write practice (journals, essays)",
      "Focus on idioms and colloquialisms",
      "Language exchange partners"
    ]
  },
  {
    id: 2,
    title: "Intermediate Plateau (B1-B2)",
    company: "Getting Deeper",
    period: "After mastering the basics",
    desc: "This is where things get serious. Immersion becomes crucial.",
    longDesc: "This is where things get serious. Immersion through vocabulary in real contexts becomes crucial.",
    icon: <MessageCircle className="w-10 h-10" />,
    color: "bg-brand-green",
    textColor: "text-brand-green",
    hex: "#58cc02",
    links: [
      { text: "Easy Languages YouTube", url: "https://www.youtube.com" }
    ],
    highlights: [
      "Hold conversations on familiar topics",
      "Understand main ideas of complex texts",
      "Deal with most travel situations",
      "Write clear, detailed texts"
    ],
    tips: [
      "Watch native content with subtitles",
      "Start reading graded readers",
      "Practice writing daily",
      "Find conversation partners"
    ]
  },
  {
    id: 3,
    title: "The Beginning (A1-A2)",
    company: "First Steps",
    period: "When you have time",
    desc: "Just start—10 or 30 minutes doesn't matter. Be consistent.",
    longDesc: "Just start—10 or 30 minutes doesn't matter. Be consistent and set mini goals to progress from the beginner phase.",
    icon: <Zap className="w-10 h-10" />,
    color: "bg-brand-purple",
    textColor: "text-brand-purple",
    hex: "#ce82ff",
    highlights: [
      "Introduce yourself and others",
      "Ask/answer personal questions",
      "Simple interactions when spoken slowly",
      "Basic vocabulary of 500-1000 words"
    ],
    tips: [
      "Use Duolingo or similar apps",
      "Watch children's content",
      "Learn core grammar structures",
      "Build daily habit (even 10 min!)"
    ]
  },
];
