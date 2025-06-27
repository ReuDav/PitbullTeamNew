<script lang="ts">
  import Navbar from '$lib/components/ui/Navbar.svelte';
  import Footer from '$lib/components/ui/Footer.svelte';
  import { onMount } from 'svelte';
  import { setupI18n } from '$lib/i18n';
  import { waitLocale } from 'svelte-i18n';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment'; // 👈 fontos

  let ready = false;

  // Engedélyezett útvonalak
  const validRoutes = {
    hu: ['', 'arak', 'edzok', 'kapcsolat', 'edzo/kami', 'edzo/sosi', 'edzo/bela'],
    en: ['', 'prices', 'contact', 'trainer/kami', 'trainer/sosi', 'trainer/bela']
  };

  onMount(async () => {
    await setupI18n();
    await waitLocale();
    ready = true;

    if (browser) {
      const { pathname } = $page.url;
      const segments = pathname.split('/').filter(Boolean); // pl. ["hu", "arak"]

      if (segments.length > 0) {
        const [lang, ...rest] = segments;
        const subpath = rest.join('/');
        if (!validRoutes[lang]?.includes(subpath)) {
          goto(`/${lang}`); // redirect, csak clienten
        }
      }
    }
  });
</script>

{#if ready}
  <Navbar />
  <main class="min-h-screen overflow-hidden">
    <slot />
  </main>
  <Footer />
{/if}
