<script>
  import IndexHero from "$lib/components/pages/IndexHero.svelte";
  import Testimonials from "$lib/components/ui/Testimonials.svelte";
  import Quote from "$lib/components/pages/Quote.svelte";

  export let data;
</script>

<IndexHero />
<Quote />
<Testimonials reviews={data.reviews} />
