import {
  register,
  init,
  getLocaleFromNavigator,
  waitLocale,
  locale as $locale
} from 'svelte-i18n';

register('hu', () => import('./locales/hu.json'));
register('en', () => import('./locales/en.json'));

const STORAGE_KEY = 'user-locale';

export async function setupI18n() {

  if (typeof window === 'undefined') {
    return;
  }

  const pathLocaleMap = {
  '/trainers': 'en',
  '/gallery': 'en',
  '/contact': 'en',
  '/edzok': 'hu',
  '/galeria': 'hu',
  '/kapcsolat': 'hu',
  };
  const path = window.location.pathname;
  const lang = Object.entries(pathLocaleMap).find(([key]) => path.startsWith(key))?.[1];
  // Try to load from localStorage
  let savedLocale = localStorage.getItem(STORAGE_KEY);

  if (!savedLocale) {
    const navigatorLocale = getLocaleFromNavigator();

    // Only accept 'en' or 'hu', default to 'hu'
    savedLocale = ['en', 'hu'].includes(navigatorLocale) ? navigatorLocale : 'hu';
  }

  init({
    fallbackLocale: 'hu',
    initialLocale: lang || savedLocale,
  });

  // Persist on change
  $locale.subscribe((value) => {
    if (value) {
      localStorage.setItem(STORAGE_KEY, value);
    }
  });

  await waitLocale();
}
