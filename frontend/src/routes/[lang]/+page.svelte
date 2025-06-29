<script>
  import IndexHero from "$lib/components/pages/IndexHero.svelte";
  import Testimonials from "$lib/components/ui/Testimonials.svelte";

  export let data;
</script>

<IndexHero />
<Testimonials reviews={data.reviews} />
