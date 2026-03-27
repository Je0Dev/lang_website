import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue } from "motion/react";
import { useState, useEffect, useRef, ReactNode, FormEvent, createContext, useContext } from "react";
import { 
  Code2, 
  Cpu, 
  Globe, 
  Gitlab,
  Layers, 
  MessageSquare, 
  Rocket, 
  Terminal, 
  Zap,
  Github,
  Twitter,
  Linkedin,
  ChevronRight,
  ArrowUpRight,
  Mail,
  Instagram,
  MessageCircle,
  Database,
  Layout,
  Smartphone,
  Server,
  Briefcase,
  GraduationCap,
  Star,
  Sun,
  Moon,
  Menu,
  X,
  Youtube,
  Video,
  BookOpen,
  Mic,
  Headphones,
  PlayCircle,
  GalleryThumbnailsIcon
} from "lucide-react";


// --- Context ---
const ThemeContext = createContext({ 
  isDarkMode: true, 
  toggleTheme: () => {},
  cursorColor: "#1cb0f6",
  setCursorColor: (color: string) => {} 
});

// --- Hooks ---
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  return mousePosition;
};


// const FlamingCursorIcon = ({ color }: { color: string }) => (
//   <svg 
//     width="40" 
//     height="40" 
//     viewBox="0 0 40 40" 
//     fill="none" 
//     xmlns="http://www.w3.org/2000/svg" 
//     style={{ 
//       transform: 'translate(-4px, -4px)',
//       filter: `drop-shadow(0px 0px 5px ${color})`
//     }}
//   >
//     <g>
//       {/* Flame Aura */}
//       <path d="M8 8 L 14 30 L 18 24 L 26 32 L 30 28 L 22 20 L 30 14 Z" fill={color} opacity="0.8" />
//       {/* Core Pointer */}
//       <path d="M10 10 L 14 26 L 17 21 L 23 27 L 25 25 L 19 19 L 25 15 Z" fill="#000000" stroke={color} strokeWidth="1" strokeLinejoin="round" />
//     </g>
//   </svg>
// );

const PngCursorIcon = ({ color, isHovering }: { color: string, isHovering: boolean }) => (
  <div className="relative">
    {/* Dynamic Aura Glow */}
    <motion.div 
      animate={{ 
        scale: isHovering ? 1.5 : 1,
        opacity: isHovering ? 0.6 : 0.2 
      }}
      className="absolute inset-0 blur-lg rounded-full"
      style={{ backgroundColor: color }}
    />
    
    <img 
      src="/cursor2.png" 
      alt="cursor" 
      className="w-10 h-10 object-contain relative z-10 drop-shadow-md"
      style={{ 
        // Offsetting to ensure the "tip" of the cursor is the actual click point
        transform: 'translate(-4px, -4px)' 
      }}
    />
  </div>
);

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  
  // 1. New State for Dynamic Color
  const { cursorColor: defaultColor } = useContext(ThemeContext);
  const [activeColor, setActiveColor] = useState(defaultColor);

  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if it's a clickable element
      const isInteractive = target.closest('button, a, .cursor-pointer, .duo-button, .duo-social-btn');
      setIsHovering(!!isInteractive);

      // 2. COLOR DETECTION LOGIC
      // This looks at the actual rendered color of the text/element
      const computedColor = window.getComputedStyle(target).color;
      
      // Only change color if it's not the default white/black text
      // We check if the color has a significant "tint"
      if (isInteractive || target.classList.contains('text-brand-blue') || target.classList.contains('text-brand-green')) {
        setActiveColor(computedColor);
      } else {
        setActiveColor(defaultColor);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, defaultColor]);

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[99999] hidden md:flex items-center justify-center"
      style={{ x: cursorXSpring, y: cursorYSpring, width: 40, height: 40 }}
      animate={{ 
        scale: isHovering ? 1.3 : 1,
        rotate: isHovering ? 12 : 0
      }}
    >
      {/* Pass the 'activeColor' to the Icon */}
      <PngCursorIcon color={activeColor} isHovering={isHovering} />
    </motion.div>
  );
};

// const CustomCursor = () => {
//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);
  
//   const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
//   const cursorXSpring = useSpring(cursorX, springConfig);
//   const cursorYSpring = useSpring(cursorY, springConfig);

//   const [isHovering, setIsHovering] = useState(false);
//   const { cursorColor } = useContext(ThemeContext);

//   useEffect(() => {
//     const moveCursor = (e: MouseEvent) => {
//       cursorX.set(e.clientX - 6);
//       cursorY.set(e.clientY - 6);
//     };

//     const handleMouseOver = (e: MouseEvent) => {
//       const target = e.target as HTMLElement;
//       if (target.closest('button, a, .cursor-pointer, input, textarea')) {
//         setIsHovering(true);
//       } else {
//         setIsHovering(false);
//       }
//     };

//     window.addEventListener('mousemove', moveCursor);
//     window.addEventListener('mouseover', handleMouseOver);

//     return () => {
//       window.removeEventListener('mousemove', moveCursor);
//       window.removeEventListener('mouseover', handleMouseOver);
//     };
//   }, [cursorX, cursorY]);

//   return (
//     <motion.div
//       className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] flex items-center justify-center"
//       style={{
//         x: cursorXSpring,
//         y: cursorYSpring,
//         willChange: "transform"
//       }}
//       animate={{ 
//         scale: isHovering ? 1.5 : 1,
//       }}
//     >
//       <FlamingCursorIcon color={cursorColor} />
//     </motion.div>
//   );
// };

const ColoredText = ({ children, colorClass }: { children: ReactNode; colorClass: string }) => {
  const { setCursorColor } = useContext(ThemeContext);
  
  // Map tailwind color classes to hex for the cursor when hovering corresponding text
  const colorMap: { [key: string]: string } = {
    "text-brand-green": "#58cc02",
    "text-brand-blue": "#1cb0f6",
    "text-brand-yellow": "#ffc800",
    "text-brand-pink": "#ff4b4b",
    "text-brand-purple": "#ce82ff",
    "text-brand-orange": "#ff9600",
    "text-brand-teal": "#00ffc8",
  };

  const hexColor = Object.entries(colorMap).find(([key]) => colorClass.includes(key))?.[1] || "#1cb0f6";

  return (
    <motion.span
      onMouseEnter={() => setCursorColor(hexColor)}
      onMouseLeave={() => setCursorColor("#1cb0f6")}
      whileHover={{ 
        scale: 1.05,
        color: hexColor
      }}
      className={`${colorClass} font-bold cursor-pointer inline-block transition-colors`}
    >
      {children}
    </motion.span>
  );
};

// const Typewriter = ({ text, delay = 50 }: { text: string; delay?: number }) => {
//   const [currentText, setCurrentText] = useState("");
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true });

//   useEffect(() => {
//     if (isInView && currentIndex < text.length) {
//       const timeout = setTimeout(() => {
//         setCurrentText((prev) => prev + text[currentIndex]);
//         setCurrentIndex((prev) => prev + 1);
//       }, delay);
//       return () => clearTimeout(timeout);
//     }
//   }, [currentIndex, delay, text, isInView]);

//   return (
//     <span ref={ref} className="relative">
//       {currentText}
//       <motion.span
//         animate={{ opacity: [1, 0, 1] }}
//         transition={{ duration: 0.8, repeat: Infinity }}
//         className="inline-block w-1 h-5 bg-brand-yellow ml-1 align-middle"
//       />
//     </span>
//   );
// };

