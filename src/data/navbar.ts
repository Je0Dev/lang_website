import { Github, Gitlab, Linkedin, Mail, ExternalLink, Globe } from "lucide-react";
import type { Language } from "../context";

export const languageColors: Record<Language, string> = {
  EL: "#1cb0f6",
  EN: "#ff4d4d",
  DE: "#ffc800",
  ES: "#ff9f1c",
  ZH: "#ff3366",
};

export const socialLinks = [
  { name: "GitHub", href: "https://github.com/Je0Dev", icon: Github, color: "#ffffff", bg: "bg-[#2b2b2b]", shadow: "#1a1a1a" },
  { name: "GitLab", href: "https://gitlab.com/mag30-admin", icon: Gitlab, color: "#ffffff", bg: "bg-[#fc6d26]", shadow: "#e24329" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/geomas/", icon: Linkedin, color: "#ffffff", bg: "bg-brand-blue", shadow: "#1899d6" },
  { name: "Email", href: "mailto:giorgos_M000@hotmail.com", icon: Mail, color: "#ffffff", bg: "bg-brand-pink", shadow: "#d43b3b" },
  { name: "Website", href: "https://je0dev.github.io/personal_website/", icon: ExternalLink, color: "#ffffff", bg: "bg-brand-green", shadow: "#059669" },
];

export const uiLanguages = [
  { code: "EL" as Language, flag: "🇬🇷", name: "Greek" },
  { code: "EN" as Language, flag: "🇬🇧", name: "English" },
  { code: "DE" as Language, flag: "🇩🇪", name: "German" },
  { code: "ES" as Language, flag: "🇪🇸", name: "Spanish" },
  { code: "ZH" as Language, flag: "🇨🇳", name: "Chinese" },
];

export const navItems = [
  { name: "Languages", nameKey: "Languages", path: "/languages" },
  { name: "Resources", nameKey: "Resources", path: "/resources" },
  { name: "Milestones", nameKey: "Milestones", path: "/milestones" },
  { name: "Tools", nameKey: "Tools", path: "/tools" },
  { name: "Blog", nameKey: "Blog", path: "/blog" },
  { name: "Contact", nameKey: "Contact", path: "/contact" },
];