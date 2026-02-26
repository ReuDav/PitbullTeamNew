<script lang="ts">
	import { goto } from "$app/navigation";
	import { _, locale } from "svelte-i18n";
	import { get } from "svelte/store";

	let videoRef: HTMLVideoElement;

	const slugMap: Record<"hu" | "en", Record<"contact" | "trainers", string>> = {
		hu: {
			contact: "kapcsolat",
			trainers: "edzok"
		},
		en: {
			contact: "contact",
			trainers: "trainers"
		}
	};

	function setStartTime() {
		if (videoRef) {
			videoRef.currentTime = 9;
			videoRef.play();
		}
	}

	function localizedPath(key: "contact" | "trainers") {
		const current = get(locale);
		const lang = current === "en" ? "en" : "hu";
		const slug = slugMap[lang]?.[key] ?? key;
		return `/${lang}/${slug}`;
	}
</script>

<div class="relative w-full min-h-screen ">
	<video
		class="absolute top-0 left-0 w-full h-full object-cover"
		bind:this={videoRef}
		on:loadedmetadata={setStartTime}
		muted
		loop
		autoplay
		playsinline
		disablePictureInPicture
	>
		<source src="/hero.mp4" type="video/mp4" />
		Your browser does not support the video tag.
	</video>

	<!-- Áttetsző sötét overlay -->
	<div class="absolute inset-0 w-full h-full bg-black/50 backdrop-blur-md z-10"></div>

	<!-- Középre igazított tartalom -->
	<div class="relative z-20 flex flex-col items-center h-screen justify-center text-white text-center px-4">
		<h1 class="text-4xl md:text-6xl font-bold mb-3 select-none">{$_('hero.title')}</h1>
		<p class="max-w-2xl text-base md:text-xl text-white/90 mb-6 select-none">{$_('hero.subtitle')}</p>
		<div class="flex gap-4">
			<button
				on:click={() => goto(localizedPath("contact"))}
				class="bg-yellow-300 hover:bg-yellow-500 text-white px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg transition-all"
			>
				{$_('hero.cta_more')}
			</button>
			<button
				on:click={() => goto(localizedPath("trainers"))}
				class="bg-white hover:bg-gray-200 text-black px-6 py-3 rounded-2xl text-lg font-semibold shadow-lg transition-all"
			>
				{$_('hero.cta_trainers')}
			</button>
		</div>
	</div>
</div>
