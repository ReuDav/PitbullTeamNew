<script>
  import IndexHero from "$lib/components/pages/IndexHero.svelte";
  import Testimonials from "$lib/components/ui/Testimonials.svelte";
  import Quote from "$lib/components/pages/Quote.svelte";
  import GalleryGrid from "$lib/components/ui/GalleryGrid.svelte";
	import { _ } from "svelte-i18n";
  export let data;
</script>
<svelte:head>
    <title>{$_("navbar.home")} | Pitbull Team Soroksár</title> 
</svelte:head>
<IndexHero />
<Quote />
<GalleryGrid />
<Testimonials reviews={data.reviews} />
