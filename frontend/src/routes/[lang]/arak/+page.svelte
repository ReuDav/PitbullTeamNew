<script>
	import PageBanner from "$lib/components/ui/PageBanner.svelte";
  console.log("env:", import.meta.env);

  const placeId = import.meta.env.VITE_GOOGLE_MAPS_PLACE_ID;
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
</script>

<h1>Env teszt</h1>
<p>Place ID: {placeId}</p>
<p>API kulcs: {apiKey ? "Be van állítva" : "Nincs beállítva"}</p>


<PageBanner imageUrl="https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" title="Árak" />
