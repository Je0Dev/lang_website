import React from "react";

export interface Project {
  title: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
  tag: string;
  labelColor: string;
  category: string;
  longDesc: string;
  date: string;
  links?: { text: string; url: string }[];
}

export interface JourneyItem {
  id: number;
  title: string;
  company: string;
  period: string;
  desc: string;
  longDesc: string;
  icon: React.ReactNode;
  color: string;
  textColor: string;
  hex: string;
  links?: { text: string; url: string }[];
  highlights: string[];
  tips: string[];
}
