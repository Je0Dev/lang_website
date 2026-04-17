import React, { useContext } from "react";
import { motion } from "motion/react";
import { LanguageContext } from "../context";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { Mascot } from "../components/Mascot";
import { SocialLinks } from "../components/Contact/SocialLinks";
import { ContactForm } from "../components/Contact/ContactForm";

export function ContactPage() {
  const { t } = useContext(LanguageContext);

  return (
    <div className="min-h-screen py-32 px-4 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-20 relative">
          <Mascot color="bg-brand-blue" position="right-20 -top-10" delay={4} type="star" />
          <SectionLabel text={t("UNIT 5: THE FINAL BOSS")} colorClass="bg-brand-yellow" hoverGif="https://i.gifer.com/4OKl.gif" />
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
                  <span className="relative z-10">
                    <ColoredText colorClass="text-brand-yellow">{t("Reach Out")}</ColoredText>
                  </span>
                </span>
              </h2>
              <p className="text-secondary text-xl mb-12">
                Wanna <ColoredText colorClass="text-brand-blue">{t("reach me out?")}</ColoredText><br />
                Fill the form <ColoredText colorClass="text-brand-pink">{t("ASAP")}</ColoredText> 
              </p>
              <SocialLinks />
            </motion.div>
          </div>

          <div className="flex-1">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
