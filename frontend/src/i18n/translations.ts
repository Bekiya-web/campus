// Multi-language translations for EduNexus
// Languages: English (en), Afaan Oromoo (om), Amharic (am)

import type { Language, Translations } from './types';
import { en } from './languages/en';
import { om } from './languages/om';
import { am } from './languages/am';

export type { Language, Translations };

export const translations: Record<Language, Translations> = {
  en,
  om,
  am,
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  om: 'Afaan Oromoo',
  am: 'አማርኛ (Amharic)',
};
