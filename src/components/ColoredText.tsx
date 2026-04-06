import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { LanguageContext, type Language } from "../context";

const languageColors: Record<Language, string> = {
  EL: "#1cb0f6",
  EN: "#ff4d4d",
  DE: "#ffc800",
  ES: "#ff9f1c",
  ZH: "#ff3366",
};

const languageGifs: Record<Language, string> = {
  EL: "https://media.giphy.com/media/3o7btPCcdNniyf0j3C/giphy.gif",
  EN: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  DE: "https://media.giphy.com/media/3oEjI5VtIhTJCkwyGY/giphy.gif",
  ES: "https://media.giphy.com/media/l1J9EdzfOSgfyueLm/giphy.gif",
  ZH: "https://media.giphy.com/media/l0MYGb1LuZ3n8dnuw/giphy.gif",
};

interface ColoredTextProps {
  children: ReactNode;
  colorClass: string;
  to?: string;
  highlightSelected?: boolean;
}

export function ColoredText({ children, colorClass, to, highlightSelected = true }: ColoredTextProps) {
  const { language } = useContext(LanguageContext);
  const [showGif, setShowGif] = useState(false);
  
  const currentColor = languageColors[language];
  const currentGif = languageGifs[language];
  const isLink = !!to;

  const content = (
    <span 
      className={`${colorClass} font-bold inline-block transition-opacity relative`}
      onMouseEnter={() => !isLink && setShowGif(true)}
      onMouseLeave={() => !isLink && setShowGif(false)}
    >
      {children}
      {!isLink && showGif && (
        <img 
          src={currentGif} 
          alt="animated" 
          className="absolute -top-8 left-1/2 w-12 h-12 object-contain pointer-events-none z-50 rounded"
        />
      )}
    </span>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block">
        {content}
      </Link>
    );
  }

  return content;
}