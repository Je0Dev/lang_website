import React, { useContext } from "react";
import { motion } from "motion/react";
import { LanguageContext } from "../../context";
import { useContactForm } from "../../hooks/useContactForm";

export function ContactForm() {
  const { t } = useContext(LanguageContext);
  const { formData, setFormData, errors, isSubmitting, isSuccess, handleSubmit } = useContactForm();

  return (
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
  );
}
