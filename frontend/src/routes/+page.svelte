<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
  import { goto } from '$app/navigation';
  
  onMount(() => {
    if (!browser) return;

    const savedLocale = localStorage.getItem('user-locale');

    const pathname = window.location.pathname;

    // Ezeket az útvonalakat ne irányítsd át
    const excludedPaths = ['/robots.txt', '/sitemap.xml'];

    const isRoot = pathname === '/';
    const hasLangPrefix = /^\/(hu|en)(\/|$)/.test(pathname);
    const isExcluded = excludedPaths.includes(pathname);

    if ((isRoot || !hasLangPrefix) && !isExcluded) {
      const lang = savedLocale || 'hu';
      goto(`/${lang}`);
    }
  });
</script>

<slot />
