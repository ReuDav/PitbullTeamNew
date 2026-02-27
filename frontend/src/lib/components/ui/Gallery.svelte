<script>
    import Carousel from "svelte-carousel";
    import { _, locale } from "svelte-i18n";
    import { onMount } from "svelte";
  
    let images = [
      { src: 'img-1.avif', key: 'gallery.power', class: 'lg:col-span-4 lg:row-span-2' },
      { src: 'img-2.avif', key: 'gallery.speed', class: 'lg:col-span-2 lg:row-span-1' },
      { src: 'img-3.avif', key: 'gallery.focus', class: 'lg:col-span-2 lg:row-span-1' },
      { src: 'img-4.avif', key: 'gallery.grit', class: 'lg:col-span-3 lg:row-span-1' },
      { src: 'img-5.avif', key: 'gallery.victory', class: 'lg:col-span-3 lg:row-span-1' },
      { src: 'img-6.avif', key: 'gallery.beast', class: 'lg:col-span-2 lg:row-span-2' },
      { src: 'img-7.avif', key: 'gallery.shadow', class: 'lg:col-span-2 lg:row-span-1' },
      { src: 'img-8.avif', key: 'gallery.light', class: 'lg:col-span-2 lg:row-span-1' },
      { src: 'img-9.avif', key: 'gallery.flow', class: 'lg:col-span-4 lg:row-span-1' },
      { src: 'img-10.avif', key: 'gallery.peak', class: 'lg:col-span-2 lg:row-span-1' },
      { src: 'img-11.avif', key: 'gallery.soul', class: 'lg:col-span-3 lg:row-span-1' },
      { src: 'img-12.avif', key: 'gallery.end', class: 'lg:col-span-1 lg:row-span-1' },
    ];
  
    // Svelte 5 Runes
    let isDesktop = $state(false);
    let itemsToShow = $state(1);
  
    function handleResize() {
      const width = window.innerWidth;
      isDesktop = width >= 1024;
      
      if (width < 768) {
        itemsToShow = 1; // Mobile: 1 image visible
      } else {
        itemsToShow = 2; // Tablet: 2 images visible
      }
    }
  
    onMount(() => {
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    });
  </script>
  
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
        
      {#if !isDesktop}
        <div class="w-full">
          <Carousel 
            autoplay={true} 
            autoplayDuration={4000} 
            dots={false} 
            particlesToShow={itemsToShow}
            particlesToScroll={1}
          >
            {#each images as img}
              <div class="px-2 outline-none">
                <div class="relative overflow-hidden rounded-3xl aspect-[4/5] bg-zinc-900 group cursor-grab active:cursor-grabbing">
                  <img 
                    src="/gallery/{img.src}" 
                    alt={img.key} 
                    class="h-full w-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" 
                  />
                  <div class="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                    <span class="text-white text-3xl font-black italic uppercase drop-shadow-md">
                      {$_(img.key)}
                    </span>
                  </div>
                </div>
              </div>
            {/each}
          </Carousel>
        </div>
      {:else}
        <div class="grid grid-cols-6 gap-4 auto-rows-[280px]">
          {#each images as img}
            <div class="group relative overflow-hidden rounded-3xl bg-zinc-900 {img.class}">
              <img
                src="/gallery/{img.src}"
                alt={img.key}
                class="h-full w-full object-cover grayscale transition-all duration-1000 ease-in-out group-hover:grayscale-0 group-hover:scale-110"
                loading="lazy"
              />
              <div class="absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity duration-700 group-hover:opacity-100 backdrop-blur-[2px]">
                <span class="text-white text-5xl font-black italic uppercase tracking-tighter drop-shadow-2xl text-center px-4">
                  {$_(img.key)}
                </span>
              </div>
            </div>
          {/each}
        </div>
      {/if}
    </div>
  </section>