import React from "react";
import { MessageCircle, Headphones, BookOpen, Mic } from "lucide-react";
import { TipData } from "./types";

export const tipsData: TipData[] = [
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
