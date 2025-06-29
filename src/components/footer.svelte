<script lang="ts">
  import { _ } from 'svelte-i18n';
</script>

<footer class="bg-gray-900 text-gray-300 py-12">
  <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

    <!-- Logo és rövid felhívás -->
    <div class="flex flex-col items-center md:items-start space-y-4 w-full">
      <img src="/logo.svg" alt="Pitbull Team Logo" class="h-16 w-auto" />
      <p class="text-sm text-gray-400">
        {$_('footer.followus')}
      </p>
      <div class="flex space-x-4">
        <!-- Facebook -->
        <a
          href="https://www.facebook.com/pages/Soroks%C3%A0r%20Pitbull%20Team/161888670621877/"
          target="_blank"
          rel="noopener"
          class="hover:opacity-80"
        >
          <img src="/icons/facebook.svg" alt="Facebook" class="h-6 w-6" />
        </a>
        <!-- Maps -->
        <a
          href="https://www.google.com/maps/place/Pit+Bull+team+Soroks%C3%A1r/"
          target="_blank"
          rel="noopener"
          class="hover:opacity-80"
        >
          <img src="/icons/maps.svg" alt="Google Maps" class="h-6 w-6" />
        </a>
      </div>
    </div>

    <!-- Navigációs linkek -->
    <div class="flex flex-col items-center space-y-2 w-full">
      <h4 class="text-lg font-semibold text-white">{$_('navbar.home')}</h4>
      <ul class="space-y-1">
        <li><a href={$_('links.homepage')} class="hover:text-white">{$_('navbar.home')}</a></li>
        <li><a href={$_('links.trainers')} class="hover:text-white">{$_('navbar.trainers')}</a></li>
        <li><a href={$_('links.gallery')} class="hover:text-white">{$_('navbar.gallery')}</a></li>
        <li><a href={$_('links.contact')} class="hover:text-white">{$_('navbar.contact')}</a></li>
      </ul>
    </div>

    <!-- Nyitvatartási idők -->
    <div class="flex flex-col items-center md:items-start space-y-2 w-full">
      <h4 class="text-lg font-semibold text-white">{$_('footer.opening_hours')}</h4>
      <ul class="text-sm text-gray-400">
        <li>{$_('footer.morning_training')}</li>
        <li>{$_('footer.evening_hours')}</li>
        <li>{$_('footer.saturday_training')}</li>
        <li>{$_('footer.closed')}</li>
      </ul>
    </div>

  </div>

  <!-- Alsó sor -->
  <div class="mt-12 border-t border-gray-700 pt-6">
    <p class="text-center text-xs text-gray-500">
      {$_('footer.rights')}
    </p>
  </div>
</footer>
