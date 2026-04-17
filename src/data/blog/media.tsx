import React from "react";
import { Film, Tv, Book } from "lucide-react";
import { BlogPost } from "./types";

export const mediaPosts: BlogPost[] = [
  {
    id: 7,
    title: "Best German Movies for Language Learners",
    excerpt: "Immerse yourself in German cinema while learning.",
    color: "duo-border-teal",
    labelColor: "bg-brand-teal",
    icon: <Film className="text-brand-teal w-8 h-8" />,
    videoUrl: "https://www.youtube.com/embed/9a1JvL4v1XU",
    tags: ["German", "Movies", "Listening", "Immersion", "Media"],
    category: "media",
    mediaType: "movie",
    content: (
      <div className="space-y-6">
        <p className="leading-relaxed">Movies improve listening comprehension while enjoying storytelling.</p>
        <div className="grid gap-4">
          <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-purple rounded-r-xl">
            <h5 className="font-black text-brand-purple uppercase text-sm mb-1">Dark (Netflix)</h5>
            <p className="text-sm">Complex time-travel thriller.</p>
          </div>
          <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-blue rounded-r-xl">
            <h5 className="font-black text-brand-blue uppercase text-sm mb-1">How to Sell Drugs Online</h5>
            <p className="text-sm">Modern teen series with contemporary slang.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: "Essential Spanish TV Series for Learners",
    excerpt: "Master both Peninsular and Latin American Spanish.",
    color: "duo-border-yellow",
    labelColor: "bg-brand-yellow",
    icon: <Tv className="text-brand-yellow w-8 h-8" />,
    videoUrl: "https://www.youtube.com/embed/k7XW6M2hM_0",
    tags: ["Spanish", "Series", "TV", "Listening", "Media", "Latin America"],
    category: "media",
    mediaType: "series",
    content: (
      <div className="space-y-6">
        <p className="leading-relaxed">Spanish TV series offer hours of engaging content.</p>
        <div className="grid gap-4">
          <div className="p-4 bg-[var(--input-bg)] border-l-4 border-red-600 rounded-r-xl">
            <h5 className="font-black text-red-600 uppercase text-sm mb-1">Money Heist</h5>
            <p className="text-sm">Great for Spanish slang.</p>
          </div>
          <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-blue rounded-r-xl">
            <h5 className="font-black text-brand-blue uppercase text-sm mb-1">Elite</h5>
            <p className="text-sm">Modern teen drama for intermediate.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: "Language Learning Books I Recommend",
    excerpt: "From grammar guides to novels in your target language.",
    color: "duo-border-pink",
    labelColor: "bg-brand-pink",
    icon: <Book className="text-brand-pink w-8 h-8" />,
    videoUrl: "",
    tags: ["Books", "Reading", "Grammar", "Vocabulary", "Literature"],
    category: "media",
    mediaType: "book",
    content: (
      <div className="space-y-6">
        <p className="leading-relaxed">Reading expands vocabulary and grammar in context.</p>
        <div className="grid gap-4">
          <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-purple rounded-r-xl">
            <h5 className="font-black text-brand-purple uppercase text-sm mb-1">German</h5>
            <ul className="space-y-2 mt-2 text-sm">
              <li>"Menschen" Series - Comprehensive course book</li>
              <li>"Der Tunnel" - Simple graded reader</li>
            </ul>
          </div>
          <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-orange rounded-r-xl">
            <h5 className="font-black text-brand-orange uppercase text-sm mb-1">Spanish</h5>
            <ul className="space-y-2 mt-2 text-sm">
              <li>"El Principito" - Simple yet profound</li>
              <li>"Como agua para chocolate"</li>
            </ul>
          </div>
          <div className="p-4 bg-[var(--input-bg)] border-l-4 border-red-600 rounded-r-xl">
            <h5 className="font-black text-red-600 uppercase text-sm mb-1">Chinese</h5>
            <ul className="space-y-2 mt-2 text-sm">
              <li>"HSK Standard Course"</li>
              <li>"Mandarin Companion" Series</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
];
