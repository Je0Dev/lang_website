export type ResourceType = "Video" | "Podcast" | "Reading" | "App" | "Tools" | "Grammar" | "AI" | "Translation";

export interface Resource {
  name: string;
  desc: string;
  url: string;
  type: ResourceType;
}

export interface LanguageResources {
  title: string;
  flag: string;
  color: string;
  textColor: string;
  hex: string;
  link: string;
  resources: Resource[];
}

export const languageResources: LanguageResources[] = [
  {
    title: "General",
    flag: "🌍",
    color: "bg-brand-teal",
    textColor: "text-brand-teal",
    hex: "#00d4bd",
    link: "/resources",
    resources: [
      { name: "Forvo", desc: "The largest pronunciation dictionary in the world", url: "https://forvo.com/", type: "Tools" },
      { name: "AnkiWeb", desc: "Spaced repetition flashcards (web version)", url: "https://apps.ankiweb.net/", type: "App" },
      { name: "Quizlet", desc: "Simple flashcards and study sets", url: "https://quizlet.com/", type: "App" },
      { name: "Gemini AI", desc: "Google's AI for language practice and explanations", url: "https://gemini.google.com/app", type: "AI" },
      { name: "Qwen AI", desc: "Alibaba's advanced language model", url: "https://chat.qwen.ai/", type: "AI" },
      { name: "Z.ai", desc: "Conversational AI platform", url: "https://chat.z.ai/", type: "AI" },
      { name: "NotebookLM", desc: "Google's AI notebook for organizing learning materials", url: "https://notebooklm.google.com/", type: "AI" },
      { name: "OpenCode", desc: "Scripts and tools for developers", url: "https://opencode.ai/", type: "Tools" },
      { name: "WordReference", desc: "Comprehensive bilingual dictionaries", url: "https://www.wordreference.com/", type: "Translation" },
      { name: "Reverso Context", desc: "Translations in context with real-life examples", url: "https://context.reverso.net/translation/", type: "Translation" },
      { name: "Linguee", desc: "Dictionary and search engine for translations", url: "https://www.linguee.com/", type: "Translation" },
    ]
  },
  {
    title: "German",
    flag: "🇩🇪",
    color: "bg-brand-purple",
    textColor: "text-brand-purple",
    hex: "#ce82ff",
    link: "/languages",
    resources: [
      { name: "Nicos Weg", desc: "DW's beginner series with interactive lessons", url: "https://learngerman.dw.com/en/nicos-weg/c-36519789", type: "Video" },
      { name: "Easy German", desc: "Street interviews and grammar explanations", url: "https://www.youtube.com/@easygerman", type: "Video" },
      { name: "Nachrichten Leicht", desc: "Simple news articles in easy German", url: "https://www.nachrichtenleicht.de/", type: "Reading" },
      { name: "Slow German", desc: "Podcast with transcripts by Annik Rubens", url: "https://slowgerman.com/", type: "Podcast" },
      { name: "Lingolia German", desc: "Comprehensive grammar explanations and exercises", url: "https://deutsch.lingolia.com/de/", type: "Grammar" },
      { name: "Projekt Gutenberg", desc: "Free German classic literature", url: "https://projekt-gutenberg.org/", type: "Reading" },
      { name: "DWDS", desc: "Digital Dictionary of the German Language", url: "https://www.dwds.de/", type: "Tools" },
      { name: "DeepL", desc: "World's most accurate translator", url: "https://www.deepl.com/en/translator", type: "Translation" },
      { name: "Dict.cc", desc: "Crowdsourced translation dictionary", url: "https://www.dict.cc/", type: "Translation" },
      { name: "Redensarten Index", desc: "German idioms and sayings", url: "https://www.redensarten-index.de/suche.php", type: "Tools" },
      { name: "Anki Decks", desc: "Shared vocabulary decks for all levels", url: "https://ankiweb.net/shared/decks/german", type: "Tools" },
    ]
  },
  {
    title: "Spanish",
    flag: "🇪🇸",
    color: "bg-brand-orange",
    textColor: "text-brand-orange",
    hex: "#ff9600",
    link: "/languages",
    resources: [
      { name: "Dreaming Spanish", desc: "CI method from beginner to advanced", url: "https://www.dreamingspanish.com/", type: "Video" },
      { name: "Hoy Hablamos", desc: "Intermediate podcast with transcripts", url: "https://www.hoyhablamos.com/", type: "Podcast" },
      { name: "Spanish in Levels", desc: "Reading materials for all levels", url: "https://spanishinlevels.com/", type: "Reading" },
      { name: "SpanishDict Vocabulary", desc: "Curated vocabulary lists and flashcards", url: "https://www.spanishdict.com/vocabulary", type: "Tools" },
      { name: "Fluent with Stories", desc: "Learning through engaging stories", url: "https://www.fluentwithstories.com/stories/es", type: "Reading" },
      { name: "SpanishNovels.net", desc: "Graded readers for beginners", url: "https://spanishnovels.net/beginners/", type: "Reading" },
      { name: "Lingolia Spanish", desc: "Spanish grammar and exercises", url: "https://www.lingolia.com/de/", type: "Grammar" },
      { name: "ProfeDeEle", desc: "Materials and activities for teachers and students", url: "https://www.profedeele.es/", type: "Tools" },
      { name: "TodoEle", desc: "Resources and community for Spanish learners", url: "https://todoele.net/", type: "Tools" },
      { name: "SpanishDict", desc: "Dictionary, conjugator, and translations", url: "https://www.spanishdict.com/", type: "Translation" },
    ]
  },
  {
    title: "Chinese",
    flag: "🇨🇳",
    color: "bg-brand-pink",
    textColor: "text-brand-pink",
    hex: "#ff4b4b",
    link: "/languages",
    resources: [
      { name: "HelloChinese", desc: "Beginner app with tone training", url: "https://www.hellochinese.cc/", type: "App" },
      { name: "DuChinese", desc: "Graded stories for Chinese learners", url: "https://duchinese.net/lessons", type: "Reading" },
      { name: "YoYo Chinese", desc: "Video-based courses and materials", url: "https://yoyochinese.com/courses", type: "Video" },
      { name: "Little Fox Chinese", desc: "Stories and songs for beginners", url: "https://chinese.littlefox.com/en", type: "Video" },
      { name: "Pinyin Chart", desc: "Interactive Mandarin pronunciation tool", url: "https://yoyochinese.com/chinese-learning-tools/Mandarin-Chinese-pronunciation-lesson/pinyin-chart-table", type: "Tools" },
      { name: "Zhongwen", desc: "Chinese character dictionary and learning", url: "https://www.zhongwen.com/", type: "Tools" },
      { name: "AllSet Learning Grammar", desc: "The definitive Chinese grammar wiki", url: "https://resources.allsetlearning.com/chinese/grammar/", type: "Grammar" },
      { name: "Naver Dictionary", desc: "Advanced English-Chinese dictionary", url: "https://english.dict.naver.com/english-chinese-dictionary/", type: "Translation" },
      { name: "YellowBridge", desc: "Chinese-English dictionary and tools", url: "https://www.yellowbridge.com/chinese/dictionary.php", type: "Translation" },
      { name: "Mandarin Companion", desc: "Graded readers for intermediate learners", url: "https://mandarincompanion.com/", type: "Reading" },
      { name: "Bilibili", desc: "Chinese video platform with diverse content", url: "https://www.bilibili.com/", type: "Video" },
      { name: "ChineseBoost", desc: "Grammar and vocabulary guides", url: "https://www.chineseboost.com/grammar/", type: "Grammar" },
      { name: "Learn Pinyin", desc: "Mandarin pronunciation practice", url: "https://learn-pinyin.com/", type: "Tools" },
    ]
  },
  {
    title: "English",
    flag: "🇬🇧",
    color: "bg-brand-green",
    textColor: "text-brand-green",
    hex: "#58cc02",
    link: "/languages",
    resources: [
      { name: "TED Talks", desc: "Ideas worth spreading in English", url: "https://www.ted.com/talks", type: "Video" },
      { name: "The Economist", desc: "Podcasts and articles for advanced learners", url: "https://www.economist.com/podcasts", type: "Podcast" },
      { name: "Lingolia English", desc: "Grammar explanations and exercises", url: "https://english.lingolia.com/en/", type: "Grammar" },
      { name: "YouGlish", desc: "Use YouTube for pronunciation context", url: "https://youglish.com/", type: "Tools" },
      { name: "Cambridge Dict.", desc: "Definitions with audio examples", url: "https://dictionary.cambridge.org/", type: "Tools" },
      { name: "BBC Learning English", desc: "Comprehensive free English courses", url: "https://www.bbc.co.uk/learningenglish", type: "App" },
      { name: "English with Lucy", desc: "British English pronunciation and grammar", url: "https://www.youtube.com/@EnglishwithLucy", type: "Video" },
      { name: "6 Minute English", desc: "BBC learning podcast episodes", url: "https://www.bbc.co.uk/learningenglish/english/features/6-minute-english", type: "Podcast" },
    ]
  }
];