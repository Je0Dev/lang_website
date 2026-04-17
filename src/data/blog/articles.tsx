import React from "react";
import { PlayCircle } from "lucide-react";
import { BlogPost } from "./types";

export const articlePosts: BlogPost[] = [
  {
    id: 1,
    title: "How to Start Learning German",
    excerpt: "A comprehensive guide to starting your German learning journey.",
    color: "duo-border-green",
    labelColor: "bg-brand-green",
    icon: <PlayCircle className="text-brand-green w-8 h-8" />,
    videoUrl: "https://www.youtube.com/embed/7jP9Aw88h2Y",
    tags: ["German", "Beginner", "Resources", "Vocabulary", "Input"],
    category: "article",
    content: (
      <div className="space-y-6">
        <p>Starting a new language can be overwhelming, but German is a rewarding journey.</p>
        <div className="bg-[var(--input-bg)] p-6 rounded-2xl border-2 border-[var(--border-color)]">
          <h4 className="text-2xl font-black text-brand-green mb-4">1. Vocabulary Extraction</h4>
          <p className="mb-4 text-secondary/90 leading-relaxed">
            Building vocabulary is the foundation. I highly recommend using Anki for spaced repetition.
          </p>
        </div>
        <div>
          <h4 className="text-2xl font-black text-brand-green mb-2">2. Comprehensible Input</h4>
          <p className="mb-4">
            The key to natural language acquisition is CI (i+1). Start with Nicos Weg by Deutsche Welle.
          </p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "Mastering English: Beyond Grammar",
    excerpt: "How to achieve advanced English proficiency through immersion.",
    color: "duo-border-pink",
    labelColor: "bg-brand-pink",
    icon: <PlayCircle className="text-brand-pink w-8 h-8" />,
    videoUrl: "https://www.youtube.com/embed/E6588DlZW-c",
    tags: ["English", "Advanced", "Immersion", "Acquisition"],
    category: "article",
    content: (
      <div>
        <h4 className="text-2xl font-black text-brand-green mb-2">Natural Acquisition</h4>
        <p className="mb-4">
          Focus on natural acquisition rather than grammar drills. Consume content where you understand 70-80%.
        </p>
      </div>
    )
  },
  {
    id: 3,
    title: "The Spanish Odyssey: A Journey to Fluency",
    excerpt: "From basic greetings to complex conversations in Spanish.",
    color: "duo-border-orange",
    labelColor: "bg-orange-600",
    icon: <PlayCircle className="text-orange-600 w-8 h-8" />,
    videoUrl: "https://www.youtube.com/embed/83y55TVK09E",
    tags: ["Spanish", "Intermediate", "CI Method", "Verb Conjugations"],
    category: "article",
    content: (
      <div className="space-y-6">
        <p className="leading-relaxed">
          Spanish and English share thousands of cognates, but verb conjugations are the challenge.
        </p>
        <div className="grid gap-4">
          <div className="p-4 bg-[var(--input-bg)] border-l-4 border-yellow-500 rounded-r-xl">
            <h5 className="font-black text-brand-blue uppercase text-sm mb-1">Level A: Foundation</h5>
            <p className="text-sm">Use Dreaming Spanish for CI method.</p>
          </div>
          <div className="p-4 bg-[var(--input-bg)] border-l-4 border-orange-500 rounded-r-xl">
            <h5 className="font-black text-brand-blue uppercase text-sm mb-1">Level B: Bridge</h5>
            <p className="text-sm">Consume Hoy Hablamos podcast daily.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "The Mandarin Mission: Conquering Chinese Characters",
    excerpt: "A roadmap for mastering Hanzi, tones, and Chengyu idioms.",
    color: "duo-border-red",
    labelColor: "bg-red-600",
    icon: <PlayCircle className="text-red-600 w-8 h-8" />,
    videoUrl: "https://www.youtube.com/embed/v_VUa80gMf0",
    tags: ["Chinese", "Mandarin", "HSK", "Characters", "Tones"],
    category: "article",
    content: (
      <div className="space-y-6">
        <p className="leading-relaxed">
          Chinese requires a different type of memory - logographic and tonal thinking.
        </p>
        <div className="grid gap-4">
          <div className="p-4 bg-[var(--input-bg)] border-l-4 border-red-400 rounded-r-xl">
            <h5 className="font-black text-red-600 uppercase text-sm mb-1">Tonal Awareness</h5>
            <p className="text-sm">Master the four tones and Pinyin first.</p>
          </div>
          <div className="p-4 bg-[var(--input-bg)] border-l-4 border-red-600 rounded-r-xl">
            <h5 className="font-black text-red-600 uppercase text-sm mb-1">The Literacy Leap</h5>
            <p className="text-sm">Use Mandarin Companion graded readers.</p>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "Building a Language Learning Routine That Sticks",
    excerpt: "The secret to language learning success isn't talent.",
    color: "duo-border-blue",
    labelColor: "bg-brand-blue",
    icon: <PlayCircle className="text-brand-blue w-8 h-8" />,
    videoUrl: "https://www.youtube.com/embed/OAn6aVJ4mGk",
    tags: ["Routine", "Habits", "Productivity", "Methodology"],
    category: "article",
    content: (
      <div className="space-y-6">
        <p className="leading-relaxed">Systems beat goals every time. Build a sustainable routine.</p>
        <div className="bg-[var(--input-bg)] p-6 rounded-2xl border-2 border-[var(--border-color)]">
          <h4 className="text-2xl font-black text-brand-blue mb-4">The 2-Hour Rule</h4>
          <p className="mb-4">Split into four 30-minute sessions throughout the day.</p>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "The Power of Anki: Spaced Repetition Explained",
    excerpt: "Why Anki is the most powerful tool in my arsenal.",
    color: "duo-border-purple",
    labelColor: "bg-brand-purple",
    icon: <PlayCircle className="text-brand-purple w-8 h-8" />,
    videoUrl: "https://www.youtube.com/embed/2H6E3FnGi5A",
    tags: ["Anki", "Vocabulary", "Spaced Repetition", "Tools"],
    category: "article",
    content: (
      <div className="space-y-6">
        <p className="leading-relaxed">
          Spaced repetition is scientifically proven. Anki implements this perfectly.
        </p>
        <div className="bg-[var(--input-bg)] p-6 rounded-2xl border-2 border-[var(--border-color)]">
          <h4 className="text-2xl font-black text-brand-purple mb-4">Why Anki Works</h4>
          <p className="mb-4">Shows cards just before you'd forget them.</p>
        </div>
      </div>
    )
  },
];
