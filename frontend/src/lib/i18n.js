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
  if (typeof window === 'undefined') return;

  const path = window.location.pathname;

  // Ellenőrizzük a nyelvi prefixet
  const prefixMatch = path.match(/^\/(en|hu)(\/|$)/);
  const langFromPrefix = prefixMatch?.[1];

  // Ha nincs prefix, akkor fallback: localStorage -> navigator
  let savedLocale = langFromPrefix
    || localStorage.getItem(STORAGE_KEY)
    || (['en', 'hu'].includes(getLocaleFromNavigator()) ? getLocaleFromNavigator() : 'hu');

  // Inicializáljuk a nyelvi beállításokat
  init({
    fallbackLocale: 'hu',
    initialLocale: savedLocale
  });

  // Lokális tárolás
  $locale.subscribe((value) => {
    if (value) {
      localStorage.setItem(STORAGE_KEY, value);
    }
  });

  await waitLocale();
}
