import { motion } from "motion/react";
import { useContext } from "react";
import { ThemeContext, LanguageContext } from "../context";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { Mascot } from "../components/Mascot";
import { Cloud } from "../components/Cloud";
import { FileText, Layout, Sparkles, BookOpen, Wrench, ExternalLink } from "lucide-react";

export function ToolsPage() {
  const { setCursorColor } = useContext(ThemeContext);

  const tools = [
    {
      name: "Anki Vocabulary Extractor",
      desc: "Extract vocabulary from PDF files and import directly into Anki",
      icon: <FileText />,
      color: "bg-brand-blue",
      textColor: "text-brand-blue",
      hex: "#1cb0f6",
      url: "https://github.com/Je0Dev",
      tag: "SCRIPT"
    },
    {
      name: "Anki Templates",
      desc: "Custom card templates with pronunciation and context",
      icon: <Layout />,
      color: "bg-brand-green",
      textColor: "text-brand-green",
      hex: "#58cc02",
      url: "https://github.com/Je0Dev",
      tag: "TEMPLATE"
    },
    {
      name: "Language Flashcards",
      desc: "Pre-made decks for German, Spanish, and Chinese",
      icon: <Sparkles />,
      color: "bg-brand-purple",
      textColor: "text-brand-purple",
      hex: "#ce82ff",
      url: "https://github.com/Je0Dev",
      tag: "DECKS"
    },
    {
      name: "Grammar Notes",
      desc: "Quick reference sheets for key grammar concepts",
      icon: <BookOpen />,
      color: "bg-brand-orange",
      textColor: "text-brand-orange",
      hex: "#ff9600",
      url: "https://github.com/Je0Dev",
      tag: "NOTES"
    }
  ];

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20 relative">
          <Mascot color="bg-brand-pink" position="left-20 top-0" delay={1} type="star" />
          <Cloud position="right-0 top-10" delay={2} />
          <SectionLabel text="UNIT 3 - Developer Tools" colorClass="bg-brand-pink" hoverGif="https://i.gifer.com/4OKl.gif" />
          <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4">
            <ColoredText colorClass="text-brand-pink">Learning</ColoredText> <ColoredText colorClass="text-brand-blue">Tools</ColoredText>
          </h2>
          <p className="text-secondary max-w-xl mx-auto mb-10">
            Scripts, templates, and resources from my <ColoredText colorClass="text-brand-green">GitHub</ColoredText>.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool, i) => (
            <motion.a
              key={tool.name}
              href={tool.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setCursorColor(tool.hex)}
              onMouseLeave={() => setCursorColor("#1cb0f6")}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`duo-card flex items-center gap-6 group cursor-pointer ${tool.color.replace('bg-', 'duo-border-')}`}
            >
              <div className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center text-white shadow-[0_4px_0_0_rgba(0,0,0,0.2)] group-hover:scale-110 transition-transform`}>
                <Wrench className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`text-xl font-black ${tool.textColor}`}>{tool.name}</h3>
                  <span className="text-xs font-bold text-tertiary bg-brand-dark/50 px-2 py-0.5 rounded">{tool.tag}</span>
                </div>
                <p className="text-secondary text-sm">{tool.desc}</p>
              </div>
              <ExternalLink className={`w-6 h-6 ${tool.textColor} opacity-0 group-hover:opacity-100 transition-opacity`} />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}
