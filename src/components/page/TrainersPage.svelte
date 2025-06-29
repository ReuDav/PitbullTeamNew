<script lang="ts">
  export let title: string;
  export let description: string;

  // Példa edzők
  const trainers = [
    { name: "Kami", bio: "Tapasztalt edző, főleg erőnléti tréning.", photo: "/images/kami.jpg" },
    { name: "Béla", bio: "Személyi edző és táplálkozási tanácsadó.", photo: "/images/bela.jpg" },
    { name: "Sosi", bio: "Küzdősport edző, kondíció fejlesztés szakértő.", photo: "/images/sosi.jpg" }
  ];
</script>

<section class="max-w-6xl mx-auto p-6 my-12">
  <h1 class="text-5xl font-bold mb-6 text-center">{title}</h1>
  <p class="text-center max-w-3xl mx-auto mb-12 text-gray-700">{description}</p>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
    {#each trainers as trainer}
      <div class="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
        <img src={trainer.photo} alt={trainer.name} class="w-40 h-40 rounded-full object-cover mb-4" />
        <h2 class="text-xl font-semibold mb-2">{trainer.name}</h2>
        <p class="text-gray-600 text-center">{trainer.bio}</p>
        <button class="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 transition-colors">
          Profil megtekintése
        </button>
      </div>
    {/each}
  </div>
</section>
