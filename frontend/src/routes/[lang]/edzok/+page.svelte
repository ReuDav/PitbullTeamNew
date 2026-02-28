<script>
	import PageBanner from "$lib/components/ui/PageBanner.svelte";
	import { _ } from "svelte-i18n";
  </script>
  
  <svelte:head>
	<title>{$_("navbar.trainers")} | Pitbull Team Soroksár</title>
  </svelte:head>
  
  <PageBanner 
	imageUrl="https://images.unsplash.com/photo-1591117207239-788bf8de6c3b?q=80&w=1173&auto=format&fit=crop" 
	title={$_("navbar.trainers")} 
  />