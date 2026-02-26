<script lang="ts">
	import { _ } from 'svelte-i18n';
</script>

<section class="relative max-h-[55vh] min-h-[55vh] w-full overflow-hidden">
	<!-- Background Image -->
	<img
		src="/sandor-gyorgy.webp"
		alt="Sándor György"
		class="fixed inset-0 w-full h-full object-cover object-[50%_15%] -z-10"
	/>

	<!-- Dark Overlay -->
	<div class="absolute inset-0 bg-black/50"></div>

	<!-- Quote Content -->
	<div class="relative max-h-[50vh] min-h-[50vh] z-10 flex items-center justify-center h-full px-6 text-center">
		<blockquote class="max-w-4xl text-white">
			<p class="text-2xl md:text-4xl font-semibold leading-relaxed mb-6">
				“{$_('quote.sandor_gyorgy')}”
			</p>
			<footer class="text-lg md:text-xl opacity-90">
				— Sándor György
			</footer>
		</blockquote>
	</div>
</section>