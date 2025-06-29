<script lang="ts">
	import { _ } from "svelte-i18n";
	import { locale, locales } from "svelte-i18n";
	import { Hamburger } from "svelte-hamburgers";
	import { goto } from "$app/navigation";

	let open = $state(false);
</script>

<header class="flex items-center p-4 justify-between h-28 z-50 fixed top-0 w-full md:text-black text-white md:bg-transparent bg-black/50">
	<a href="/" class="w-20">
		<img src="https://www.pitbullteam.hu/assets/PitbullLogo-DoTHi51I.svg" alt="Logo" />
	</a>

	<div
		id="grid"
		class="grid md:bg-transparent bg-black/50 md:grid-rows-[1fr] grid-rows-[0fr] md:static absolute z-50 md:top-0 top-28 left-0 w-full transition-[grid-template-rows] duration-500 ease-in-out"
		class:grid-rows-[1fr]={open}
	>
		<div class="grid-inner">
			<nav class="flex flex-col md:flex-row items-center justify-between py-4 gap-4 w-full">
				<ul class="flex flex-col md:flex-row items-center gap-2 w-full justify-end">
					<li class="font-bold md:w-auto w-full block text-center">
						<span
							on:click={() => { open = false; goto($_("links.homepage"), { replaceState: true }); }}
							class="p-4 block cursor-pointer"
						>
							{$_("navbar.home")}
						</span>
					</li>
					<li class="font-bold md:w-auto w-full block text-center">
						<span
							on:click={() => { open = false; goto($_("links.trainers"), { replaceState: true }); }}
							class="p-4 block cursor-pointer"
						>
							{$_("navbar.trainers")}
						</span>
					</li>
					<li class="font-bold md:w-auto w-full block text-center">
						<span
							on:click={() => { open = false; goto($_("links.gallery"), { replaceState: true }); }}
							class="p-4 block cursor-pointer"
						>
							{$_("navbar.gallery")}
						</span>
					</li>
					<li class="font-bold md:w-auto w-full block text-center">
						<span
							on:click={() => { open = false; goto($_("links.contact"), { replaceState: true }); }}
							class="p-4 block cursor-pointer"
						>
							{$_("navbar.contact")}
						</span>
					</li>
				</ul>

				<select bind:value={$locale}>
					{#each $locales as loc}
						<option value={loc}>{loc.toUpperCase()}</option>
					{/each}
				</select>
			</nav>
		</div>
	</div>

	<div class="md:hidden relative z-50">
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
