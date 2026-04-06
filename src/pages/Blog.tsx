import React, { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import { useContext } from "react";
import { ThemeContext, LanguageContext } from "../context";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { ChevronRight, X, PlayCircle, Search, BookOpen, Film, Book, Tv, Tag, XCircle } from "lucide-react";

interface Post {
  id: number;
  title: string;
  excerpt: string;
  color: string;
  labelColor: string;
  icon: React.ReactNode;
  videoUrl: string;
  content: React.ReactNode;
  tags: string[];
  category: "article" | "media";
  mediaType?: "movie" | "series" | "book";
}

export function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showDetails, setShowDetails] = useState<{ [key: number]: boolean }>({});
  const { setCursorColor } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  const funnyTexts = [
    "Wanna click here? 👀",
    "Check it out! 🔍",
    "Not convinced? 🤔",
    "Could help! 💡",
    "Just a link, no pressure 🫡",
    "Click or don't, I won't judge 😏",
    "This might be useful? 📚",
    "Take a peek! 👆",
    "Your call! 🙃",
    "Go on, be curious! 🌟",
    "Trust me, click it ✨",
    "Or don't... I'm just a link 🔗",
  ];

  const getFunnyText = (index: number) => funnyTexts[index % funnyTexts.length];

  const posts: Post[] = [
    {
      id: 1,
      title: "How to Start Learning German",
      excerpt: "A comprehensive guide to starting your German learning journey. From finding the right resources to building a sustainable study routine.",
      color: "duo-border-green",
      labelColor: "bg-brand-green",
      icon: <PlayCircle className="text-brand-green w-8 h-8" />,
      videoUrl: "https://www.youtube.com/embed/7jP9Aw88h2Y",
      tags: ["German", "Beginner", "Resources", "Vocabulary", "Input"],
      category: "article",
      content: (
        <div className="space-y-6">
          <p>Starting a new language can be overwhelming, but German is a rewarding journey. Here's my comprehensive guide to getting started on the right foot.</p>
          
          <div className="bg-[var(--input-bg)] p-6 rounded-2xl border-2 border-[var(--border-color)]">
            <h4 className="text-2xl font-black text-brand-green mb-4">1. Vocabulary Extraction</h4>
            <p className="mb-4 text-secondary/90 leading-relaxed">
              Building vocabulary is the foundation of any language learning journey. I highly recommend using 
              <a 
                href="https://apps.ankiweb.net/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-blue hover:underline font-medium mx-1"
              >
                Anki
              </a> 
              for spaced repetition. I've created custom scripts to extract vocabulary from PDFs and other texts, which I then import into Anki. This method has been game-changing for my vocabulary retention. Check my 
              <a 
                href="https://github.com/Je0Dev" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-brand-green hover:underline font-medium mx-1"
              >
                GitHub
              </a> 
              for tools and scripts.
            </p>
          </div>

          <div>
            <h4 className="text-2xl font-black text-brand-green mb-2">2. Comprehensible Input</h4>
            <p className="mb-4">
              The key to natural language acquisition is <strong>comprehensible input</strong> (i+1). I highly recommend starting with 
              <a href="https://learngerman.dw.com/en/nicos-weg/c-36519789" target="_blank" rel="noopener noreferrer" className="mx-1 text-brand-blue hover:underline font-bold">
                Nicos Weg
              </a> 
              by Deutsche Welle. This series takes you from absolute beginner to intermediate through engaging storytelling. The content is perfectly calibrated to your level, making learning feel natural rather than forced.
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-brand-blue font-bold">
              <li>
                <a href="https://www.easygerman.org/podcast" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
                  Podcast: Easy German - Great for natural conversation practice
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@easygerman" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
                  YouTube: Easy German - Street interviews with subtitles
                </a>
              </li>
              <li>
                <a href="https://slowgerman.com/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
                  Podcast: Slow German - News in slow, clear German
                </a>
              </li>
              <li>
                <a href="https://www.nachrichtenleicht.de/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
                  Reading: Nachrichten Leicht - Simple news articles
                </a>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Mastering English: Beyond Grammar",
      excerpt: "How to achieve advanced English proficiency through immersion and natural acquisition rather than textbook memorization.",
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
              The secret to advanced English is focusing on <strong>natural acquisition</strong> rather than grammar drills. The key is consuming content where you understand about 70-80% of the context. This allows your brain to naturally "map" the new vocabulary without explicit memorization.
            </p>
            <div className="bg-[var(--input-bg)] p-6 rounded-2xl border-2 border-[var(--border-color)]">
            <h4 className="text-xl font-black text-brand-blue mb-4">Resources by Level</h4>
            <ul className="list-disc pl-6 mt-2 space-y-3">
              <li className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-wider text-green-500">Every Level</span>
                <a href="https://english.lingolia.com/en/" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold hover:text-brand-green transition-colors">
                  Lingolia - Comprehensive grammar and vocabulary
                </a>
              </li>
              <li className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-wider text-pink-500">Beginner (A1-A2)</span>
                <a href="https://www.youtube.com/@EnglishwithLucy" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold hover:text-brand-green transition-colors">
                  English with Lucy - Clear British pronunciation
                </a>
              </li>
              <li className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-wider text-orange-500">Intermediate (B1-B2)</span>
                <a href="https://www.ted.com/talks" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold hover:text-brand-green transition-colors">
                  TED Talks - Inspiring talks with subtitles
                </a>
              </li>
              <li className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-wider text-purple-500">Advanced (C1-C2)</span>
                <a href="https://www.economist.com/podcasts" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold hover:text-brand-green transition-colors">
                  The Economist Podcasts - Complex vocabulary in context
                </a>
              </li>
            </ul>
            </div>
          </div>
      )
    },
  {
    id: 3,
    title: "The Spanish Odyssey: A Journey to Fluency",
    excerpt: "From basic greetings to complex conversations. Join me on my journey to learn Spanish, the most widely spoken second language in the world.",
    color: "duo-border-orange",
    labelColor: "bg-orange-600",
    icon: <PlayCircle className="text-orange-600 w-8 h-8" />,
    videoUrl: "https://www.youtube.com/embed/83y55TVK09E", 
    tags: ["Spanish", "Intermediate", "CI Method", "Verb Conjugations"],
    category: "article",
    content: (
    <div className="space-y-6">
    <p className="leading-relaxed">
      Spanish and English share thousands of cognates, making the initial learning phase feel fast. However, the true challenge lies in mastering the 
      <strong> speed and verb conjugations</strong>. My advice? Immerse yourself in the rhythm of the language through music and consistent visual input.
    </p>
    
    <div className="grid gap-4">
      <div className="p-4 bg-[var(--input-bg)] border-l-4 border-yellow-500 rounded-r-xl transition-all hover:bg-[var(--hover-bg)]">
        <h5 className="font-black text-brand-blue uppercase text-sm mb-1 tracking-wider">Level A: The Foundation</h5>
        <p className="text-sm">
          Skip the grammar tables initially. Use 
          <a href="https://www.dreamingspanish.com/" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-brand-green hover:underline">
            Dreaming Spanish
          </a> 
          to acquire the language naturally through <strong>Comprehensible Input</strong>. This method builds your "mental ear" before you ever have to struggle with a textbook. Focus on understanding the message, not the grammar.
        </p>
      </div>

      <div className="p-4 bg-[var(--input-bg)] border-l-4 border-orange-500 rounded-r-xl transition-all hover:bg-[var(--hover-bg)]">
        <h5 className="font-black text-brand-blue uppercase text-sm mb-1 tracking-wider">Level B: The Bridge</h5>
        <p className="text-sm">
          Start consuming 
          <a href="https://www.hoyhablamos.com/" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-brand-green hover:underline">
            Hoy Hablamos
          </a> 
          podcast daily. This is where you transition from "classroom Spanish" to <strong>intermediate fluency</strong>, learning how natives express complex emotions, doubts, and the dreaded Subjunctive mood.
        </p>
      </div>

     <div className="p-4 bg-[var(--input-bg)] border-l-4 border-red-600 rounded-r-xl transition-all hover:bg-[var(--hover-bg)]">
      <h5 className="font-black text-brand-blue uppercase text-sm mb-1 tracking-wider">Level C: Mastery</h5>
      <p className="text-sm">
        Achieve native-level nuance by consuming unfiltered content. Follow 
        <a href="https://www.youtube.com/@LuisitoComunica" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-brand-green hover:underline">
          Luisito Comunica
        </a> 
        for diverse Latin American slang or 
        <a href="https://www.youtube.com/@NateGentile7" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-brand-green hover:underline">
          Nate Gentile
        </a> 
        for high-level technical Peninsular Spanish. At this stage, you should be reading 
        <a href="https://elpais.com/" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-brand-green hover:underline">
          El País
        </a> 
        to grasp abstract political and cultural concepts.
      </p>
  </div>
    </div>

    <div className="mt-4 p-4 border-2 border-dashed border-brand-pink rounded-2xl bg-brand-pink/5">
      <p className="italic font-medium text-brand-blue text-center">
        "La lengua es el mapa de una cultura. Te dice de dónde viene su gente y hacia dónde se dirige."
        <span className="block text-sm text-tertiary mt-2">(Translation: Language is the map of a culture. It tells you where its people come from and where they are going.)</span>
      </p>
    </div>
  </div>
    )
  },
    {
      id: 4,
      title: "The Mandarin Mission: Conquering Chinese Characters",
      excerpt: "A roadmap for mastering Hanzi, tones, and Chengyu idioms. Chinese is hard, but with the right approach, it's achievable.",
      color: "duo-border-red",
      labelColor: "bg-red-600",
      icon: <PlayCircle className="text-red-600 w-8 h-8" />,
      videoUrl: "https://www.youtube.com/embed/v_VUa80gMf0", 
      tags: ["Chinese", "Mandarin", "HSK", "Characters", "Tones"],
      category: "article",
      content: (
  <div className="space-y-6">
    <p className="leading-relaxed">
      Chinese is hard. It requires a different type of memory. You transition from 
      <strong> phonetic thinking</strong> to <strong>logographic and tonal thinking</strong>. This is not just learning a new language—it's rewiring your brain to process information differently.
    </p>
    
    <div className="grid gap-4">
      <div className="p-4 bg-[var(--input-bg)] border-l-4 border-red-400 rounded-r-xl transition-all hover:bg-[var(--hover-bg)]">
        <h5 className="font-black text-red-600 uppercase text-sm mb-1 tracking-wider">Tonal Awareness</h5>
        <p className="text-sm">
          Master the four tones and Pinyin before touching characters. Use 
          <a href="https://www.hellochinese.cc/" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-red-600 hover:underline">
            HelloChinese
          </a> 
          to build a massive foundation of high-frequency vocabulary. Focus on <strong>radical recognition</strong>—the building blocks that make up every character.
        </p>
      </div>

      <div className="p-4 bg-[var(--input-bg)] border-l-4 border-red-600 rounded-r-xl transition-all hover:bg-[var(--hover-bg)]">
        <h5 className="font-black text-red-600 uppercase text-sm mb-1 tracking-wider">The Literacy Leap</h5>
        <p className="text-sm">
          The jump from HSK 3 to 5 is the "Great Wall" of Chinese learning. Start using 
          <a href="https://mandarincompanion.com/" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-red-600 hover:underline">
            Mandarin Companion
          </a> 
          graded readers. You need to read thousands of characters in context to stop translating in your head and start recognizing patterns naturally.
        </p>
      </div>

      <div className="p-4 bg-[var(--input-bg)] border-l-4 border-red-900 rounded-r-xl transition-all hover:bg-[var(--hover-bg)]">
    <h5 className="font-black text-red-600 uppercase text-sm mb-1 tracking-wider">Level C: Cultural Integration</h5>
    <p className="text-sm">
      To reach mastery, you must leave the "learner bubble." Dive into 
      <a href="https://www.bilibili.com/" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-red-600 hover:underline">
        Bilibili
      </a> 
      to see how real Gen-Z Chinese speaks. For the ultimate challenge, listen to 
      <strong className="text-red-700"> Dong Yu Hui (董宇辉)</strong>—his viral livestreams are famous for using poetic, high-level vocabulary that bridges the gap between modern Mandarin and classical literature.
    </p>
  </div>
    </div>

    <div className="mt-4 p-4 border-2 border-dashed border-red-600 rounded-2xl bg-red-600/5">
      <h4 className="font-bold text-red-600 mb-1 flex items-center gap-2">
        <span>💡</span> Pro Tip: Tone Pairing
      </h4>
      <p className="text-sm text-secondary italic">
        "Don't practice tones in isolation. Practice them in pairs (e.g., first tone + fourth tone) to master the natural melody of a sentence. This is the secret to sounding like a native."
      </p>
    </div>
  </div>
      )
    },
    {
      id: 5,
      title: "Building a Language Learning Routine That Sticks",
      excerpt: "The secret to language learning success isn't talent—it's consistency. Here's how to build a routine that becomes second nature.",
      color: "duo-border-blue",
      labelColor: "bg-brand-blue",
      icon: <PlayCircle className="text-brand-blue w-8 h-8" />,
      videoUrl: "https://www.youtube.com/embed/OAn6aVJ4mGk",
      tags: ["Routine", "Habits", "Productivity", "Methodology"],
      category: "article",
      content: (
        <div className="space-y-6">
          <p className="leading-relaxed">
            After years of trying different approaches to language learning, I've realized that <strong>systems beat goals every time</strong>. Here's how to build a sustainable routine.
          </p>
          
          <div className="bg-[var(--input-bg)] p-6 rounded-2xl border-2 border-[var(--border-color)]">
            <h4 className="text-2xl font-black text-brand-blue mb-4">The 2-Hour Rule</h4>
            <p className="mb-4 text-secondary/90 leading-relaxed">
              I aim for at least 2 hours of daily immersion. But here's the key: <strong>don't do it all at once</strong>. Split it into four 30-minute sessions throughout the day. This spaced approach improves retention and makes it easier to maintain.
            </p>
          </div>

          <div>
            <h4 className="text-2xl font-black text-brand-blue mb-2">The Stack Method</h4>
            <p className="mb-4">
              Stack language learning onto existing habits. Listen to podcasts during your commute, watch videos during lunch, review Anki cards with your morning coffee. <strong>No extra time required</strong>.
            </p>
          </div>

          <div className="grid gap-4">
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-blue rounded-r-xl">
              <h5 className="font-black text-brand-blue uppercase text-sm mb-1 tracking-wider">Morning (30 min)</h5>
              <p className="text-sm">Anki vocabulary review + new cards</p>
            </div>
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-green rounded-r-xl">
              <h5 className="font-black text-brand-green uppercase text-sm mb-1 tracking-wider">Midday (30 min)</h5>
              <p className="text-sm">Comprehensible input (podcast/video)</p>
            </div>
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-orange rounded-r-xl">
              <h5 className="font-black text-brand-orange uppercase text-sm mb-1 tracking-wider">Evening (30 min)</h5>
              <p className="text-sm">Active study (grammar/exercises)</p>
            </div>
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-pink rounded-r-xl">
              <h5 className="font-black text-brand-pink uppercase text-sm mb-1 tracking-wider">Night (30 min)</h5>
              <p className="text-sm">Entertainment in target language</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "The Power of Anki: Spaced Repetition Explained",
      excerpt: "Why Anki is the most powerful tool in my language learning arsenal, and how to set it up for maximum efficiency.",
      color: "duo-border-purple",
      labelColor: "bg-brand-purple",
      icon: <PlayCircle className="text-brand-purple w-8 h-8" />,
      videoUrl: "https://www.youtube.com/embed/2H6E3FnGi5A",
      tags: ["Anki", "Vocabulary", "Spaced Repetition", "Tools"],
      category: "article",
      content: (
        <div className="space-y-6">
          <p className="leading-relaxed">
            Spaced repetition is scientifically proven to improve memory retention. <strong>Anki</strong> is the implementation I use, and it's transformed my vocabulary acquisition.
          </p>
          
          <div className="bg-[var(--input-bg)] p-6 rounded-2xl border-2 border-[var(--border-color)]">
            <h4 className="text-2xl font-black text-brand-purple mb-4">Why Anki Works</h4>
            <p className="mb-4 text-secondary/90 leading-relaxed">
              Anki uses an algorithm that shows you cards just before you'd forget them. This <strong>optimal timing</strong> means:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-secondary">
              <li>Less time reviewing what you already know</li>
              <li>More time on words you're struggling with</li>
              <li>Long-term retention instead of short-term memorization</li>
            </ul>
          </div>

          <div>
            <h4 className="text-2xl font-black text-brand-purple mb-2">My Anki Setup</h4>
            <div className="grid gap-4 mt-4">
              <div className="p-4 bg-[var(--input-bg)] rounded-xl">
                <h5 className="font-bold text-brand-teal mb-2">📚 New Cards Limit: 20/day</h5>
                <p className="text-sm text-secondary">Quality over quantity. 20 new cards daily = 7,300 new words per year. That's more than enough!</p>
              </div>
              <div className="p-4 bg-[var(--input-bg)] rounded-xl">
                <h5 className="font-bold text-brand-orange mb-2">🎯 Card Type: Basic + Reversed</h5>
                <p className="text-sm text-secondary">One word → translation, then reversed. This creates two cards from one entry.</p>
              </div>
              <div className="p-4 bg-[var(--input-bg)] rounded-xl">
                <h5 className="font-bold text-brand-pink mb-2">⚡ Review Focus: Young cards</h5>
                <p className="text-sm text-secondary">Don't graduate to "mature" too quickly. Keep reviewing at shorter intervals until solid.</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Best German Movies for Language Learners",
      excerpt: "Immerse yourself in German cinema while learning. From Dark to Downfall, these movies will boost your listening comprehension.",
      color: "duo-border-teal",
      labelColor: "bg-brand-teal",
      icon: <Film className="text-brand-teal w-8 h-8" />,
      videoUrl: "https://www.youtube.com/embed/9a1JvL4v1XU",
      tags: ["German", "Movies", "Listening", "Immersion", "Media"],
      category: "media",
      mediaType: "movie",
      content: (
        <div className="space-y-6">
          <p className="leading-relaxed">
            Movies are an excellent way to improve your German listening comprehension while enjoying compelling storytelling. Here are my top recommendations for language learners.
          </p>
          
          <div className="grid gap-4">
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-purple rounded-r-xl">
              <h5 className="font-black text-brand-purple uppercase text-sm mb-1 tracking-wider">Dark (Netflix Series)</h5>
              <p className="text-sm mb-2">A complex time-travel thriller with multiple storylines across different time periods.</p>
              <a href="https://www.netflix.com/title/80100123" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline text-sm font-bold">Watch on Netflix →</a>
            </div>
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-orange rounded-r-xl">
              <h5 className="font-black text-brand-orange uppercase text-sm mb-1 tracking-wider">Downfall (Der Untergang)</h5>
              <p className="text-sm mb-2">A historical drama about the final days of WWII in Berlin. Excellent for formal German.</p>
              <a href="https://www.imdb.com/title/0393165/" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline text-sm font-bold">View on IMDb →</a>
            </div>
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-blue rounded-r-xl">
              <h5 className="font-black text-brand-blue uppercase text-sm mb-1 tracking-wider">How to Sell Drugs Online (Fast)</h5>
              <p className="text-sm mb-2">A modern German series about a teenager creating an online drug empire. Great for contemporary slang.</p>
              <a href="https://www.netflix.com/title/80189499" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline text-sm font-bold">Watch on Netflix →</a>
            </div>
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-green rounded-r-xl">
              <h5 className="font-black text-brand-green uppercase text-sm mb-1 tracking-wider">Das Perfekte Geheimnis</h5>
              <p className="text-sm mb-2">A comedy about three couples and their secrets. Natural, fast-paced dialogue.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 8,
      title: "Essential Spanish TV Series for Learners",
      excerpt: "From La Casa de Papel to Elite, these Spanish series will help you master both Peninsular and Latin American Spanish.",
      color: "duo-border-yellow",
      labelColor: "bg-brand-yellow",
      icon: <Tv className="text-brand-yellow w-8 h-8" />,
      videoUrl: "https://www.youtube.com/embed/k7XW6M2hM_0",
      tags: ["Spanish", "Series", "TV", "Listening", "Media", "Latin America"],
      category: "media",
      mediaType: "series",
      content: (
        <div className="space-y-6">
          <p className="leading-relaxed">
            Spanish TV series offer hours of engaging content to improve your comprehension. Here's my curated list for different proficiency levels.
          </p>
          
          <div className="grid gap-4">
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-red-600 rounded-r-xl">
              <h5 className="font-black text-red-600 uppercase text-sm mb-1 tracking-wider">Money Heist (La Casa de Papel)</h5>
              <p className="text-sm mb-2">The iconic Spanish series. Great for learning Spanish slang and colloquial expressions.</p>
              <a href="https://www.netflix.com/title/80192088" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline text-sm font-bold">Watch on Netflix →</a>
            </div>
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-blue rounded-r-xl">
              <h5 className="font-black text-brand-blue uppercase text-sm mb-1 tracking-wider">Elite</h5>
              <p className="text-sm mb-2">Modern teen drama with clear speech and contemporary vocabulary. Great for intermediate learners.</p>
              <a href="https://www.netflix.com/title/80200942" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline text-sm font-bold">Watch on Netflix →</a>
            </div>
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-green rounded-r-xl">
              <h5 className="font-black text-brand-green uppercase text-sm mb-1 tracking-wider">Coco (Movie)</h5>
              <p className="text-sm mb-2">Beautiful Pixar film in Latin American Spanish. Clear pronunciation, emotional storytelling.</p>
              <a href="https://www.disneyplus.com/movie/coco" target="_blank" rel="noopener noreferrer" className="text-brand-blue hover:underline text-sm font-bold">Watch on Disney+ →</a>
            </div>
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-purple rounded-r-xl">
              <h5 className="font-black text-brand-purple uppercase text-sm mb-1 tracking-wider">Club de Cuervos</h5>
              <p className="text-sm mb-2">Mexican sports comedy. Great for understanding Latin American humor and everyday expressions.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 9,
      title: "Language Learning Books I Recommend",
      excerpt: "From grammar guides to novels in your target language, these books will accelerate your journey to fluency.",
      color: "duo-border-pink",
      labelColor: "bg-brand-pink",
      icon: <Book className="text-brand-pink w-8 h-8" />,
      videoUrl: "",
      tags: ["Books", "Reading", "Grammar", "Vocabulary", "Literature"],
      category: "media",
      mediaType: "book",
      content: (
        <div className="space-y-6">
          <p className="leading-relaxed">
            Reading is fundamental for expanding vocabulary and understanding grammar in context. Here are my top recommendations across languages and levels.
          </p>
          
          <div className="grid gap-4">
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-purple rounded-r-xl">
              <h5 className="font-black text-brand-purple uppercase text-sm mb-1 tracking-wider">German</h5>
              <ul className="space-y-2 mt-2">
                <li className="text-sm"><strong>"Menschen" Series</strong> - Comprehensive course book with audio</li>
                <li className="text-sm"><strong>"Der Tunnel"</strong> by Bernhard Henning - Simple graded reader for A2+</li>
                <li className="text-sm"><strong>"Die Wand"</strong> by Marlen Haushofer - Advanced German literature</li>
              </ul>
            </div>
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-brand-orange rounded-r-xl">
              <h5 className="font-black text-brand-orange uppercase text-sm mb-1 tracking-wider">Spanish</h5>
              <ul className="space-y-2 mt-2">
                <li className="text-sm"><strong>"Spanish Grammar for Beginners"</strong> - Clear explanations</li>
                <li className="text-sm"><strong>"El Principito" (The Little Prince)</strong> - Simple yet profound</li>
                <li className="text-sm"><strong>"Como agua para chocolate"</strong> - Mexican magical realism</li>
              </ul>
            </div>
            <div className="p-4 bg-[var(--input-bg)] border-l-4 border-red-600 rounded-r-xl">
              <h5 className="font-black text-red-600 uppercase text-sm mb-1 tracking-wider">Chinese</h5>
              <ul className="space-y-2 mt-2">
                <li className="text-sm"><strong>"HSK Standard Course"</strong> - Official textbook series</li>
                <li className="text-sm"><strong>"The Little Prince" (Chinese edition)</strong> - Dual language</li>
                <li className="text-sm"><strong>"Mandarin Companion" Series</strong> - Graded readers</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
  ];

  const togglePostDetails = (id: number) => {
    setShowDetails(prev => ({ ...prev, [id]: !prev[id] }));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedPost) {
        setSelectedPost(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPost]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearTags = () => setSelectedTags([]);

  const highlightText = (text: string, query: string): React.ReactNode => {
    if (!query.trim()) return text;
    
    try {
      const regex = new RegExp(`(${query})`, 'gi');
      const parts = text.split(regex);
      
      return parts.map((part, i) => 
        regex.test(part) ? (
          <mark key={i} className="bg-brand-yellow/40 text-brand-yellow px-0.5 rounded">
            {part}
          </mark>
        ) : part
      );
    } catch {
      return text;
    }
  };

  
  const filteredPosts = posts.filter(post => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery.trim() || 
      post.title.toLowerCase().includes(searchLower) || 
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.title.toLowerCase().split(" ").some(word => word.startsWith(searchLower));
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  return (
    <div className="min-h-screen py-32 px-4" style={{ backgroundColor: 'var(--bg-color)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 relative">
          <SectionLabel text={t("UNIT 4: THE LOGS")} colorClass="bg-brand-orange" hoverGif="https://i.gifer.com/Pak.gif" />
          <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4">
            <ColoredText colorClass="text-brand-orange">{t("Language Logs").split(' ')[0]}</ColoredText> <ColoredText colorClass="text-brand-green">{t("Language Logs").split(' ').slice(1).join(' ')}</ColoredText>
          </h2>
          <p className="text-secondary max-w-xl mx-auto mb-10">
            <ColoredText colorClass="text-brand-purple">{t("Getting Started Material").split(' ')[0]}</ColoredText> {t("Getting Started Material").split(' ').slice(1).join(' ')}
          </p>
          
          <div className="max-w-md mx-auto mb-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-tertiary" />
            <input 
              type="text" 
              placeholder={t("Search articles by title or keyword...")} 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--input-bg)] border-2 border-[var(--border-color)] rounded-2xl pl-12 pr-6 py-4 text-primary focus:outline-none focus:border-brand-orange transition-colors shadow-[0_4px_0_0_var(--border-color)] focus:shadow-[0_4px_0_0_var(--color-brand-orange)]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-tertiary hover:text-brand-pink transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {allTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-brand-yellow text-brand-dark"
                      : "bg-[var(--input-bg)] text-secondary border border-[var(--border-color)] hover:border-brand-yellow"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={clearTags}
                className="mt-3 text-xs text-tertiary hover:text-brand-pink flex items-center gap-1 mx-auto"
              >
                <XCircle className="w-3 h-3" /> Clear filters
              </button>
            )}
          </div>
          
          {(searchQuery || selectedTags.length > 0) && (
            <p className="text-sm text-tertiary mb-4">
              {filteredPosts.length} {filteredPosts.length === 1 ? "result" : "results"}
              {searchQuery && ` for "${searchQuery}"`}
              {selectedTags.length > 0 && ` in ${selectedTags.length} tag${selectedTags.length > 1 ? 's' : ''}`}
            </p>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredPosts.map((post, i) => {
            const isDetailsOpen = showDetails[post.id];
            return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => {
                setCursorColor(post.labelColor.replace('bg-', 'text-'));
                setSelectedIndex(i);
              }}
              onMouseLeave={() => {
                setCursorColor("#1cb0f6");
                setSelectedIndex(-1);
              }}
              className={`duo-card ${post.color} flex flex-col bg-[var(--nav-bg)] cursor-pointer transition-all duration-300 ${
                selectedIndex === i ? "hover:-translate-y-3 scale-[1.02]" : "hover:-translate-y-2"
              }`}
              onClick={() => setSelectedPost(post)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--input-bg)] flex items-center justify-center">
                  {post.icon}
                </div>
              </div>
              <h3 className="text-2xl font-black mb-2">
                <ColoredText colorClass={post.labelColor.replace('bg-', 'text-')}>
                  {highlightText(post.title, searchQuery)}
                </ColoredText>
              </h3>
              <p className="text-secondary mb-3 flex-grow">{post.excerpt}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {post.tags.slice(0, 4).map(tag => (
                  <span 
                    key={tag}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      selectedTags.includes(tag)
                        ? "bg-brand-yellow text-brand-dark"
                        : "bg-[var(--input-bg)] text-tertiary"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  togglePostDetails(post.id);
                }}
                className="w-full py-2 px-3 text-xs text-tertiary hover:text-brand-yellow transition-colors border border-transparent hover:border-brand-yellow/30 rounded-lg bg-[var(--nav-bg)] hover:bg-[var(--hover-bg)] mb-2"
              >
                {isDetailsOpen ? "▲ Hide details" : `▼ ${getFunnyText(i)}`}
              </button>
              {isDetailsOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="mt-2 p-3 bg-[var(--input-bg)] rounded-xl border-2 border-brand-orange/30"
                >
                  <p className="text-xs text-secondary mb-2">Click Read more to see the full content!</p>
                  <p className="text-xs text-tertiary">
                    {post.category === "article" && "📝 Great read ahead!"}
                    {post.category === "media" && post.mediaType === "movie" && "🎬 Movie time!"}
                    {post.category === "media" && post.mediaType === "series" && "📺 Binge mode!"}
                    {post.category === "media" && post.mediaType === "book" && "📖 Bookworm vibes!"}
                  </p>
                </motion.div>
              )}
              <div 
                onClick={() => setSelectedPost(post)}
                className="text-brand-blue font-bold flex items-center text-sm group cursor-pointer"
              >
                {t("Read more")} 
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          );
          })}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-tertiary mx-auto mb-4" />
            <p className="text-xl text-secondary mb-4">No posts found for "{searchQuery}"</p>
            <button 
              onClick={() => setSearchQuery("")}
              className="text-brand-blue hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedPost(null)}
            className="absolute inset-0"
            style={{ backgroundColor: 'var(--bg-color)', opacity: 0.95 }}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="relative bg-[var(--card-bg)] w-full max-w-4xl rounded-3xl border-4 shadow-[0_12px_0_0_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[90vh]"
            style={{ borderColor: selectedPost.labelColor === 'bg-brand-green' ? '#58cc02' : selectedPost.labelColor === 'bg-brand-yellow' ? '#ffc800' : selectedPost.labelColor === 'bg-brand-pink' ? '#ff4b4b' : selectedPost.labelColor === 'bg-brand-blue' ? '#1cb0f6' : '#ce82ff' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`h-4 ${selectedPost.labelColor} w-full`} />
            <div className="p-6 md:p-10 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl md:text-5xl font-black">
                  <ColoredText colorClass={selectedPost.labelColor.replace('bg-', 'text-')}>{selectedPost.title}</ColoredText>
                </h2>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="p-2 bg-[var(--input-bg)] rounded-xl hover:bg-brand-pink hover:text-white transition-colors border-2 border-[var(--border-color)]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {selectedPost.videoUrl && (
                <div className="aspect-video w-full bg-black rounded-xl overflow-hidden mb-8 border-4 border-brand-dark">
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src={selectedPost.videoUrl} 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <div className="text-xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {selectedPost.content}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
