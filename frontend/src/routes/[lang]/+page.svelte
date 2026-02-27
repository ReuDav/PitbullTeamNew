<script>
  import IndexHero from "$lib/components/pages/IndexHero.svelte";
  import Testimonials from "$lib/components/ui/Testimonials.svelte";
  import Quote from "$lib/components/pages/Quote.svelte";
  import GalleryGrid from "$lib/components/ui/GalleryGrid.svelte";
  export let data;
</script>

<IndexHero />
<Quote />
<GalleryGrid />
<Testimonials reviews={data.reviews} />
