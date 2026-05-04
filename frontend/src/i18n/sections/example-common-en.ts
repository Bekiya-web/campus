// Example: How to organize translations by section
// This file shows how you could split the 'common' section into its own file

import type { CommonTranslations } from '../types';

export const common: CommonTranslations = {
  appName: 'EduNexus',
  welcome: 'Welcome',
  loading: 'Loading...',
  save: 'Save',
  cancel: 'Cancel',
  delete: 'Delete',
  edit: 'Edit',
  search: 'Search',
  filter: 'Filter',
  back: 'Back',
  next: 'Next',
  submit: 'Submit',
  close: 'Close',
  yes: 'Yes',
  no: 'No',
  ok: 'OK',
  error: 'Error',
  success: 'Success',
  viewDetails: 'View Details',
  learnMore: 'Learn More',
  getStarted: 'Get Started',
  readMore: 'Read More',
  seeAll: 'See All',
  noResults: 'No results found',
  tryAgain: 'Try again',
};

// To use this approach:
// 1. Create similar files for each section (auth, materials, etc.)
// 2. Create files for each language (common-om.ts, common-am.ts)
// 3. Import them in languages/en.ts:
//    import { common } from '../sections/common-en';
//    export const en: Translations = { common, auth, ... };
