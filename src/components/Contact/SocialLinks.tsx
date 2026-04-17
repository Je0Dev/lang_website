import React from "react";
import { Globe, Gitlab, Mail, Github, Linkedin } from "lucide-react";

const socialItems = [
  { 
    name: "Website", 
    icon: <Globe className="w-5 h-5" />,
    color: "#10b981", 
    bg: "bg-emerald-500", 
    shadow: "#059669",
    href: "https://je0dev.github.io/personal_website/" 
  },
  { 
    name: "GitLab", 
    icon: <Gitlab className="w-5 h-5" />,
    color: "#ffffff", 
    bg: "bg-[#fc6d26]", 
    shadow: "#e24329",
    href: "https://gitlab.com/mag30-admin" 
  },
  { 
    name: "Email", 
    icon: <Mail className="w-5 h-5" />, 
    color: "#ffffff", 
    bg: "bg-brand-pink", 
    shadow: "#d43b3b",
    href: "mailto:giorgos_M000@hotmail.com" 
  },
  { 
    name: "GitHub", 
    icon: <Github className="w-5 h-5" />, 
    color: "#ffffff", 
    bg: "bg-[#2b2b2b]", 
    shadow: "#1a1a1a",
    href: "https://github.com/Je0Dev" 
  },
  { 
    name: "LinkedIn", 
    icon: <Linkedin className="w-5 h-5" />, 
    color: "#ffffff", 
    bg: "bg-brand-blue", 
    shadow: "#1899d6",
    href: "https://www.linkedin.com/in/geomas/" 
  },
];

export function SocialLinks() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {socialItems.map((item) => (
        <a 
          key={item.name} 
          href={item.href}
          target={item.name === "Email" ? "_self" : "_blank"}
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 py-3 px-5 rounded-xl border-2 border-transparent hover:border-brand-dark/20 transition-all ${item.bg} shadow-[0_4px_0_0_${item.shadow}] hover:shadow-[0_2px_0_0_${item.shadow}] hover:translate-y-0.5 active:shadow-none active:translate-y-1`}
        >
          <span style={{ color: item.color }}>{item.icon}</span>
          <span className="text-sm font-bold" style={{ color: item.color }}>{item.name}</span>
        </a>
      ))}
    </div>
  );
}
