import React from "react";
import { MessageCircle, Headphones, BookOpen, Mic } from "lucide-react";

export interface LanguageLevel {
  level: string;
  description: string;
  resources: { text: string; url: string }[];
  blogLinks: { text: string; url: string }[];
}

export interface LanguageDetail {
  name: string;
  flag: string;
  level: string;
  progress: number;
  colors: string[];
  details: string;
  levels: LanguageLevel[];
}

export const uiLanguages: LanguageDetail[] = [
  { 
    name: "Greek", 
    flag: "🇬🇷", 
    level: "Native", 
    progress: 100, 
    colors: ["#001489", "#0D5EAF"], 
    details: "My mother tongue. The foundation of my linguistic journey.",
    levels: [
      {
        level: "Native",
        description: "Born and raised in Greece, Greek is my natural language.",
        resources: [
          { text: "Ελληνικά Radio", url: "https://www.radio.gr/" },
          { text: "Greek News", url: "https://www.in.gr/" }
        ],
        blogLinks: []
      }
    ]
  },
  { 
    name: "English", 
    flag: "🇬🇧", 
    level: "C1", 
    progress: 95, 
    colors: ["#012169", "#C8102E"], 
    details: "Acquired through immersion. C1 certified.",
    levels: [
      {
        level: "B2 - Advanced",
        description: "Can understand complex texts and express ideas fluently.",
        resources: [
          { text: "TED Talks", url: "https://www.ted.com/talks" },
          { text: "The Economist", url: "https://www.economist.com/podcasts" },
          { text: "Lingolia", url: "https://english.lingolia.com/en/" }
        ],
        blogLinks: [
          { text: "Mastering English: Beyond Grammar", url: "/blog" }
        ]
      },
      {
        level: "C1 - Mastery",
        description: "Native-level comprehension and expression.",
        resources: [
          { text: "Cambridge Dictionary", url: "https://dictionary.cambridge.org/" },
          { text: "YouGlish", url: "https://youglish.com/" }
        ],
        blogLinks: []
      }
    ]
  },
  { 
    name: "German", 
    flag: "🇩🇪", 
    level: "B2", 
    progress: 75, 
    colors: ["#DD0000", "#000000"], 
    details: "Goethe B2 certified. Working towards C1.",
    levels: [
      {
        level: "A1-A2",
        description: "Basic communication and everyday situations.",
        resources: [
          { text: "Nicos Weg (DW)", url: "https://learngerman.dw.com/en/nicos-weg/c-36519789" },
          { text: "Duolingo German", url: "https://duolingo.com" }
        ],
        blogLinks: [
          { text: "How to Start Learning German", url: "/blog" }
        ]
      },
      {
        level: "B1-B2",
        description: "Intermediate - handle most situations while traveling.",
        resources: [
          { text: "Easy German", url: "https://www.youtube.com/@easygerman" },
          { text: "Slow German", url: "https://slowgerman.com/" },
          { text: "Nachrichten Leicht", url: "https://www.nachrichtenleicht.de/" }
        ],
        blogLinks: [
          { text: "German Movies for Learners", url: "/blog" }
        ]
      },
      {
        level: "C1",
        description: "Advanced - near-native proficiency.",
        resources: [
          { text: "Dark (Netflix)", url: "https://www.netflix.com/title/80100123" },
          { text: "Lingolia Grammar", url: "https://www.lingolia.de/" }
        ],
        blogLinks: []
      }
    ]
  },
];

