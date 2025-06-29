<script lang="ts">
  export const ssr = false;
  export const prerender = false;
  
  import { onMount, onDestroy } from "svelte";
  import Navbar from "../components/navbar.svelte";
  import Footer from "../components/footer.svelte";

  import { page } from "$app/stores";
  import { locale } from "svelte-i18n";
  import { goto } from "$app/navigation";
  import { setupI18n } from "$lib/i18n";

  import ContactPage from "../components/page/ContactPage.svelte";
  import TrainersPage from "../components/page/TrainersPage.svelte";
  import PricesPage from "../components/page/PricesPage.svelte";
  import TrainerProfilePage from "../components/page/TrainerProfilePage.svelte";
  import GalleryPage from "../components/page/GalleryPage.svelte";
  import IndexPage from "../components/page/IndexPage.svelte";

  let ready = false;
  let currentLocale = "";
  let redirecting = false;

  const huToEn = {
    kapcsolat: "contact",
    edzok: "trainers",
    arak: "prices",
    galeria: "gallery",
    edzo: "trainer",
  };
  const enToHu = Object.fromEntries(
    Object.entries(huToEn).map(([k, v]) => [v, k]),
  );

  function translatePath(path: string, targetLocale: string) {
    const parts = path.split("/").filter(Boolean);
    return (
      "/" +
      parts
        .map((p) => {
          if (targetLocale === "hu") {
            return enToHu[p] ?? p;
          } else {
            return huToEn[p] ?? p;
          }
        })
        .join("/")
    );
  }

  let unsubscribeLocale: () => void;

  onMount(async () => {
    await setupI18n();

    let localeValue;
    const unsub = locale.subscribe((value) => (localeValue = value));
    unsub();

    currentLocale = localeValue || "hu";
    ready = true;

    unsubscribeLocale = locale.subscribe(async (newLocale) => {
      if (!ready || redirecting || newLocale === currentLocale) return;

      const currentPath = window.location.pathname;
      const newPath = translatePath(currentPath, newLocale);

      if (newPath !== currentPath) {
        try {
          redirecting = true;
          await goto(newPath, { replaceState: true, noScroll: true });
          currentLocale = newLocale;
        } catch (e) {
          console.error("Language redirect failed:", e);
          // fallback: revert locale
          locale.set(currentLocale);
        } finally {
          redirecting = false;
        }
      } else {
        currentLocale = newLocale;
      }
    });
  });

  onDestroy(() => {
    unsubscribeLocale && unsubscribeLocale();
  });

  let PageComponent = null;
  let componentProps = {};

  $: if (ready) {
    const path = $page.url.pathname;

    switch (true) {
      case /^\/(kapcsolat|contact)\/?$/.test(path):
        PageComponent = ContactPage;
        componentProps = { title: "Contact", subtitle: "Contact Subtitle" };
        break;

      case /^\/(edzok|trainers)\/?$/.test(path):
        PageComponent = TrainersPage;
        componentProps = {
          title: "Trainers",
          description: "Trainers Description",
        };
        break;

      case /^\/(arak|prices)\/?$/.test(path):
        PageComponent = PricesPage;
        componentProps = { title: "Prices", info: "Prices Info" };
        break;

      case /^\/(galeria|gallery)\/?$/.test(path):
        PageComponent = GalleryPage;
        componentProps = {
          title: "Gallery",
          description: "Gallery Description",
        };
        break;

      case /^\/(edzo|trainer)\/([^\/]+)\/?$/.test(path):
        const match = path.match(/^\/(edzo|trainer)\/([^\/]+)\/?$/);
        PageComponent = TrainerProfilePage;
        componentProps = {
          trainerName: match ? match[2] : null,
          title: "Trainer Profile",
        };
        break;

      case path === "/":
        PageComponent = IndexPage;
        componentProps = {
          title: "Üdvözlünk!",
          subtitle: "Ez a kezdőlap. Itt jelenhet meg promóció, CTA, stb.",
        };
        break;

      default:
        PageComponent = null;
        componentProps = {};
    }
  }
</script>

{#if ready}
  <Navbar />
  <main class="min-h-screen">
    {#if PageComponent}
      <svelte:component this={PageComponent} {...componentProps} />
    {:else}
      <p class="text-center py-20 text-red-600 font-semibold text-xl">
        404 - Not Found
      </p>
    {/if}
  </main>
  <Footer />
{:else}
  <p class="text-center py-20">Loading...</p>
{/if}
