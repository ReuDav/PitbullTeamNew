<script>
  import Carousel from "svelte-carousel";
  import { _, locale } from "svelte-i18n";
  import { onMount } from "svelte";

  /**
   * @typedef {{ text?: string; languageCode?: string }} TextBlock
   * @typedef {{ displayName?: string; photoUri?: string }} AuthorAttribution
   * @typedef {{
   *   authorAttribution?: AuthorAttribution;
   *   originalText?: TextBlock;
   *   text?: TextBlock;
   *   translatedText?: TextBlock;
   *   name?: string;
   *   photoUri?: string;
   *   profile_photo_url?: string;
   *   photo_url?: string;
   *   rating?: number;
   * }} Review
   */
  /** @type {Review[]} */
  export let reviews = [];

  let itemsToShow = 3;

  function updateItemsToShow() {
    const width = window.innerWidth;
    if (width < 768) {
      itemsToShow = 1;
    } else if (width < 1024) {
      itemsToShow = 2;
    } else {
      itemsToShow = 3;
    }
  }

  onMount(() => {
    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);
    return () => window.removeEventListener("resize", updateItemsToShow);
  });

  /**
   * Anonymize full name by locale:
   * - Hungarian (family first): "Farkas Ákos" → "F. Ákos"
   * - English (given first): "Farkas Ákos" → "Ákos F."
   */
  function anonymizeName(fullName = "", isHungarian = false) {
    const trimmed = (fullName || "").trim();
    if (!trimmed) return "";
    const parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0][0] + ".";
    // Hungarian order: first word = family name, rest = given name
    const familyName = parts[0];
    const givenName = parts.slice(1).join(" ");
    const initial = familyName[0] + ".";
    if (isHungarian) return initial + " " + givenName;
    return givenName + " " + initial;
  }

  // Use $locale auto-subscription in reactive statement
  $: localizedReviews = reviews.map((r) => {
    let displayText = "";
    if ($locale === "hu") {
      displayText = r.originalText?.text ?? r.text?.text ?? r.translatedText?.text ?? "";
    } else {
      displayText = r.text?.text ?? r.translatedText?.text ?? r.originalText?.text ?? "";
    }

    const rawName = r.authorAttribution?.displayName ?? r.name ?? "";
    const displayName = anonymizeName(rawName, $locale === "hu");

    let photoUri = r.authorAttribution?.photoUri ?? r.photoUri ?? r.profile_photo_url ?? r.photo_url;
    if (photoUri && photoUri.includes("googleusercontent.com")) {
      photoUri = `/api/image-proxy?url=${encodeURIComponent(photoUri)}`;
    }
    const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName || "Anon")}&background=random`;

    return {
      ...r,
      displayText,
      displayName,
      photoUri: photoUri ?? fallback,
    };
  });
  // Helper to generate stars fill based on rating
  /** @param {number} index @param {number} rating */
  function isStarFilled(index, rating) {
    return index < rating;
  }
</script>
<section class="py-10 bg-white">
  <h2 class="title">{$_('testimonials.title')}</h2>
{#if localizedReviews.length > 0}
  <div class="w-full max-w-screen-lg mx-auto">
    <Carousel autoplay={true} autoplayDuration={4000} particlesToShow={itemsToShow}>
    {#each localizedReviews as review, index (index)}
      <div class="testimonial-slide select-none cursor-grab">
        <img src={review.photoUri} alt={review.displayName} class="avatar" />
        <!-- Show only the selected text based on locale -->
        <p class="display-text">
          {review.displayText ?? ""}
        </p>
        <div class="footer">
          <span class="author">~ {review.displayName}</span>
          <div class="stars">
            {#each Array(5) as _, i}
              ⭐
            {/each}
          </div>
        </div>
      </div>
    {/each}
    </Carousel>
  </div>
{:else}
  <p class="no-reviews">Jelenleg nincsenek értékelések.</p>
{/if}
</section>
<style>
  .title {
    text-align: center;
    font-size: 1.75rem;
    font-weight: 800;
    margin: 0 auto 1.5rem;
    color: #111827;
  }

  .testimonial-slide {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 400px;
    margin: 0 auto;
    padding: 1rem;
    box-sizing: border-box;
    text-align: center;
  }

  .avatar {
    width: 96px;
    height: 96px;
    border-radius: 50%;
    object-fit: cover;
    margin-bottom: 1rem;
  }

  .display-text {
    font-size: 1.1rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .footer {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .author {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .stars {
    display: flex;
    gap: 0.2rem;
  }

  .no-reviews {
    text-align: center;
    font-size: 1rem;
    color: #6b7280;
  }

  @media (max-width: 500px) {
    .testimonial-slide {
      max-width: 90vw;
      padding: 0.5rem;
    }
  }
</style>