export const learningLanguages: LanguageDetail[] = [
  { 
    name: "Spanish", 
    flag: "🇪🇸", 
    level: "A2", 
    progress: 30, 
    colors: ["#AA151B", "#F1BF00"], 
    details: "Started with Dreaming Spanish. Currently building foundations.",
    levels: [
      {
        level: "A1-A2",
        description: "Beginner basics and simple conversations.",
        resources: [
          { text: "Dreaming Spanish", url: "https://www.dreamingspanish.com/" },
          { text: "Duolingo Spanish", url: "https://duolingo.com" },
          { text: "Coffee Break Spanish", url: "https://coffeebreakacademies.com/coffee-break-spanish/" }
        ],
        blogLinks: [
          { text: "The Spanish Odyssey", url: "/blog" }
        ]
      },
      {
        level: "B1-B2",
        description: "Intermediate - can hold conversations on familiar topics.",
        resources: [
          { text: "Hoy Hablamos", url: "https://www.hoyhablamos.com/" },
          { text: "Luisito Comunica", url: "https://www.youtube.com/@LuisitoComunica" }
        ],
        blogLinks: [
          { text: "Spanish TV Series", url: "/blog" }
        ]
      }
    ]
  },
  { 
    name: "Chinese", 
    flag: "🇨🇳", 
    level: "Beginner", 
    progress: 5, 
    colors: ["#DE2910", "#FFDE00"], 
    details: "Focusing on Pinyin and tones before characters.",
    levels: [
      {
        level: "HSK 1-2",
        description: "Basic vocabulary and sentence structures.",
        resources: [
          { text: "HelloChinese", url: "https://www.hellochinese.cc/" },
          { text: "Anki HSK", url: "https://ankiweb.net/shared/decks/chinese" }
        ],
        blogLinks: [
          { text: "The Mandarin Mission", url: "/blog" }
        ]
      },
      {
        level: "HSK 3-5",
        description: "Intermediate - handling everyday situations.",
        resources: [
          { text: "Mandarin Companion", url: "https://mandarincompanion.com/" },
          { text: "Skritter", url: "https://skritter.com/" }
        ],
        blogLinks: []
      }
    ]
  },
];

export interface TipData {
  title: string;
  key: string;
  icon: React.ReactNode;
  color: string;
  colorHex: string;
  borderColor: string;
  content: string;
  points: string[];
  links: {text: string; url: string}[];
}

export const tipsData = [
  {
    title: "Conversation is the key to Fluency",
    key: "conversation",
    icon: <MessageCircle className="w-10 h-10" />,
    color: "text-brand-green",
    colorHex: "#58cc02",
    borderColor: "duo-border-green",
    content: "Conversation is the key to fluency because it forces you to think on your feet.",
    points: ["Find language exchange partners", "Practice with native speakers daily", "Don't fear making mistakes", "Focus on communication over perfection"],
    links: [
      { text: "How to Start Learning German", url: "/blog" },
      { text: "Building a Language Routine", url: "/blog" },
      { text: "The Power of Anki", url: "/blog" }
    ]
  },
  {
    title: "Immersion is the hardest part, but the most rewarding",
    key: "immersion",
    icon: <Headphones className="w-10 h-10" />,
    color: "text-brand-pink",
    colorHex: "#ff4b4b",
    borderColor: "duo-border-pink",
    content: "Immersion is challenging because it requires constant exposure to the target language.",
    points: ["Watch movies/TV in target language", "Listen to podcasts daily", "Change phone language to target", "Read books in the language"],
    links: [
      { text: "Best German Movies", url: "/blog" },
      { text: "Spanish TV Series", url: "/blog" },
      { text: "Language Learning Books", url: "/blog" }
    ]
  },
  {
    title: "Don't try to master Grammar, just have solid foundations",
    key: "grammar",
    icon: <BookOpen className="w-10 h-10" />,
    color: "text-brand-blue",
    colorHex: "#1cb0f6",
    borderColor: "duo-border-blue",
    content: "Grammar is important, but you don't need to master it to communicate.",
    points: ["Learn core structures first", "Don't memorize every rule", "Use grammar as a guide", "Trust the input method"],
    links: [
      { text: "Mastering English: Beyond Grammar", url: "/blog" },
      { text: "The Spanish Odyssey", url: "/blog" },
      { text: "The Mandarin Mission", url: "/blog" }
    ]
  },
  {
    title: "Pronunciation is key, but not the goal",
    key: "pronunciation",
    icon: <Mic className="w-10 h-10" />,
    color: "text-brand-purple",
    colorHex: "#ce82ff",
    borderColor: "duo-border-purple",
    content: "Good pronunciation helps you be understood, but it's not the ultimate goal.",
    points: ["Listen to native speakers", "Practice tongue positions", "Use shadowing technique", "Record yourself and compare"],
    links: [
      { text: "How to Start Learning German", url: "/blog" },
      { text: "Building a Language Routine", url: "/blog" },
      { text: "Resources Page", url: "/resources" }
    ]
  },
];