import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-12 h-12 bg-brand-yellow rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: showBackToTop ? 1 : 0 }}
      style={{ pointerEvents: showBackToTop ? "auto" : "none" }}
    >
      <ArrowUp className="w-6 h-6 text-brand-dark" />
    </motion.button>
  );
}
