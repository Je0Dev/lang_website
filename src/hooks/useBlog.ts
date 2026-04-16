import { useState, useEffect, useMemo, useContext, useCallback } from "react";
import { ThemeContext, LanguageContext } from "../context";
import { blogPosts, type BlogPost } from "../data/blogPosts";

export function useBlog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [showDetails, setShowDetails] = useState<{ [key: number]: boolean }>({});
  const { setCursorColor } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  const funnyTexts = [
    "Wanna click here? 👀", "Check it out! 🔍", "Not convinced? 🤔", "Could help! 💡",
    "Just a link, no pressure 🫡", "Click or don't 😏", "This might be useful? 📚",
    "Take a peek! 👆", "Your call! 🙃", "Go on, be curious! 🌟",
  ];

  const getFunnyText = (index: number) => funnyTexts[index % funnyTexts.length];

  const togglePostDetails = (id: number) => setShowDetails(prev => ({ ...prev, [id]: !prev[id] }));

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape" && selectedPost) setSelectedPost(null); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedPost]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogPosts.forEach(post => post.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  const toggleTag = (tag: string) => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  const clearTags = () => setSelectedTags([]);

  const filteredPosts = useMemo(() => {
    return blogPosts.filter(post => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery.trim() || 
        post.title.toLowerCase().includes(searchLower) || 
        post.excerpt.toLowerCase().includes(searchLower) ||
        post.title.toLowerCase().split(" ").some(word => word.startsWith(searchLower));
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => post.tags.includes(tag));
      return matchesSearch && matchesTags;
    });
  }, [searchQuery, selectedTags]);

  return { selectedPost, setSelectedPost, searchQuery, setSearchQuery, selectedTags, setSelectedTags, selectedIndex, setSelectedIndex, showDetails, togglePostDetails, getFunnyText, allTags, toggleTag, clearTags, filteredPosts, setCursorColor, t };
}
