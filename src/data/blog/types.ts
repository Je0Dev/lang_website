import React from "react";

export interface BlogPost {
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
