import { elTranslations } from "../data/translationsEL";
import { enTranslations } from "../data/translationsEN";
import { deTranslations } from "../data/translationsDE";
import { esTranslations } from "../data/translationsES";
import { zhTranslations } from "../data/translationsZH";

export type Language = "EL" | "EN" | "DE" | "ES" | "ZH";

export const translations: Record<Language, Record<string, string>> = {
  EL: elTranslations,
  EN: enTranslations,
  DE: deTranslations,
  ES: esTranslations,
  ZH: zhTranslations,
};
