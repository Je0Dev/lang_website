import { useState, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "motion/react";
import { ThemeContext, LanguageContext, translations, type Language } from "./context";

import { Navbar } from "./components/Navbar";
import { LoadingScreen } from "./components/LoadingScreen";
import { Footer } from "./components/Footer";

import { Hero } from "./pages/Hero";
import { ResourcesPage } from "./pages/Resources";
import { MilestonesPage } from "./pages/Milestones";
import { BlogPage } from "./pages/Blog";
import { JourneyPage } from "./pages/Journey";
import { ContactPage } from "./pages/Contact";

function MorphingBackgroundFixed() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-10 overflow-hidden">
      <motion.div 
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] rounded-[100%] bg-gradient-to-b from-brand-blue to-transparent"
        style={{ y, scale, willChange: "transform" }}
      />
    </div>
  );
}

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [cursorColor, setCursorColor] = useState("#1cb0f6");
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<Language>("EN");
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  const t = (key: string) => translations[language][key] || key;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light');
  };

  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const backgroundColor = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    isDarkMode 
      ? ["#0a0a0a", "#131f24", "#1a2a30", "#131f24", "#1a2a30", "#0a0a0a"]
      : ["#fdf5e6", "#ffffff", "#f0f0f0", "#ffffff", "#f0f0f0", "#fdf5e6"]
  );

  const blurAmount = useTransform(smoothProgress, [0, 0.5, 1], [0, 8, 0]);
  
  const tealOpacity = useTransform(smoothProgress, [0.1, 0.3, 0.5], [0, 0.1, 0]);
  const pinkOpacity = useTransform(smoothProgress, [0.4, 0.6, 0.8], [0, 0.1, 0]);
  const orangeOpacity = useTransform(smoothProgress, [0.7, 0.9, 1], [0, 0.1, 0]);
  const rotationAmount = useTransform(smoothProgress, [0, 0.5, 1], [0, 1, 0]);

  const getBlurStyle = (progress: number) => {
    if (progress < 0.3) return 0;
    if (progress > 0.7) return 0;
    return 5;
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, cursorColor, setCursorColor }}>
      <LanguageContext.Provider value={{ language, setLanguage, t }}>
        <LoadingScreen isVisible={isLoading} />
        <motion.div 
          ref={containerRef}
          className="min-h-screen selection:bg-brand-yellow selection:text-brand-dark relative overflow-x-hidden"
          style={{ backgroundColor }}
        >
          <motion.div
            className="fixed top-0 left-0 right-0 h-1.5 bg-brand-green z-[100] origin-left"
            style={{ scaleX: smoothProgress }}
          />
          <MorphingBackgroundFixed />
          
          <motion.div className="fixed inset-0 pointer-events-none bg-duo-teal z-0" style={{ opacity: tealOpacity }} />
          <motion.div className="fixed inset-0 pointer-events-none bg-duo-pink z-0" style={{ opacity: pinkOpacity }} />
          <motion.div className="fixed inset-0 pointer-events-none bg-duo-orange z-0" style={{ opacity: orangeOpacity }} />

          <motion.div
            style={{ rotate: rotationAmount }}
            className="fixed inset-0 pointer-events-none z-0"
          />
          
          <Navbar />
          
          <AnimatePresence mode="wait">
            <motion.main 
              id="main-content"
              key={location.pathname}
              className="relative z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Routes>
                <Route path="/" element={<Hero />} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path="/milestones" element={<MilestonesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/journey" element={<JourneyPage />} />
                <Route path="/contact" element={<ContactPage />} />
              </Routes>
            </motion.main>
          </AnimatePresence>
          
          <Footer />
        </motion.div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}