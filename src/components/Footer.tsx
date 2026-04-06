import { Terminal, Accessibility } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-[var(--border-color)] relative z-10" role="contentinfo">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-brand-pink rounded flex items-center justify-center">
            <Terminal className="text-brand-dark w-4 h-4" />
          </div>
          <span className="font-black tracking-tighter"><span className="text-brand-green">Mastro</span><span className="text-brand-yellow">Languages</span></span>
        </div>
        
        <p className="text-xs text-tertiary font-bold uppercase tracking-widest">
          © 2026 George Mastrogiannis. Built with <span aria-label="love">❤️</span> and <span className="text-brand-yellow">React</span>.
        </p>
      </div>
    </footer>
  );
}
