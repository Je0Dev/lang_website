import React from "react";

export interface LanguageLevel {
  level: string;
  description: string;
  resources: { text: string; url: string }[];
  blogLinks: { text: string; url: string }[];
}

export interface LanguageDetail {
  name: string;
  flag: string;
  level: string;
  progress: number;
  colors: string[];
  details: string;
  levels: LanguageLevel[];
}

export interface TipData {
  title: string;
  key: string;
  icon: React.ReactNode;
  color: string;
  colorHex: string;
  borderColor: string;
  content: string;
  points: string[];
  links: {text: string; url: string}[];
}
