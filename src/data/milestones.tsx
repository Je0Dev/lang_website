import React from "react";
import { GraduationCap, Globe, BookOpen, MessageCircle, Zap, Target, Calendar, ExternalLink, ArrowUpRight } from "lucide-react";

export interface Project {
  title: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
  tag: string;
  labelColor: string;
  category: string;
  longDesc: string;
  date: string;
  links?: { text: string; url: string }[];
}

export interface JourneyItem {
  id: number;
  title: string;
  company: string;
  period: string;
  desc: string;
  longDesc: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
  hex: string;
  links?: { text: string; url: string }[];
  highlights: string[];
  tips: string[];
}

export const projects: Project[] = [
  {
    title: "Goethe Zertifikat B2",
    desc: "Passed the official German language certification.",
    color: "duo-border-green",
    icon: <GraduationCap className="text-brand-green" />,
    tag: "CERTIFICATE",
    labelColor: "bg-brand-green",
    category: "CERTIFICATE",
    longDesc: "After years of consistent study, I finally achieved my goal of passing the Goethe-Zertifikat B2 exam. This certification represents a solid intermediate level in German.",
    date: "2024",
    links: [{ text: "Goethe Institute", url: "https://www.goethe.de/" }]
  },
  {
    title: "German Immersion",
    desc: "Daily consumption of German content including films, series, and podcasts.",
    color: "duo-border-yellow",
    icon: <Globe className="text-brand-yellow" />,
    tag: "IMMERSION",
    labelColor: "bg-brand-yellow",
    category: "IMMERSION",
    longDesc: "Immersion is the cornerstone of my German learning journey. I consume German content daily through Netflix series, YouTube, and podcasts.",
    date: "Ongoing",
    links: [{ text: "Easy German YouTube", url: "https://www.youtube.com/@easygerman" }, { text: "Dark Netflix", url: "https://www.netflix.com/title/80100123" }]
  },
  {
    title: "Spanish Journey",
    desc: "Building foundations in Spanish through comprehensible input.",
    color: "duo-border-pink",
    icon: <BookOpen className="text-brand-pink" />,
    tag: "LEARNING",
    labelColor: "bg-brand-pink",
    category: "CHALLENGE",
    longDesc: "Spanish is my current focus. I started with Dreaming Spanish following the CI method. Currently at A2 level.",
    date: "2024-Present"
  },
  {
    title: "Mandarin Challenge",
    desc: "Beginning the journey into Chinese, focusing on tones and Pinyin.",
    color: "duo-border-pink",
    icon: <BookOpen className="text-brand-pink" />,
    tag: "LEARNING",
    labelColor: "bg-brand-pink",
    category: "CHALLENGE",
    longDesc: "Chinese represents the ultimate challenge. The transition from alphabetic to logographic writing requires a different type of memory.",
    date: "2024-Present",
    links: [{ text: "HelloChinese", url: "https://www.hellochinese.cc/" }, { text: "Skritter", url: "https://skritter.com/" }]
  },
  {
    title: "English Mastery",
    desc: "Maintaining C1 proficiency through daily consumption.",
    color: "duo-border-green",
    icon: <Globe className="text-brand-green" />,
    tag: "MAINTENANCE",
    labelColor: "bg-brand-green",
    category: "IMMERSION",
    longDesc: "English was acquired from a young age. Now the focus is on maintenance through daily consumption of podcasts and YouTube.",
    date: "Ongoing"
  },
  {
    title: "100-Day Anki Streak",
    desc: "Building vocabulary consistently with daily Anki reviews.",
    color: "duo-border-teal",
    icon: <GraduationCap className="text-brand-teal" />,
    tag: "STREAK",
    labelColor: "bg-brand-teal",
    category: "ACHIEVEMENT",
    longDesc: "The 100-day streak was a game-changer for vocabulary. This consistent habit helped build 2000+ words.",
    date: "2023"
  },
  {
    title: "First German Conversation",
    desc: "Successfully held a 30-minute conversation entirely in German.",
    color: "duo-border-blue",
    icon: <MessageCircle className="text-brand-blue" />,
    tag: "MILESTONE",
    labelColor: "bg-brand-blue",
    category: "ACHIEVEMENT",
    longDesc: "After 8 months of studying, I finally had my first real conversation in German. It wasn't perfect but it was exhilarating.",
    date: "2023"
  },
  {
    title: "German B1 Breakthrough",
    desc: "Reached B1 level in German after 6 months of intensive study.",
    color: "duo-border-purple",
    icon: <GraduationCap className="text-brand-purple" />,
    tag: "CERTIFICATE",
    labelColor: "bg-brand-purple",
    category: "CERTIFICATE",
    longDesc: "Reaching B1 was my first major milestone in German. It felt like crossing a threshold where I could finally understand simple conversations.",
    date: "2022"
  },
  {
    title: "Polyglot Conference",
    desc: "Attended my first polyglot conference and connected with fellow enthusiasts.",
    color: "duo-border-orange",
    icon: <Globe className="text-brand-orange" />,
    tag: "EVENT",
    labelColor: "bg-brand-orange",
    category: "EVENT",
    longDesc: "Attending the Polyglot Conference was eye-opening. Meeting people who speak 10+ languages was inspiring.",
    date: "2024"
  },
  {
    title: "Language Learning Journey",
    desc: "My complete timeline from beginner to where I am now.",
    color: "duo-border-blue",
    icon: <Target className="text-brand-blue" />,
    tag: "JOURNEY",
    labelColor: "bg-brand-blue",
    category: "JOURNEY",
    longDesc: `My language learning journey began with English as a child. German became my first serious target language around 2021.

**Key Phases:**
• 2021-2022: German A1-B1 - Foundation building
• 2022-2023: German B1-B2 - Intensive study
• 2024: Spanish A1-A2 - Starting new language
• 2024: Chinese HSK1 - Beginning Mandarin

**Lessons Learned:**
1. Consistency beats intensity
2. Comprehensible input is king
3. Don't skip grammar entirely
4. Enjoy the process`,
    date: "2021-Present",
    links: [
      { text: "View Full Journey", url: "/journey" },
      { text: "Nicos Weg", url: "https://learngerman.dw.com/en/nicos-weg/c-36519789" },
      { text: "Dreaming Spanish", url: "https://www.dreamingspanish.com/" }
    ]
  },
];

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