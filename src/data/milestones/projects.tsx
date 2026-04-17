import React from "react";
import { GraduationCap, Globe, BookOpen, MessageCircle, Target } from "lucide-react";
import { Project } from "./types";

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
