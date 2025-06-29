<script lang="ts">
  export let title: string;
  export let trainerName: string;
  
  // Példa adat - később fetch-elheted API-ról vagy store-ból
  const trainerProfiles = {
    kami: {
      photo: "/images/kami.jpg",
      bio: "Kami 10 éve dolgozik személyi edzőként, főleg erőnléti edzésekkel foglalkozik.",
      specialties: ["Erőnléti tréning", "Funkcionális edzés", "Rehabilitáció"]
    },
    bela: {
      photo: "/images/bela.jpg",
      bio: "Béla szakértő táplálkozási tanácsadó és személyi edző.",
      specialties: ["Táplálkozás", "Személyi edzés", "Életmódváltás"]
    },
    sosi: {
      photo: "/images/sosi.jpg",
      bio: "Sosi küzdősport edző, erőnléti és állóképességi edzések specialistája.",
      specialties: ["Küzdősport", "Állóképesség", "Erőnlét"]
    }
  };

  let profile = trainerProfiles[trainerName?.toLowerCase()] || null;
</script>

{#if profile}
<section class="max-w-3xl mx-auto p-6 my-12 bg-white rounded-lg shadow-lg">
  <h1 class="text-4xl font-extrabold mb-6 text-center">{title} — {trainerName}</h1>

  <div class="flex flex-col md:flex-row items-center md:items-start gap-8">
    <img src={profile.photo} alt={trainerName} class="w-48 h-48 rounded-full object-cover shadow-md" />
    <div>
      <p class="mb-4 text-gray-700">{profile.bio}</p>

      <h3 class="text-xl font-semibold mb-2">Szakterületek:</h3>
      <ul class="list-disc list-inside space-y-1 text-gray-600">
        {#each profile.specialties as spec}
          <li>{spec}</li>
        {/each}
      </ul>
    </div>
  </div>
</section>
{:else}
  <p class="text-center text-red-600 mt-20">Nem található edző a név alapján.</p>
{/if}
