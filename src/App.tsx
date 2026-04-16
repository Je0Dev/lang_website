import { useState, useEffect, useRef, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ThemeContext, LanguageContext } from "./context";

import { Navbar } from "./components/Navbar";
import { LoadingScreen } from "./components/LoadingScreen";
import { Footer } from "./components/Footer";
import { PageLoader } from "./components/PageLoader";
import { MorphingBackgroundFixed } from "./components/MorphingBackgroundFixed";
import { useAppAnimations } from "./hooks/useAppAnimations";
import { useTheme } from "./hooks/useTheme";
import { useLanguage } from "./hooks/useLanguage";
import { ErrorBoundary } from "./components/ErrorBoundary";

// Lazy load pages for performance
const Hero = lazy(() => import("./pages/Hero").then(m => ({ default: m.Hero })));
const ResourcesPage = lazy(() => import("./pages/Resources").then(m => ({ default: m.ResourcesPage })));
const MilestonesPage = lazy(() => import("./pages/Milestones").then(m => ({ default: m.MilestonesPage })));
const BlogPage = lazy(() => import("./pages/Blog").then(m => ({ default: m.BlogPage })));
const JourneyPage = lazy(() => import("./pages/Journey").then(m => ({ default: m.JourneyPage })));
const ContactPage = lazy(() => import("./pages/Contact").then(m => ({ default: m.ContactPage })));
const LanguagesPage = lazy(() => import("./pages/Languages").then(m => ({ default: m.LanguagesPage })));
const ToolsPage = lazy(() => import("./pages/Tools").then(m => ({ default: m.ToolsPage })));

export default function App() {
  const theme = useTheme();
  const language = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress, smoothProgress, backgroundColor, tealOpacity, pinkOpacity, orangeOpacity, rotationAmount } = useAppAnimations(containerRef, theme.isDarkMode);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeContext.Provider value={theme}>
      <LanguageContext.Provider value={language}>
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
          <MorphingBackgroundFixed scrollYProgress={scrollYProgress} />
          
          <motion.div className="fixed inset-0 pointer-events-none bg-duo-teal z-0" style={{ opacity: tealOpacity }} />
          <motion.div className="fixed inset-0 pointer-events-none bg-duo-pink z-0" style={{ opacity: pinkOpacity }} />
          <motion.div className="fixed inset-0 pointer-events-none bg-duo-orange z-0" style={{ opacity: orangeOpacity }} />

          <motion.div style={{ rotate: rotationAmount }} className="fixed inset-0 pointer-events-none z-0" />
          
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
            <Suspense fallback={<PageLoader />}>
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Hero />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/milestones" element={<MilestonesPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/journey" element={<JourneyPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/languages" element={<LanguagesPage />} />
                  <Route path="/tools" element={<ToolsPage />} />
                </Routes>
              </ErrorBoundary>
            </Suspense>
            </motion.main>
          </AnimatePresence>
          
          <Footer />
        </motion.div>
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}
