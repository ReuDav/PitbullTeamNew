<script lang="ts">
	export let title: string;
	export let imageUrl: string;
</script>

<section class="relative w-full lg:h-[calc(50vh_+_1.5rem)] h-[calc(25vh_+_1.5rem)] overflow-hidden flex items-center justify-center">
	<!-- háttér -->
	<div
		class="absolute inset-0 bg-center bg-cover filter blur-sm scale-105"
		style={`background-image: url(${imageUrl}); mask-image: url('/mask.svg'); mask-size: 100% 100%; mask-repeat: no-repeat;`}
	></div>

	<!-- szöveg -->
	<h1 class="relative z-10 text-white md:text-8xl text-6xl mb-16 font font-bold text-center drop-shadow-xl px-4">
		{title}
	</h1>
</section>
