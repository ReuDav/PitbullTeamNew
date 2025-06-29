<script>
  import Carousel from "svelte-carousel";
  import { locale } from "svelte-i18n";
  import { onMount } from "svelte";

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

  // Use $locale auto-subscription in reactive statement
  $: localizedReviews = reviews.map((r) => {
    let displayText = "";
    if ($locale === "hu") {
      displayText = r.originalText?.text ?? r.translatedText?.text ?? "";
    } else {
      displayText = r.translatedText?.text ?? r.originalText?.text ?? "";
    }

    // Ellenőrizzük, van-e fotó
    const realPhoto = r.photoUri || r.profile_photo_url || r.photo_url;

    // Ha nincs, adjunk alapértelmezett képet
    const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(r.name || "Anon")}&background=random`;

    return {
      ...r,
      displayText,
      photoUri: realPhoto ?? fallback,
    };
  });
  // Helper to generate stars fill based on rating
  function isStarFilled(index, rating) {
    return index < rating;
  }
</script>

<Carousel autoplay={4000} particlesToShow={itemsToShow}>
  {#each localizedReviews as review, index (index)}
    <div class="testimonial-slide select-none cursor-grab">
      <img src={review.photoUri} alt={review.name} class="avatar" />
      <!-- Show only the selected text based on locale -->
      <p class="display-text">
        {review.displayText?.text ?? review.displayText ?? ""}
      </p>
      <div class="footer">
        <span class="author">~ {review.name}</span>
        <div class="stars">
          {#each Array(5) as _, i}
            ⭐
          {/each}
        </div>
      </div>
    </div>
  {/each}

  <span slot="left-control">‹</span>
  <span slot="right-control">›</span>
</Carousel>

<style>
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

  @media (max-width: 500px) {
    .testimonial-slide {
      max-width: 90vw;
      padding: 0.5rem;
    }
  }
</style>
