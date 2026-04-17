import { LanguageDetail } from "./types";

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