const SectionLabel = ({ text, colorClass, hoverGif }: { text: string; colorClass: string; hoverGif?: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`duo-label ${colorClass} text-white relative cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
      {hoverGif && isHovered && (
        <motion.img 
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          src={hoverGif} 
          alt="Unit GIF" 
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-20 h-20 object-contain z-50 pointer-events-none"
        />
      )}
    </motion.div>
  );
};

const DrawingLine = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 pointer-events-none z-0 hidden md:block">
      <svg className="w-full h-full" preserveAspectRatio="none">
        <motion.path
          d="M 0 0 V 10000"
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="2"
          strokeDasharray="10 10"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
};

const AnimatedIcon = ({ children, color, ...props }: { children: ReactNode; color: string; [key: string]: any }) => (
  <motion.div
    {...props}
    whileHover={{ 
      scale: 1, 
      rotate: [0, -1, 1, 0]
    }}
    whileTap={{ scale: 0.95 }}
    className="cursor-pointer"
  >
    {children}
  </motion.div>
);

const Mascot = ({ color, position, delay = 0, type = "apple" }: { color: string; position: string; delay?: number; type?: "apple" | "star" | "bird" }) => {
  const mousePos = useMousePosition();
  const [isBlinking, setIsBlinking] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState(0);
  const { setCursorColor } = useContext(ThemeContext);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const angle = Math.atan2(mousePos.y - centerY, mousePos.x - centerX) * (180 / Math.PI);
      setRotate(angle / 15);
    }
  }, [mousePos]);

  const colorMap: { [key: string]: string } = {
    "bg-brand-green": "#58cc02",
    "bg-brand-blue": "#1cb0f6",
    "bg-brand-yellow": "#ffc800",
    "bg-brand-pink": "#ff4b4b",
    "bg-brand-purple": "#ce82ff",
    "bg-brand-orange": "#ff9600",
    "bg-brand-teal": "#00ffc8",
  };

  const hexColor = colorMap[color] || "#1cb0f6";

  return (
    <motion.div 
      ref={ref}
      onMouseEnter={() => setCursorColor(hexColor)}
      onMouseLeave={() => setCursorColor("#1cb0f6")}
      whileHover={{ 
        scale: [1, 1, 1, 1, 1],
        rotate: [rotate, rotate - 5, rotate + 5, rotate],
        y: -30,
        transition: { duration: 0.5 }
      }}
      className={`absolute ${position} w-24 h-24 z-20 hidden md:block cursor-pointer`}
      animate={{ 
        y: [0, -15, 0],
        rotate: [rotate, rotate + 5, rotate - 5, rotate],
        scale: [1, 1, 1, 1]
      }}
      transition={{ 
        duration: 1, 
        repeat: Infinity, 
        delay,
        ease: "easeInOut"
      }}
      style={{ willChange: "transform" }}
    >
      {type === "apple" ? (
        <div className={`relative w-full h-full ${color} rounded-full shadow-[0_8px_0_0_rgba(0,0,0,0.3)] border-4 border-brand-dark flex items-center justify-center`}>
          <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-3 h-8 bg-brand-green rounded-full" />
          <div className="flex gap-3">
            <motion.div 
              animate={{ scaleY: isBlinking ? 0.1 : 1 }}
              className="w-3 h-3 bg-brand-dark rounded-full" 
            />
            <motion.div 
              animate={{ scaleY: isBlinking ? 0.1 : 1 }}
              className="w-3 h-3 bg-brand-dark rounded-full" 
            />
          </div>
        </div>
      ) : type === "star" ? (
        <div className={`relative w-full h-full ${color} rounded-2xl rotate-45 shadow-[0_8px_0_0_rgba(0,0,0,0.3)] border-4 border-brand-dark flex items-center justify-center`}>
          <div className="-rotate-45 flex flex-col items-center gap-1">
            <div className="flex gap-2">
              <motion.div animate={{ scaleY: isBlinking ? 0.1 : 1 }} className="w-2 h-2 bg-brand-dark rounded-full" />
              <motion.div animate={{ scaleY: isBlinking ? 0.1 : 1 }} className="w-2 h-2 bg-brand-dark rounded-full" />
            </div>
            <div className="w-4 h-1 bg-brand-dark rounded-full" />
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: [1, 1, 1],
              rotate: [-1, 1, -1]
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className={`w-16 h-10 ${color} rounded-full relative shadow-[0_6px_0_0_rgba(0,0,0,0.2)] border-2 border-brand-dark`}
          >
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-inherit border-2 border-brand-dark rounded-full rotate-45" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <motion.div animate={{ scaleY: isBlinking ? 0.1 : 1 }} className="w-2 h-2 bg-brand-dark rounded-full" />
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

const Cloud = ({ position, delay = 0 }: { position: string; delay?: number }) => (
  <motion.div
    className={`absolute ${position} opacity-20 pointer-events-none`}
    animate={{ x: [-20, 20, -20] }}
    transition={{ duration: 10, repeat: Infinity, delay }}
    style={{ willChange: "transform" }}
  >
    <div className="w-32 h-12 bg-white rounded-full relative">
      <div className="absolute -top-6 left-4 w-16 h-16 bg-white rounded-full" />
      <div className="absolute -top-4 right-4 w-12 h-12 bg-white rounded-full" />
    </div>
  </motion.div>
);


const MorphingBackground = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-10 overflow-hidden">
      <motion.div 
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] rounded-[100%] bg-gradient-to-b from-brand-blue to-transparent"
        style={{ 
          y, 
          scale,
          willChange: "transform"
        }}
      />
    </div>
  );
};

// --- Sections ---

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--nav-bg)] backdrop-blur-md border-b border-[var(--border-color)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Left: Logo */}
          <div className="flex items-center gap-2 z-10 w-1/4">
            <motion.div 
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 bg-brand-green rounded-lg flex items-center justify-center"
            >
              <Globe className="text-brand-dark w-5 h-5" />
            </motion.div>
            <span className="font-black text-xl tracking-tighter hidden sm:inline-block"><span className="text-brand-blue">Mastro</span><span className="text-brand-purple">Languages</span></span>
          </div>

          {/* Center: Nav Links */}
          <div className="hidden lg:flex items-center justify-center gap-1 z-10 flex-1">
            {['Languages', 'Milestones', 'Journey', 'Blog', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="duo-nav-link text-sm"
              >
                {item}
              </a>
            ))}
          </div>

          {/* Right: Socials & Actions */}
          <div className="flex items-center justify-end gap-3 z-10 w-1/4">
            <div className="hidden xl:flex items-center gap-2">
              <motion.a href="https://github.com/Je0Dev" whileHover={{ y: -1, scale: 1 }} className="w-10 h-10 bg-[var(--input-bg)] rounded-xl flex items-center justify-center border border-[var(--border-color)] hover:bg-brand-orange hover:text-brand-dark transition-all shadow-[0_4px_0_0_rgba(255,255,255,0.05)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.2)]">
                <Github className="w-5 h-5" />
              </motion.a>
               <motion.a href="https://gitlab.com/mag30-admin" whileHover={{ y: -1, scale: 1 }} className="w-10 h-10 bg-[var(--input-bg)] rounded-xl flex items-center justify-center border border-[var(--border-color)] hover:bg-brand-purple hover:text-brand-dark transition-all shadow-[0_4px_0_0_rgba(255,255,255,0.05)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.2)]">
                <Gitlab className="w-5 h-5" />
              </motion.a>
               <motion.a href="https://www.linkedin.com/in/geomas/" whileHover={{ y: -1, scale: 1 }} className="w-10 h-10 bg-[var(--input-bg)] rounded-xl flex items-center justify-center border border-[var(--border-color)] hover:bg-brand-blue hover:text-brand-dark transition-all shadow-[0_4px_0_0_rgba(255,255,255,0.05)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.2)]">
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a href="https://je0dev.github.io/personal_website/" whileHover={{ y: -1, scale: 1 }} className="w-10 h-10 bg-[var(--input-bg)] rounded-xl flex items-center justify-center border border-[var(--border-color)] hover:bg-brand-pink hover:text-brand-dark transition-all shadow-[0_4px_0_0_rgba(255,255,255,0.05)] hover:shadow-[0_4px_0_0_rgba(0,0,0,0.2)]">
                <GalleryThumbnailsIcon className="w-5 h-5" />
              </motion.a>
            </div>
            
            <button onClick={toggleTheme} className="p-2 rounded-xl bg-white/5 hover:text-brand-orange hover:bg-white/40 transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          
            {/* Mobile Menu Toggle */}
<button 
  onClick={() => setIsMenuOpen(!isMenuOpen)}
  className="xl:hidden p-2.5 rounded-xl bg-[var(--input-bg)] border border-[var(--border-color)] text-secondary 
             hover:bg-[var(--hover-bg)] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
  aria-expanded={isMenuOpen}
  aria-label={isMenuOpen ? "Close main menu" : "Open main menu"}
>
  <div className="relative w-6 h-6 flex items-center justify-center">
    {isMenuOpen ? (
      <X className="w-full h-full transform transition-transform duration-200 rotate-0 scale-100" />
    ) : (
      <Menu className="w-full h-full transform transition-transform duration-200 rotate-0 scale-100" />
    )}
  </div>
</button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-[var(--nav-bg)] border-b border-[var(--border-color)] p-4 flex flex-col gap-4 shadow-xl">
          {['Languages', 'Milestones', 'Journey', 'Blog', 'Contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="font-bold text-lg text-secondary hover:text-brand-green transition-colors"
            >
              {item}
            </a>
          ))}
          <div className="flex gap-4 mt-4 pt-4 border-t border-[var(--border-color)]">
            <a href="https://github.com/Je0Dev" className="text-secondary hover:text-brand-blue"><Github className="w-6 h-6" /></a>
            <a href="https://gitlab.com/mag30-admin" className="text-secondary hover:text-brand-blue"><Gitlab className="w-6 h-6" /></a>
            <a href="https://www.linkedin.com/in/geomas/" className="text-secondary hover:text-brand-pink"><Linkedin className="w-6 h-6" /></a>
             <a href="https://je0dev.github.io/personal_website/" className="text-secondary hover:text-brand-pink"><GalleryThumbnailsIcon className="w-6 h-6" /></a>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const [isJumping, setIsJumping] = useState(false);
  const { setCursorColor } = useContext(ThemeContext);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsJumping(true);
        setTimeout(() => setIsJumping(false), 500);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="relative pt-32 pb-20 px-4 min-h-screen flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onMouseEnter={() => setCursorColor("#1cb0f6")}
            onMouseLeave={() => setCursorColor("#1cb0f6")}
          >
            <SectionLabel text="UNIT 0: THE BEGINNING" colorClass="bg-brand-blue" hoverGif="https://i.gifer.com/4Jnt.gif" />
          </motion.div>
          <h1 className="text-5xl md:text-8xl font-black leading-tight mb-6">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Personal <ColoredText colorClass="text-brand-blue">Language Learning</ColoredText>
            </motion.span>
            <br />
            <ColoredText colorClass="text-brand-green">Tips</ColoredText>
          </h1>
          <p className="text-xl text-secondary mb-8 max-w-lg leading-relaxed">
            Exploring the world through <ColoredText colorClass="text-brand-blue">languages</ColoredText>, <ColoredText colorClass="text-brand-green">cultures</ColoredText>, and continuous <ColoredText colorClass="text-brand-pink">learning</ColoredText>.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <button 
              onClick={() => {
                setIsJumping(true);
                setTimeout(() => setIsJumping(false), 500);
              }}
              className="duo-button duo-button-blue"
            >
              {isJumping ? "Wow!" : "Press Space"}
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ 
            opacity: 1, 
            scale: isJumping ? 1.1 : 1, 
            rotate: isJumping ? -1 : 0,
            y: isJumping ? -20 : 0
          }}
          transition={{ 
            duration: isJumping ? 0.2 : 1, 
            type: "spring",
            stiffness: 500
          }}
        >
          <Mascot color="bg-brand-pink" position="-top-20 -left-30" delay={0} type="star" />
          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <motion.div 
                whileHover={{ y: -10, scale: 1.02 }} 
                onMouseEnter={() => setCursorColor("#58cc02")}
                onMouseLeave={() => setCursorColor("#1cb0f6")}
                className="duo-card duo-border-green rotate-[-3deg]"
              >
                <MessageCircle className="text-brand-green w-10 h-10 mb-4" />
                <h3 className="font-bold text-lg"><ColoredText colorClass="text-brand-green">Conversation is the key to Fluency</ColoredText></h3>
              </motion.div>
              <motion.div 
                whileHover={{ y: -10, scale: 1.02 }} 
                onMouseEnter={() => setCursorColor("#ff4b4b")}
                onMouseLeave={() => setCursorColor("#1cb0f6")}
                className="duo-card duo-border-pink rotate-[2deg]"
              >
                <Headphones className="text-brand-pink w-10 h-10 mb-4" />
                <h3 className="font-bold text-lg"><ColoredText colorClass="text-brand-pink">Immersion is the hardest part, but the most rewarding</ColoredText></h3>
              </motion.div>
            </div>
            <div className="space-y-4">
              <motion.div 
                whileHover={{ y: -10, scale: 1.02 }} 
                onMouseEnter={() => setCursorColor("#1cb0f6")}
                onMouseLeave={() => setCursorColor("#1cb0f6")}
                className="duo-card duo-border-blue rotate-[3deg]"
              >
                <BookOpen className="text-brand-blue w-10 h-10 mb-4" />
                <h3 className="font-bold text-lg"><ColoredText colorClass="text-brand-blue">Don't try to master Grammar, just have solid foundations</ColoredText></h3>
              </motion.div>
              <motion.div 
                whileHover={{ y: -10, scale: 1.02 }} 
                onMouseEnter={() => setCursorColor("#ce82ff")}
                onMouseLeave={() => setCursorColor("#1cb0f6")}
                className="duo-card duo-border-purple rotate-[-2deg]"
              >
                <Mic className="text-brand-purple w-10 h-10 mb-4" />
                <h3 className="font-bold text-lg"><ColoredText colorClass="text-brand-purple">Pronunciation is key, but not the goal</ColoredText></h3>
              </motion.div>
            </div>
          </div>
          <motion.div 
            animate={{ 
              scale: [1, 1, 1],
              
            }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-brand-blue/10 blur-[100px] rounded-full -z-10" 
          />
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => {
  const skills = [
    { name: "Spanish", icon: <Globe />, color: "bg-brand-blue", textColor: "text-brand-blue", hex: "#1cb0f6" },
    { name: "French", icon: <MessageCircle />, color: "bg-brand-green", textColor: "text-brand-green", hex: "#58cc02" },
    { name: "German", icon: <BookOpen />, color: "bg-brand-purple", textColor: "text-brand-purple", hex: "#ce82ff" },
    { name: "Japanese", icon: <Mic />, color: "bg-brand-pink", textColor: "text-brand-pink", hex: "#ff4b4b" },
    { name: "Italian", icon: <Headphones />, color: "bg-brand-orange", textColor: "text-brand-orange", hex: "#ff9600" },
    { name: "Portuguese", icon: <Globe />, color: "bg-brand-teal", textColor: "text-brand-teal", hex: "#00ffc8" },
    { name: "Russian", icon: <MessageCircle />, color: "bg-brand-yellow", textColor: "text-brand-yellow", hex: "#ffc800" },
    { name: "Korean", icon: <BookOpen />, color: "bg-brand-blue", textColor: "text-brand-blue", hex: "#1cb0f6" },
  ];

  const { setCursorColor } = useContext(ThemeContext);

  return (
    <section id="languages" className="py-32 px-4 relative">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-20 relative">
          <Mascot color="bg-brand-teal" position="left-10 top-0" delay={1} type="star" />
          <SectionLabel text="UNIT 1 - Language Goals" colorClass="bg-brand-green" hoverGif="https://i.gifer.com/Pak.gif" />
          <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4">
            <ColoredText colorClass="text-brand-blue">Language</ColoredText> <ColoredText colorClass="text-brand-pink">Hunting</ColoredText> 
          </h2>
          <p className="text-secondary max-w-xl mx-auto">
             Here is my <ColoredText colorClass="text-brand-yellow"> List</ColoredText>.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setCursorColor(skill.hex)}
              onMouseLeave={() => setCursorColor("#1cb0f6")}
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="relative">
                <motion.div 
                  whileHover={{ 
                    scale: [1, 1, 1, 1, 1],
                    y: -3, 
                    rotate: [0, -2, 2, 0],
                    transition: { duration: 0.1 }
                  }}
                  whileTap={{ scale: 0.9 }}
                  className={`w-24 h-24 rounded-full ${skill.color} border-b-8 border-black/20 flex items-center justify-center text-white shadow-xl relative z-10`}
                >
                  <div className="scale-150">{skill.icon}</div>
                </motion.div>
                <div 
                  className="absolute inset-0 rounded-full blur-2xl opacity-0 group-hover:opacity-40 transition-opacity"
                  style={{ backgroundColor: skill.hex }}
                />
              </div>
              <div className="bg-brand-dark/80 backdrop-blur-sm border border-white/10 px-4 py-1 rounded-xl shadow-lg">
                <span className={`font-black text-sm ${skill.textColor}`}>{skill.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Milestones = () => {
  const [filter, setFilter] = useState("ALL");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const { setCursorColor } = useContext(ThemeContext);
  
  const projects = [
    {
      title: "Goethe Zertifikat B2 Niveau",
      desc: "Passed the official German diploma. Something to be proud of i guess.",
      color: "duo-border-green",
      icon: <GraduationCap className="text-brand-green" />,
      tag: "CERTIFICATE",
      labelColor: "bg-brand-green",
      category: "CERTIFICATE",
      longDesc: "Although late, i finally managed to complete one of my goals. Trying to continue improving every single day. Ziel is now the C1 Sprachdiploma"
    },
    {
      title: "German Immersion",
      desc: "Consuming Deutsch content daily. Films, Series, Videogames Artikles and Textbooks are my main sources for now.",
      color: "duo-border-yellow",
      icon: <Globe className="text-brand-yellow" />,
      tag: "IMMERSION",
      labelColor: "bg-brand-yellow",
      category: "IMMERSION",
      longDesc: "Been to Frankfurt a few times, but i couldn\t really stay there to actually get to learn the language faster. It\'s fine though, i got the Lust so we just need to keep grinding and overcoming language barriers. Little time investment on immersing ourselves daily, goes a long way."
    },
    {
      title: "Spanish Challenge",
      desc: "Trying to learn español in any way i see fit.",
      color: "duo-border-pink",
      icon: <BookOpen className="text-brand-pink" />,
      tag: "CHALLENGE",
      labelColor: "bg-brand-pink",
      category: "CHALLENGE",
      longDesc: "Found some websites and books that can prove to be useful. Did some grammar, but still a long way to go"
    },
    {
      title: "Chinese Challenge",
      desc: "Mandarin seems to be also one of my big goals this year",
      color: "duo-border-pink",
      icon: <BookOpen className="text-brand-pink" />,
      tag: "CHALLENGE",
      labelColor: "bg-brand-pink",
      category: "CHALLENGE",
      longDesc: "Got all the resources that i will probably need, so now it really is matter of commitment and perseverance. I am either going to add the language in my bag, or it will end me. We will see. Stay Tuned!"
    },
     {
      title: "English Immersion",
      desc: "Youtube is the main way for me to consume content in this language. Talking to myself whenever i can as well to keep my vocabulary and pronounciation up to date.",
      color: "duo-border-pink",
      icon: <BookOpen className="text-brand-yellow" />,
      tag: "IMMERSION",
      labelColor: "bg-brand-yellow",
      category: "IMMERSION",
      longDesc: "Just as almost everyone else probably, i have accuired my Proficency Diploma from a young age. Since then the only thing left to do, is to just keep using the language."
    },
  ];

  const filteredProjects = filter === "ALL" ? projects : projects.filter(p => p.category === filter);

  return (
    <section id="milestones" className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 relative">
          <Mascot color="bg-brand-orange" position="right-10 top-0" delay={2} type="star" />
          <Cloud position="left-0 top-10" delay={1} />
          <SectionLabel text="UNIT 2 - Personal Milestones" colorClass="bg-brand-pink" hoverGif="https://i.gifer.com/4OKl.gif" />
          <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4">
            <ColoredText colorClass="text-brand-pink">Language</ColoredText> <ColoredText colorClass="text-brand-blue">Victories</ColoredText>
          </h2>
          <p className="text-secondary max-w-xl mx-auto mb-10">
          <ColoredText colorClass="text-brand-yellow">Achievements</ColoredText> and <ColoredText colorClass="text-brand-pink">Challenges</ColoredText> conquered along the way.
          </p>
          
          {/* Project Filtering (from Image 4) */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {["ALL", "CERTIFICATE", "IMMERSION", "CHALLENGE"].map((cat) => (
              <div key={cat} className="relative group">
                <button
                  onClick={() => setFilter(cat)}
                  className={`duo-button ${filter === cat ? "duo-button-yellow" : "bg-[var(--input-bg)] text-secondary shadow-none border border-[var(--border-color)]"} py-2 px-6 text-xs`}
                >
                  {cat}
                </button>
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-dark border border-white/10 px-2 py-1 rounded text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  View {cat} projects
                </div>
              </div>
            ))}
          </div>
        </div>
        
          <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((p, i) => {
            const hexColor = p.labelColor === "bg-brand-green" ? "#58cc02" : 
                             p.labelColor === "bg-brand-yellow" ? "#ffc800" :
                             p.labelColor === "bg-brand-pink" ? "#ff4b4b" : "#ce82ff";
            
            return (
              <motion.div 
                key={p.title}
                layout
                initial={{ opacity: 0, y: 1 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.1}}
                onMouseEnter={() => setCursorColor(hexColor)}
                onMouseLeave={() => setCursorColor("#1cb0f6")}
                whileHover={{ 
                  y: 0,
                  scale: 1,
                  rotate: i % 2 === 0 ? 1 : -1,
                  boxShadow: `0 30px 60px ${hexColor}33`
                }}
                className={`duo-card ${p.color} flex flex-col bg-[var(--nav-bg)] backdrop-blur-sm overflow-hidden group relative`}
              >
                <div className="flex items-start justify-between mb-8">
                  <motion.div 
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-16 h-16 rounded-2xl bg-[var(--input-bg)] flex items-center justify-center group-hover:bg-[var(--input-bg)] transition-colors"
                  >
                    {p.icon}
                  </motion.div>
                  <span className={`${p.labelColor} text-brand-dark font-black px-3 py-1 rounded-lg text-[10px] uppercase tracking-widest shadow-[0_4px_0_0_rgba(0,0,0,0.2)]`}>
                    {p.tag}
                  </span>
                </div>
                <h3 className="text-3xl font-black mb-4">
                  <ColoredText colorClass={p.labelColor.replace('bg-', 'text-')}>{p.title}</ColoredText>
                </h3>
                <p className="text-lg text-secondary mb-8 flex-grow">
                  {p.desc}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <button 
                    onClick={() => setSelectedProject(p)}
                    className="duo-button duo-button-yellow py-2 px-6 text-sm"
                  >
                    Details <ChevronRight className="ml-2 w-5 h-5" />
                  </button>
                  
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedProject(null)}
            className="absolute inset-0 bg-brand-darker/90 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`relative w-full max-w-2xl duo-card border-4 ${selectedProject.color} p-8 shadow-2xl`}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--input-bg)] flex items-center justify-center">
                  {selectedProject.icon}
                </div>
                <h3 className="text-4xl font-black">{selectedProject.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 rounded-full bg-[var(--input-bg)] flex items-center justify-center hover:bg-[var(--input-bg)] transition-colors"
              >
                <Zap className="w-6 h-6 rotate-45" />
              </button>
            </div>
            <p className="text-xl text-secondary mb-8 leading-relaxed">
              {selectedProject.longDesc}
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="duo-button duo-button-blue py-3 px-8">
                Cool right?
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

const Journey = () => {
  const experiences = [
    {
      title: "Advanced Fluency (C1-C2)",
      company: "Final Boss",
      period: "Endgame",
      desc: "Breathe and think like a native. You can probably understand how to do it. You got here by yourself, so if you really are commited you can do it. Not really worth it to chase the C2 diploma in my opinion, but you be you. Good job so far, one last step is remaining",
      icon: <GraduationCap />,
      color: "bg-brand-blue",
      textColor: "text-brand-blue",
      url: "https://youtube.com"
    },
    {
      title: "Intermediate Plateau (B1-B2)",
      company: "Getting Deeper",
      period: "After being familiar with the basics",
      desc: "Now is the time that you are kinda more serious. Immersion through new vocabulary that is actually being used, and start actually masterin key grammar concepts to make your life easier when you want to form sentences that actually depict your opinion on a matter.",
      icon:<MessageCircle />,
      color: "bg-brand-green",
      textColor: "text-brand-green",
      url: "https://youtube.com"
    },
    {
      title: "The Beginning (A1-A2)",
      company: "First Steps",
      period: "When you have time",
      desc: "Just start learning languages. 10 or 30 Minutes it doesn\'t matter how much. Be consisten and set mini goals. That is you can get off the beginner phase and actually get to properly immerse in the language. Use youtube or other websites in the beginning. Seach the web for books, films etc. You really don\'t need to spend money when just starting out. If you really can\'t seem to have the proper time and energy to scavenge the internet, then you should just search for apps that help provide you from day one with native speakers.",
      icon: <Zap />,
      color: "bg-brand-purple",
      textColor: "text-brand-purple",
      url: "https://youtube.com"
    }
  ];

  const { setCursorColor } = useContext(ThemeContext);

  return (
    <section id="journey" className="py-32 px-4 relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20 relative">
          <Mascot color="bg-brand-purple" position="left-20 top-10" delay={3} type="star" />
          <Cloud position="right-0 top-0" delay={2} />
          <SectionLabel text="UNIT 3 - The Timeline as I See It" colorClass="bg-brand-purple" hoverGif="https://i.gifer.com/4Jnt.gif" />
          <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4"><ColoredText colorClass="text-brand-blue">The</ColoredText> <ColoredText colorClass="text-brand-purple"> Journey</ColoredText></h2>
          <p className="text-secondary max-w-xl mx-auto">
          The 3 <ColoredText colorClass="text-brand-blue"> Big Checkpoints</ColoredText>.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onMouseEnter={() => {
                const hex = exp.color.includes('blue') ? '#1cb0f6' : exp.color.includes('green') ? '#58cc02' : '#ce82ff';
                setCursorColor(hex);
              }}
              onMouseLeave={() => setCursorColor("#1cb0f6")}
              className="duo-card flex flex-col md:flex-row items-center gap-8 group hover:bg-[var(--input-bg)] transition-colors"
            >
              <div className={`w-20 h-20 rounded-2xl ${exp.color} flex items-center justify-center text-white shadow-[0_6px_0_0_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform`}>
                {exp.icon}
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                  <h3 className="text-2xl font-black">
                    <ColoredText colorClass={exp.textColor}>{exp.title}</ColoredText>
                  </h3>
                  <span className="text-brand-yellow font-bold">{exp.period}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                  <h4 className="text-secondary font-bold">{exp.company}</h4>
                  <a 
                    href={exp.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-brand-pink hover:underline flex items-center gap-1 text-xs font-bold"
                  >
                    Click here <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-secondary">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { setCursorColor } = useContext(ThemeContext);

  const posts = [
    {
      id: 1,
      title: "How to start learning German",
      excerpt: "Check youtube for now, since it can be a great guide. Ask a llm-model(ChatGPT,Gemini etc.) or just google search. Duolingo and other `immersive` phone apps are an option, but only to get a grasp, an idea of what\'s waiting you.",
      color: "duo-border-green",
      labelColor: "bg-brand-green",
      icon: <PlayCircle className="text-brand-green w-8 h-8" />,
      videoUrl: "https://www.youtube.com/embed/7jP9Aw88h2Y",
      content: (
        <div className="space-y-6">
          <p>Great Video. Check it out although it may seem outdated, it can give you enough motivation to actually start your journey.</p>
          
          <div className="bg-[var(--input-bg)] p-6 rounded-2xl border-2 border-[var(--border-color)]">
            <h4 className="text-2xl font-black text-brand-green mb-4">1. Vocabulary Extraction</h4>
           <p className="mb-4 text-secondary/90 leading-relaxed">
  You can find amazing tools for extracting vocabulary from websites and videos 
  just by simply searching the web. I have made a simple script that I can use to 
  extract data from texts (PDF files), and then simply import into 
  <a 
    href="https://apps.ankiweb.net/" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-brand-blue hover:underline font-medium mx-1"
  >
    Anki
  </a> 
  (great tool, go install it). Check my 
  <a 
    href="https://github.com/Je0Dev" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-brand-green hover:underline font-medium mx-1"
  >
    GitHub
  </a> 
  for scripts and tools.
</p>
          </div>

          <div>
            <h4 className="text-2xl font-black text-brand-green mb-2">2. Comprehensible Input</h4>
            <p className="mb-4">
              I transitioned to German using the 
              <a href="https://learngerman.dw.com/en/nicos-weg/c-36519789" target="_blank" rel="noopener noreferrer" className="mx-1 text-brand-blue hover:underline font-bold">
                Nicos Weg
              </a> 
              series by Deutsche Welle Website. A great first introduction in my opinion. The key is <strong>i + 1</strong>: finding content that is just 
              slightly above your current level so you can follow the story through context. So here are some great resources to get you going:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-brand-blue font-bold">
              <li>
                <a href="https://www.easygerman.org/podcast" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
                  Podcast: Easy German (Great for natural conversation)
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@easygerman" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
                  YouTube: Easy German / German with Jenny
                </a>
              </li>
              <li>
                <a href="https://slowgerman.com/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
                  Listening: Slow German with Annik Rubens
                </a>
              </li>
              <li>
                <a href="https://www.nachrichtenleicht.de/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-green transition-colors">
                  Reading: Nachrichten leicht (Simple current news)
                </a>
              </li>
            </ul>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "How to learn English(if you already haven't)",
      excerpt: "Stop wasting time with boring textbooks. There is too much content on the language. It is never too late for anything.",
      color: "duo-border-pink",
      labelColor: "bg-brand-pink",
      icon: <PlayCircle className="text-brand-pink w-8 h-8" />,
      videoUrl: "https://www.youtube.com/embed/E6588DlZW-c",
      content: (
        <div>
            <h4 className="text-2xl font-black text-brand-green mb-2">1. Some Resources </h4>
            <p className="mb-4">
              Focus on <strong>Natural Acquisition</strong> rather than grammar drills. The key is to consume content 
              where you understand about 70-80% of the context, allowing your brain to `map` the new 20% automatically.
            </p>
            <div className="bg-[var(--input-bg)] p-6 rounded-2xl border-2 border-[var(--border-color)]">
            <ul className="list-disc pl-6 mt-2 space-y-3">
               {/* no matter */}
              <li className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-wider text-pink-500">Every Level</span>
                <a href="https://english.lingolia.com/en/" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold hover:text-brand-green transition-colors">
                  English is easy with Lingolia!
                </a>
              </li>
              {/* Beginner */}
              <li className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-wider text-pink-500">Beginner (A1-A2)</span>
                <a href="https://www.youtube.com/@EnglishwithLucy" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold hover:text-brand-green transition-colors">
                  English with Lucy
                </a>
              </li>

              {/* Intermediate */}
              <li className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-wider text-orange-500">Intermediate (B1-B2)</span>
                <a href="https://www.ted.com/talks" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold hover:text-brand-green transition-colors">
                  TED Talks
                </a>
              </li>

              {/* Advanced */}
              <li className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-wider text-purple-500">Advanced (C1-C2)</span>
                <a href="https://www.economist.com/podcasts" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold hover:text-brand-green transition-colors">
                  The Economist Podcasts
                </a>
                <a href="https://www.theguardian.com/international" target="_blank" rel="noopener noreferrer" className="text-brand-blue font-bold hover:text-brand-green transition-colors">
                 The Guardian
                </a>
              </li>
            </ul>
            </div>
          </div>
      )
    },
    {
  id: 3,
  title: "The Spanish Odyssey",
  excerpt: "From basic greetings to complex abstract debates. Come along with me and hopefully one day we will be able to communicate in this so called romantic language",
  color: "duo-border-orange",
  labelColor: "bg-orange-600",
  icon: <PlayCircle className="text-orange-600 w-8 h-8" />,
  videoUrl: "https://www.youtube.com/embed/83y55TVK09E", 
  content: (
  <div className="space-y-6">
  <p className="leading-relaxed">
    Spanish and English share thousands of cognates, making the start feel fast. However, the true challenge lies in the 
    <strong> speed and verb conjugations</strong>. My advice? Immerse yourself in the rhythm of the language 
    through music and constant visual input.
  </p>
  
  <div className="grid gap-4">
    {/* A-Level: The Foundation */}
    <div className="p-4 bg-[var(--input-bg)] border-l-4 border-yellow-500 rounded-r-xl transition-all hover:bg-[var(--hover-bg)]">
      <h5 className="font-black text-brand-blue uppercase text-sm mb-1 tracking-wider">Level A: The Foundation</h5>
      <p className="text-sm">
        Skip the grammar tables initially. Use 
        <a href="https://www.dreamingspanish.com/" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-brand-green hover:underline">
          Dreaming Spanish
        </a> 
        to acquire the language naturally through <strong>Comprehensible Input</strong>. It builds your "mental ear" 
        before you ever have to struggle with a textbook.
      </p>
    </div>

    {/* B-Level: The Bridge */}
    <div className="p-4 bg-[var(--input-bg)] border-l-4 border-orange-500 rounded-r-xl transition-all hover:bg-[var(--hover-bg)]">
      <h5 className="font-black text-brand-blue uppercase text-sm mb-1 tracking-wider">Level B: The Bridge</h5>
      <p className="text-sm">
        Start consuming the 
        <a href="https://www.hoyhablamos.com/" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-brand-green hover:underline">
          Hoy Hablamos
        </a> 
        podcast daily. This is where you move from "classroom Spanish" to <strong>Intermediate fluency</strong>, 
        learning how natives express complex emotions, doubts, and the dreaded Subjunctive mood.
      </p>
    </div>

    {/* C-Level: Mastery */}
   <div className="p-4 bg-[var(--input-bg)] border-l-4 border-red-600 rounded-r-xl transition-all hover:bg-[var(--hover-bg)]">
  <h5 className="font-black text-brand-blue uppercase text-sm mb-1 tracking-wider">Mastery</h5>
  <p className="text-sm">
    Achieve native-level nuance by consuming unfiltered content. Follow 
    <a href="https://www.youtube.com/@LuisitoComunica" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-brand-green hover:underline">
      Luisito Comunica
    </a> 
    for diverse Latin American slangs or 
    <a href="https://www.youtube.com/@NateGentile7" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-brand-green hover:underline">
      Nate Gentile
    </a> 
    for high-level technical Peninsular Spanish. At this stage, you should be reading 
    <a href="https://elpais.com/" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-brand-green hover:underline">
      El País
    </a> 
    to grasp abstract political and cultural concepts.
  </p>
</div>
  </div>

  {/* Quote Section */}
  <div className="mt-4 p-4 border-2 border-dashed border-brand-pink rounded-2xl bg-brand-pink/5">
    <p className="italic font-medium text-brand-blue text-center">
      "La lengua es el mapa de una cultura. Te dice de dónde viene su gente y hacia dónde se dirige."
    </p>
  </div>
</div>
  )
},
{
  id: 4,
  title: "The Mandarin Mission",
  excerpt: "A roadmap for mastering Hanzi, Tones, and Chengyu idioms.",
  color: "duo-border-red",
  labelColor: "bg-red-600",
  icon: <PlayCircle className="text-red-600 w-8 h-8" />,
  videoUrl: "https://www.youtube.com/embed/v_VUa80gMf0", 
  content: (
<div className="space-y-6">
  <p className="leading-relaxed">
    Chinese is hard. It requires a different type of memory. You move from 
    <strong> phonetic thinking</strong> to <strong>logographic and tonal thinking</strong>. 
  </p>
  
  <div className="grid gap-4">
    {/* A-Level: The Foundation */}
    <div className="p-4 bg-[var(--input-bg)] border-l-4 border-red-400 rounded-r-xl transition-all hover:bg-[var(--hover-bg)]">
      <h5 className="font-black text-red-600 uppercase text-sm mb-1 tracking-wider">Tonal Awareness</h5>
      <p className="text-sm">
        Master the four tones and Pinyin before touching characters. Use 
        <a href="https://www.hellochinese.cc/" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-red-600 hover:underline">
          HelloChinese
        </a> 
        to build a massive foundation of high-frequency vocabulary. Focus on <strong>Radical Recognition</strong>—the 
        building blocks that make up every character.
      </p>
    </div>

    {/* B-Level: The Literacy Leap */}
    <div className="p-4 bg-[var(--input-bg)] border-l-4 border-red-600 rounded-r-xl transition-all hover:bg-[var(--hover-bg)]">
      <h5 className="font-black text-red-600 uppercase text-sm mb-1 tracking-wider">The Literacy Leap</h5>
      <p className="text-sm">
        The jump from HSK 3 to 5 is the "Great Wall." Start using 
        <a href="https://mandarincompanion.com/" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-red-600 hover:underline">
          Mandarin Companion
        </a> 
        graded readers. You need to read thousands of characters in context to stop translating in your head and start 
        recognizing patterns.
      </p>
    </div>

    {/* C-Level: Cultural Integration */}
    <div className="p-4 bg-[var(--input-bg)] border-l-4 border-red-900 rounded-r-xl transition-all hover:bg-[var(--hover-bg)]">
  <h5 className="font-black text-red-600 uppercase text-sm mb-1 tracking-wider">Level C: Cultural Integration</h5>
  <p className="text-sm">
    To reach mastery, you must leave the "learner bubble." Dive into 
    <a href="https://www.bilibili.com/" target="_blank" rel="noopener noreferrer" className="mx-1 font-bold text-red-600 hover:underline">
      Bilibili
    </a> 
    to see how real Gen-Z Chinese is spoken. For the ultimate challenge, listen to 
    <strong className="text-red-700"> Dong Yu Hui (董宇辉)</strong>; his viral livestreams are famous for 
    using poetic, high-level vocabulary that bridges the gap between modern Mandarin and classical literature.
  </p>
</div>
  </div>

  {/* Pro-Tip Component */}
  <div className="mt-4 p-4 border-2 border-dashed border-red-600 rounded-2xl bg-red-600/5">
    <h4 className="font-bold text-red-600 mb-1 flex items-center gap-2">
      <span>💡</span> Pro Tip: Tone Pairing
    </h4>
    <p className="text-sm text-secondary italic">
      "Don't practice tones in isolation. Practice them in pairs (e.g., 1st tone + 4th tone) to master the natural 
      melody of a sentence. This is the secret to sounding like a native."
    </p>
  </div>
</div>
  )
},

  ];

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="blog" className="py-32 px-4 relative bg-black/5">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12 relative">
          <SectionLabel text="UNIT 4: THE LOGS" colorClass="bg-brand-orange" hoverGif="https://i.gifer.com/Pak.gif" />
          <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4">
            <ColoredText colorClass="text-brand-orange">Language</ColoredText> <ColoredText colorClass="text-brand-green">Logs</ColoredText>
          </h2>
          <p className="text-secondary max-w-xl mx-auto mb-10">
            <ColoredText colorClass="text-brand-purple">Getting Started</ColoredText> Material
          </p>
          
          <div className="max-w-md mx-auto mb-12">
            <input 
              type="text" 
              placeholder="Search posts..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--input-bg)] border-2 border-[var(--border-color)] rounded-2xl px-6 py-4 text-primary focus:outline-none focus:border-brand-orange transition-colors shadow-[0_4px_0_0_var(--border-color)] focus:shadow-[0_4px_0_0_var(--color-brand-orange)]"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setCursorColor(post.labelColor.replace('bg-', 'text-'))}
              onMouseLeave={() => setCursorColor("#1cb0f6")}
              className={`duo-card ${post.color} flex flex-col bg-[var(--nav-bg)] cursor-pointer hover:-translate-y-2 transition-transform`}
              onClick={() => setSelectedPost(post)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--input-bg)] flex items-center justify-center">
                  {post.icon}
                </div>
              </div>
              <h3 className="text-2xl font-black mb-2">
                <ColoredText colorClass={post.labelColor.replace('bg-', 'text-')}>{post.title}</ColoredText>
              </h3>
              <p className="text-secondary mb-4 flex-grow">{post.excerpt}</p>
              <button className="text-brand-blue font-bold flex items-center text-sm">
                Details <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Blog Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className={`bg-[var(--nav-bg)] w-full max-w-4xl rounded-3xl border-4 border-brand-dark shadow-[0_12px_0_0_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[90vh]`}
          >
            <div className={`h-4 ${selectedPost.labelColor} w-full`} />
            <div className="p-6 md:p-10 overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl md:text-5xl font-black">
                  <ColoredText colorClass={selectedPost.labelColor.replace('bg-', 'text-')}>{selectedPost.title}</ColoredText>
                </h2>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="p-2 bg-[var(--input-bg)] rounded-xl hover:bg-brand-pink hover:text-white transition-colors border border-[var(--border-color)]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="aspect-video w-full bg-black rounded-xl overflow-hidden mb-8 border-4 border-brand-dark">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={selectedPost.videoUrl} 
                  title="YouTube video player" 
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowFullScreen
                ></iframe>
              </div>

              <div className="text-xl text-secondary leading-relaxed">
                {selectedPost.content}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    let newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long. Come on tell me something.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

const handleSubmit = (e: FormEvent) => {
  e.preventDefault();

  if (validate()) {
   
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\n` +
      `Email: ${formData.email}\n\n` +
      `Message:\n${formData.message}`
    );

    const mailtoUrl = `mailto:giorgos_M000@hotmail.com?subject=${subject}&body=${body}`;
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });
    
    setTimeout(() => setIsSuccess(false), 5000);
  }
};
  return (
    <section id="contact" className="py-32 px-4 min-h-screen flex flex-col justify-center relative">
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="text-center mb-20 relative">
          <Mascot color="bg-brand-blue" position="right-20 -top-10" delay={4} type="star" />
          <SectionLabel text="UNIT 5: THE FINAL BOSS" colorClass="bg-brand-yellow" hoverGif="https://i.gifer.com/4OKl.gif" />
        </div>
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-8">
                <span className="relative inline-block">
                  Hey
                  <span className="absolute top-1 left-1 -z-10 text-brand-teal opacity-30">Hey</span>
                  <span className="absolute top-2 left-2 -z-20 text-brand-pink opacity-50">Hey</span>
                  <span className="absolute top-3 left-3 -z-30 text-brand-orange opacity-60">Hey</span>
                  <span className="absolute top-4 left-4 -z-40 text-brand-yellow opacity-70">Hey</span>
                   <span className="absolute top-4 left-4 -z-40 text-brand-blue opacity-400">Hey</span>
                   <span className="absolute top-4 left-4 -z-40 text-brand-purple opacity-80">Hey</span>
                </span>
                <br />
                <span className="flex items-center gap-4">
                let's<span className="relative inline-block">
                  chat
                  <span className="absolute top-1 left-1 -z-10 text-brand-teal opacity-30">chat</span>
                  <span className="absolute top-2 left-2 -z-20 text-brand-pink opacity-50">chat</span>
                  <span className="absolute top-3 left-3 -z-30 text-brand-orange opacity-60">chat</span>
                  <span className="absolute top-4 left-4 -z-40 text-brand-yellow opacity-70">chat</span>
                   <span className="absolute top-4 left-4 -z-40 text-brand-blue opacity-400">chat</span>
                   <span className="absolute top-4 left-4 -z-40 text-brand-purple opacity-80">chat</span>
                </span> 
                </span>
              </h2>
              <p className="text-secondary text-xl mb-12">
                Wanna <ColoredText colorClass="text-brand-blue">reach me out?</ColoredText><br />
                Fill the form <ColoredText colorClass="text-brand-pink">ASAP</ColoredText> 
              </p>
<div className="flex flex-wrap gap-6">
  {[
    { 
      name: "Website", 
      icon: <Globe />, // Make sure to import { Globe } from 'lucide-react'
      color: "#10b981", 
      bg: "bg-emerald-500", 
      shadow: "#059669",
      href: "https://je0dev.github.io/personal_website/" 
    },
    /* GitLab - Replacing Instagram/WhatsApp */
    { 
      name: "GitLab", 
      icon: <Gitlab />,
      color: "#e24329", 
      bg: "bg-brand-green", 
      shadow: "#b13520",
      href: "https://gitlab.com/mag30-admin" 
    },
    /* Email - Standard mailto link */
    { 
      name: "Email", 
      icon: <Mail />, 
      color: "#ff4b4b", 
      bg: "bg-brand-pink", 
      shadow: "#d43b3b",
      href: "mailto:giorgos_M000@hotmail.com" 
    },
    /* GitHub - Professional Profile */
    { 
      name: "GitHub", 
      icon: <Github />, 
      color: "#ffffff", 
      bg: "bg-pink-800", 
      shadow: "#000000",
      href: "https://github.com/Je0Dev" 
    },
    /* LinkedIn - Professional Profile */
    { 
      name: "LinkedIn", 
      icon: <Linkedin />, 
      color: "#1cb0f6", 
      bg: "bg-brand-blue", 
      shadow: "#1899d6",
      href: "https://www.linkedin.com/in/geomas/" 
    },
  ].map((item) => (
    <a 
      key={item.name} 
      href={item.href}
      target={item.name === "Email" ? "_self" : "_blank"}
      rel="noopener noreferrer"
      className="block outline-none"
    >
      <AnimatedIcon color={item.color}>
        <div className="flex items-center gap-4 group bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer">
          <div className={`w-12 h-12 ${item.bg} rounded-2xl flex items-center justify-center shadow-[0_4px_0_0_${item.shadow}] transition-transform group-active:translate-y-1 group-active:shadow-none`}>
            <div className="text-white scale-110">{item.icon}</div>
          </div>
          <span 
            className="text-2xl font-black transition-all duration-300"
            style={{ color: "var(--text-color)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = item.color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-color)")}
          >
            {item.name}
          </span>
        </div>
      </AnimatedIcon>
    </a>
  ))}
</div>
            </motion.div>
          </div>

          <div className="flex-1">
            <motion.form 
              onSubmit={handleSubmit}
              className="duo-card p-8 space-y-6"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-tertiary mb-2">Name</label>
                <input 
                  type="text" 
                  className={`duo-input ${errors.name ? "duo-input-error" : ""}`}
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <p className="error-text">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-tertiary mb-2">Email</label>
                <input 
                  type="email" 
                  className={`duo-input ${errors.email ? "duo-input-error" : ""}`}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-black uppercase tracking-widest text-tertiary mb-2">Message</label>
                <textarea 
                  className={`duo-input h-32 resize-none ${errors.message ? "duo-input-error" : ""}`}
                  placeholder="What's on your mind?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                {errors.message && <p className="error-text">{errors.message}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`duo-button w-full ${isSuccess ? "duo-button-green" : "duo-button-yellow"} py-4 text-lg`}
              >
                {isSubmitting ? "SENDING..." : isSuccess ? "All good!" : "Send Message"}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 px-4 border-t border-[var(--border-color)] relative z-10">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-brand-pink rounded flex items-center justify-center">
          <Terminal className="text-brand-dark w-4 h-4" />
        </div>
        <span className="font-black tracking-tighter"><span className="text-brand-green">Mastro</span><span className="text-brand-yellow">Languages</span></span>
      </div>
      
      <p className="text-xs text-tertiary font-bold uppercase tracking-widest">
        © 2026 George Mastrogiannis. Built with ❤️ and <span className="text-brand-yellow">Vue</span>.
      </p>
    </div>
  </footer>
);

