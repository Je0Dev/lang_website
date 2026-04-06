import React, { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { useContext } from "react";
import { ThemeContext, LanguageContext } from "../context";
import { ColoredText } from "../components/ColoredText";
import { SectionLabel } from "../components/SectionLabel";
import { Mascot } from "../components/Mascot";
import { Globe, Gitlab, Mail, Github, Linkedin } from "lucide-react";

export function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useContext(LanguageContext);

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
      newErrors.message = "Message must be at least 10 characters";
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
<div className="flex flex-col sm:flex-row gap-3">
  {[
    { 
      name: "Website", 
      icon: <Globe className="w-5 h-5" />,
      color: "#10b981", 
      bg: "bg-emerald-500", 
      shadow: "#059669",
      href: "https://je0dev.github.io/personal_website/" 
    },
    { 
      name: "GitLab", 
      icon: <Gitlab className="w-5 h-5" />,
      color: "#ffffff", 
      bg: "bg-[#fc6d26]", 
      shadow: "#e24329",
      href: "https://gitlab.com/mag30-admin" 
    },
    { 
      name: "Email", 
      icon: <Mail className="w-5 h-5" />, 
      color: "#ffffff", 
      bg: "bg-brand-pink", 
      shadow: "#d43b3b",
      href: "mailto:giorgos_M000@hotmail.com" 
    },
    { 
      name: "GitHub", 
      icon: <Github className="w-5 h-5" />, 
      color: "#ffffff", 
      bg: "bg-[#2b2b2b]", 
      shadow: "#1a1a1a",
      href: "https://github.com/Je0Dev" 
    },
    { 
      name: "LinkedIn", 
      icon: <Linkedin className="w-5 h-5" />, 
      color: "#ffffff", 
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
      className={`flex items-center justify-center gap-2 py-3 px-5 rounded-xl border-2 border-transparent hover:border-brand-dark/20 transition-all ${item.bg} shadow-[0_4px_0_0_${item.shadow}] hover:shadow-[0_2px_0_0_${item.shadow}] hover:translate-y-0.5 active:shadow-none active:translate-y-1`}
    >
      <span style={{ color: item.color }}>{item.icon}</span>
      <span className="text-sm font-bold" style={{ color: item.color }}>{item.name}</span>
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
                <label htmlFor="contact-name" className="block text-sm font-black uppercase tracking-widest text-tertiary mb-2">{t("Name")}</label>
                <input 
                  id="contact-name"
                  type="text" 
                  className={`duo-input ${errors.name ? "duo-input-error" : ""}`}
                  placeholder={t("Your Name")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && <p id="name-error" className="error-text" role="alert">{t(errors.name)}</p>}
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-sm font-black uppercase tracking-widest text-tertiary mb-2">{t("Email")}</label>
                <input 
                  id="contact-email"
                  type="email" 
                  className={`duo-input ${errors.email ? "duo-input-error" : ""}`}
                  placeholder={t("your@email.com")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && <p id="email-error" className="error-text" role="alert">{t(errors.email)}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-sm font-black uppercase tracking-widest text-tertiary mb-2">{t("Message")}</label>
                <textarea 
                  id="contact-message"
                  className={`duo-input h-32 resize-none ${errors.message ? "duo-input-error" : ""}`}
                  placeholder={t("What's on your mind?")}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && <p id="message-error" className="error-text" role="alert">{t(errors.message)}</p>}
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`duo-button w-full ${isSuccess ? "duo-button-green" : "duo-button-yellow"} py-4 text-lg`}
              >
                {isSubmitting ? t("SENDING...") : isSuccess ? t("All good!") : t("Send Message")}
              </button>
            </motion.form>
          </div>
        </div>
      </div>
    </div>
  );
}
