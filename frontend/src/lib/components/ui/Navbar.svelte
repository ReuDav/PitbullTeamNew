<script lang="ts">
	import { _, locale, locales } from 'svelte-i18n';
	import { Hamburger } from 'svelte-hamburgers';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';

	let open = false;

	const slugMap = {
		en: {
			kapcsolat: 'contact',
			edzok: 'trainers',
			edzo: 'trainer',
			galeria: 'gallery',
			fooldal: '',
			kami: 'kami',
			bela: 'bela',
			sosi: 'sosi'
		},
		hu: {
			contact: 'kapcsolat',
			trainers: 'edzok',
			trainer: 'edzo',
			gallery: 'galeria',
			homepage: '',
			kami: 'kami',
			bela: 'bela',
			sosi: 'sosi'
		}
	};

	// Reaktívan figyeljük az URL prefixet
	$: {
		const path = $page.url.pathname;
		const prefix = path.split('/')[1];

		if (prefix === 'hu' || prefix === 'en') {
			locale.set(prefix);
		}
	}

	// Segédfüggvény: hozzáadja az aktuális nyelvi prefixet
	function nav(path: string): string {
		const lang = get(locale);
		return `/${lang}${path}`;
	}
</script>

<header
	class="font text-2xl fixed top-0 z-50 flex h-28 w-full items-center justify-between bg-black/50 p-4 text-white md:bg-transparent"
>
	<a href="/" class="w-20">
		<img src="https://www.pitbullteam.hu/assets/PitbullLogo-DoTHi51I.svg" alt="Logo" />
	</a>

	<div
		id="grid"
		class="absolute left-0 top-28 z-50 grid w-full grid-rows-[0fr] bg-black/50 transition-[grid-template-rows] duration-500 ease-in-out md:static md:top-0 md:grid-rows-[1fr] md:bg-transparent"
		class:grid-rows-[1fr]={open}
	>
		<div class="grid-inner">
			<nav class="flex w-full flex-col items-center justify-between gap-4 py-4 md:flex-row">
				<ul class="flex w-full flex-col items-center justify-end gap-2 md:flex-row">
					<li class="block w-full text-center font-bold md:w-auto">
						<button
							type="button"
							class="block w-full cursor-pointer p-4 text-left md:text-center"
							role="link"
							onclick={() => {
								open = false;
								goto(nav($_('links.homepage')), { replaceState: true });
							}}
						>
							{$_('navbar.home')}
						</button>
					</li>
					<li class="block w-full text-center font-bold md:w-auto">
						<button
							type="button"
							class="block w-full cursor-pointer p-4 text-left md:text-center"
							role="link"
							onclick={() => {
								open = false;
								goto(nav($_('links.trainers')), { replaceState: true });
							}}
						>
							{$_('navbar.trainers')}
						</button>
					</li>
					<li class="block w-full text-center font-bold md:w-auto">
						<button
							type="button"
							class="block w-full cursor-pointer p-4 text-left md:text-center"
							role="link"
							onclick={() => {
								open = false;
								goto(nav($_('links.gallery')), { replaceState: true });
							}}
						>
							{$_('navbar.gallery')}
						</button>
					</li>
					<li class="block w-full text-center font-bold md:w-auto">
						<button
							type="button"
							class="block w-full cursor-pointer p-4 text-left md:text-center"
							role="link"
							onclick={() => {
								open = false;
								goto(nav($_('links.contact')), { replaceState: true });
							}}
						>
							{$_('navbar.contact')}
						</button>
					</li>
				</ul>

<div class="relative inline-flex gap-2">
	{#each $locales as loc}
		<button
			class="rounded-full w-8 h-8 overflow-hidden border-2 border-white/70 hover:border-white focus:outline-none focus:ring"
			onclick={() => {
				if (loc !== $locale) {
					const currentPath = window.location.pathname;
					const segments = currentPath.split('/').filter(Boolean);
					const rest = segments.slice(1);
					const translated = rest.map((slug) => slugMap[loc]?.[slug] ?? slug);
					const newPath = `/${loc}/${translated.join('/')}`;
					locale.set(loc);
					goto(newPath, { replaceState: true });
				}
			}}
		>
			<img
				src={`/icons/${loc}.svg`}
				alt={loc}
				class="w-full h-full object-cover transition duration-300 ease-in-out {loc !== $locale ? '' : 'grayscale opacity-70'}"
			/>
		</button>
	{/each}
</div>


			</nav>
		</div>
	</div>

	<div class="relative z-50 md:hidden">
		<Hamburger bind:open type="collapse" title="Toggle menu" />
	</div>
</header>

<style>
	.grid-inner {
		overflow: hidden;
	}

	select {
		min-width: 40px;
	}
</style>