const ScrollCharacter = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "90%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <motion.div 
      className="fixed right-4 md:right-12 top-20 w-12 h-12 z-40 pointer-events-none hidden sm:flex items-center justify-center"
      style={{ y, rotate }}
    >
      <div className="w-full h-full bg-brand-yellow rounded-full flex items-center justify-center shadow-[0_4px_0_0_#d4a017] border-2 border-brand-dark">
        <Star className="text-brand-dark w-6 h-6 fill-brand-dark" />
      </div>
    </motion.div>
  );
};

const LoadingScreen = ({ isVisible }: { isVisible: boolean }) => (
  <motion.div
    initial={{ opacity: 1 }}
    animate={{ opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? "auto" : "none" }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 z-[10000] bg-brand-dark flex flex-col items-center justify-center"
  >
    {/* 1. The Spinner */}
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      className="w-20 h-20 border-4 border-brand-green border-t-transparent rounded-full mb-6 absolute"
    />

    {/* 2. The GIF Character */}
    <motion.div
      initial={{ y: 10 }}
      animate={{ y: [0, -10, 0] }} // Gentle floating animation
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10 mb-6"
    >
      <img 
        src="https://i.gifer.com/XOsX.gif" 
        alt="Loading Character"
        className="w-32 h-32 object-contain"
        onError={(e) => (e.currentTarget.style.display = 'none')} // Hide if image fails to load
      />
    </motion.div>

    {/* 3. The Text */}
    <h2 className="text-2xl font-black text-white tracking-widest relative z-10">
      LOADING<span className="text-brand-green animate-pulse"> ...</span>
    </h2>
  </motion.div>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [cursorColor, setCursorColor] = useState("#1cb0f6");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('light');
  };

  const { scrollYProgress } = useScroll();
  
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.2, 0.4, 0.6, 0.8, 1],
    isDarkMode 
      ? ["#0a0a0a", "#131f24", "#1a2a30", "#131f24", "#1a2a30", "#0a0a0a"]
      : ["#fdf5e6", "#ffffff", "#f0f0f0", "#ffffff", "#f0f0f0", "#fdf5e6"]
  );

  const tealOpacity = useTransform(scrollYProgress, [0.1, 0.3, 0.5], [0, 0.1, 0]);
  const pinkOpacity = useTransform(scrollYProgress, [0.4, 0.6, 0.8], [0, 0.1, 0]);
  const orangeOpacity = useTransform(scrollYProgress, [0.7, 0.9, 1], [0, 0.1, 0]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, cursorColor, setCursorColor }}>
      <LoadingScreen isVisible={isLoading} />
      <motion.div 
        className="min-h-screen selection:bg-brand-yellow selection:text-brand-dark relative overflow-x-hidden cursor-none"
        style={{ backgroundColor }}
      >
        <motion.div
          className="fixed top-0 left-0 right-0 h-1.5 bg-brand-green z-[100] origin-left"
          style={{ scaleX: scrollYProgress }}
        />
        <CustomCursor />
        <MorphingBackground />
        
        <motion.div className="fixed inset-0 pointer-events-none bg-duo-teal z-0" style={{ opacity: tealOpacity }} />
        <motion.div className="fixed inset-0 pointer-events-none bg-duo-pink z-0" style={{ opacity: pinkOpacity }} />
        <motion.div className="fixed inset-0 pointer-events-none bg-duo-orange z-0" style={{ opacity: orangeOpacity }} />

        <Navbar />
        <main className="relative z-10">
          <Hero />
          <Skills />
          <Milestones />
          <Journey />
          <Blog />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </ThemeContext.Provider>
  );
}



