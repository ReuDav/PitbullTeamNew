<script lang="ts">
  export let title: string = "Galéria";
  export let description: string = "Nézd meg az edzőterem és edzéseink pillanatait!";
  
  const images = [
  "https://images.unsplash.com/photo-1554288242-0c5c5eaf8f43?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1571019613914-85f342c49f68?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1611905863213-0e2c772be22f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1611711726181-6cc0bbf37b3c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1576675783978-cb9adbb4656b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1583454110551-21f2fa2fbd4c?auto=format&fit=crop&w=800&q=80"
];

</script>

<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <div class="text-center mb-12">
    <h1 class="text-4xl font-extrabold text-gray-900 mb-4">{title}</h1>
    <p class="text-lg text-gray-600">{description}</p>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {#each images as img, index}
      <div class="overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <img
          src={img}
          alt={`Galéria kép ${index + 1}`}
          class="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    {/each}
  </div>
</section>
