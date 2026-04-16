import React, { useState, useEffect, useContext } from "react";
import { motion } from "motion/react";
import { ThemeContext, LanguageContext } from "../context";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { Mascot } from "../components/Mascot";
import { Cloud } from "../components/Cloud";
import { projects, journeyItems, type Project, type JourneyItem } from "../data/milestones.tsx";
import { JourneyCard } from "../components/Milestones/JourneyCard";
import { ProjectCard } from "../components/Milestones/ProjectCard";
import { ProjectModal } from "../components/Milestones/ProjectModal";
import { JourneyModal } from "../components/Milestones/JourneyModal";

export function MilestonesPage() {
  const [filter, setFilter] = useState<string[]>(["ALL"]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedJourney, setSelectedJourney] = useState<JourneyItem | null>(null);
  const [activeTab, setActiveTab] = useState<"milestones" | "journey">("milestones");
  const [showDetails, setShowDetails] = useState<{ [key: string]: boolean }>({});
  const { setCursorColor } = useContext(ThemeContext);
  const { t } = useContext(LanguageContext);

  const allCategories = ["ALL", "CERTIFICATE", "IMMERSION", "CHALLENGE", "MAINTENANCE", "LEARNING", "ACHIEVEMENT", "EVENT", "JOURNEY"];

  const toggleFilter = (cat: string) => {
    if (cat === "ALL") return setFilter(["ALL"]);
    const newFilter = filter.includes(cat) ? filter.filter(f => f !== cat) : [...filter.filter(f => f !== "ALL"), cat];
    setFilter(newFilter.length === 0 ? ["ALL"] : newFilter);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedProject) {
        const idx = projects.findIndex(p => p.title === selectedProject.title);
        if (e.key === "ArrowRight" || e.key === "ArrowDown") setSelectedProject(projects[(idx + 1) % projects.length]);
        else if (e.key === "ArrowLeft" || e.key === "ArrowUp") setSelectedProject(projects[idx <= 0 ? projects.length - 1 : idx - 1]);
        else if (e.key === "Escape") setSelectedProject(null);
      }
      if (selectedJourney && e.key === "Escape") setSelectedJourney(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, selectedJourney]);

  const filteredProjects = filter.includes("ALL") ? projects : projects.filter(p => filter.includes(p.category));

  return (
    <div className="min-h-screen py-32 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 relative">
          <Mascot color="bg-brand-orange" position="right-10 top-0" delay={2} type="star" />
          <Cloud position="left-0 top-10" delay={1} />
          <SectionLabel text={t("UNIT 2 - Personal Milestones")} colorClass="bg-brand-pink" hoverGif="https://i.gifer.com/4OKl.gif" />
          <h2 className="text-4xl md:text-6xl font-black mt-6 mb-4">
            <ColoredText colorClass="text-brand-pink">{t("Language Victories").split(' ')[0]}</ColoredText> <ColoredText colorClass="text-brand-blue">{t("Language Victories").split(' ').slice(1).join(' ')}</ColoredText>
          </h2>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["milestones", "journey"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab as any)} className={`duo-button ${activeTab === tab ? "duo-button-yellow" : "bg-[var(--input-bg)] text-secondary shadow-none border border-[var(--border-color)]"} py-3 px-8 text-sm font-bold capitalize`}>
                {t(tab.charAt(0).toUpperCase() + tab.slice(1))}
              </button>
            ))}
          </div>
          
          {activeTab === "milestones" && (
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {allCategories.map((cat) => (
                <button key={cat} onClick={() => toggleFilter(cat)} className={`duo-button ${filter.includes(cat) ? "duo-button-yellow" : "bg-[var(--input-bg)] text-secondary shadow-none border border-[var(--border-color)]"} py-2 px-4 text-xs`}>
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {activeTab === "milestones" ? (
          <div className="grid md:grid-cols-2 gap-8">
            {filteredProjects.map((p, i) => (
              <ProjectCard key={p.title} p={p} i={i} setCursorColor={setCursorColor} setSelectedProject={setSelectedProject} showDetails={showDetails} toggleProjectDetails={(k) => setShowDetails(prev => ({...prev, [k]: !prev[k]}))} t={t} />
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {journeyItems.map((exp, i) => (
              <JourneyCard key={exp.id} exp={exp} i={i} setCursorColor={setCursorColor} setSelectedJourney={setSelectedJourney} />
            ))}
          </div>
        )}
      </div>

      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} t={t} />}
      {selectedJourney && <JourneyModal journey={selectedJourney} onClose={() => setSelectedJourney(null)} />}
    </div>
  );
}
