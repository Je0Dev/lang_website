import { LanguageDetail } from "./types";

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
