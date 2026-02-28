<script>
	import { _ } from 'svelte-i18n';

	let images = [
		{
			src: '/image-1.webp',
			alt: 'Boxing match',
			class: 'lg:col-span-4 lg:row-span-2',
			key: 'gallery.power' // Translation key
		},
		{
			src: '/image-2.webp',
			alt: 'Side view 1',
			class: 'lg:col-span-2 lg:row-span-1',
			key: 'gallery.speed'
		},
		{
			src: '/image-3.webp',
			alt: 'Side view 2',
			class: 'lg:col-span-2 lg:row-span-1',
			key: 'gallery.focus'
		},
		{
			src: '/image-4.webp',
			alt: 'Bottom left',
			class: 'lg:col-span-3 lg:row-span-1',
			key: 'gallery.grit'
		},
		{
			src: '/image-5.webp',
			alt: 'Bottom right',
			class: 'lg:col-span-3 lg:row-span-1',
			key: 'gallery.victory'
		}
	];
</script>

<div class="container mx-auto bg-white p-4 text-center">
	<h2 class="title">{$_('gallery.title')}</h2>
	<p class="mb-8 text-lg text-gray-600">{$_('gallery.description')}</p>
	<div class="grid auto-rows-[300px] grid-cols-1 gap-4 lg:grid-cols-6">
		{#each images as { src, alt, class: gridClass, key }}
			<div class="group relative overflow-hidden rounded-2xl bg-zinc-900 {gridClass}">
				<img
					{src}
					{alt}
					class="h-full w-full object-cover grayscale transition-all duration-1000 ease-in-out group-hover:scale-110 group-hover:grayscale-0"
					loading="lazy"
				/>

				<div
					class="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
				>
					<span
						class="text-3xl font-black text-white uppercase italic drop-shadow-lg transition-all duration-500 group-hover:scale-110"
					>
						{$_(key)}
					</span>
				</div>
			</div>
		{/each}
	</div>
</div>

<style>
	.title {
		text-align: center;
		font-size: 1.75rem;
		font-weight: 800;
		margin: 0 auto 1.5rem;
		color: #111827;
	}
</style>
