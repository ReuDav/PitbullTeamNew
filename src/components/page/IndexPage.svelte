<script>
  import { onMount } from "svelte";
  import { locale } from "svelte-i18n"; // import the locale store
  import { get } from "svelte/store";
  import Testimonials from "../testimonials.svelte";

  let mapsData = null;
  let error = null;

  const placeId = import.meta.env.VITE_PITBULL_TEAM_GOOGLE_MAPS_ID;

  async function fetchPlaceDetails() {
    try {
      const res = await fetch(`http://localhost:3000/api/place/${placeId}?fields=*`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Error ${res.status}: ${text}`);
      }
      mapsData = await res.json();
      console.log("✅ Place details fetched:", mapsData);
    } catch (err) {
      error = err.message;
    }
  }

  onMount(fetchPlaceDetails);

  // Anonymize name like "John Smith" -> "Smith J."
  function anonymizeName(name) {
    if (!name) return 'Anonymous';
    const parts = name.trim().split(' ');
    if (parts.length < 2) return name;
    const last = parts.pop();
    const firstInitial = parts[0][0];
    return `${last} ${firstInitial}.`;
  }

  // Pick review text based on current locale
  function getReviewText(review) {
    const currentLocale = get(locale); // get current locale value synchronously
    if (currentLocale === 'hu') {
      // Show original Hungarian text if available, else translated text fallback
      return review.originalText?.text ?? review.translatedText?.text ?? '';
    } else {
      // For English or other locales, prefer translated text, fallback original
      return review.translatedText?.text ?? review.originalText?.text ?? '';
    }
  }
</script>

{#if error}
  <p style="color: red;">Error: {error}</p>
{:else if !mapsData}
  <p>Loading place details...</p>
{:else}
 

  {#if mapsData.reviews?.length}
    <h3>Testimonials</h3>
    <Testimonials
      reviews={mapsData.reviews
        .map((r) => ({
          name: anonymizeName(r.authorAttribution?.displayName ?? 'Anonymous'),
          photoUri: r.authorAttribution?.photoUri ?? "",
          originalText: r.originalText,  // keep full object for safety (optional)
          translatedText: r.text,       // your API uses `text` for translated/translatedText
          // Use getReviewText to select correct text string per locale
          text: getReviewText(r)
        }))
        // Filter out reviews with no usable text (empty string)
        .filter((r) => r.text)
      }
    />
  {/if}
{/if}
