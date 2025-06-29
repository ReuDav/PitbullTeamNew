<script lang="ts">
  import { _ } from "svelte-i18n";

  export let email: string = "sandorbela.bs53@gmail.com";
  export let phone: string = "+36 30 652-7909";
  export let mapsUrl: string =
    "https://www.google.com/maps/dir/?api=1&destination=47.4263665,19.0960312";
  export let embedSrc: string =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2699.260167619586!2d19.093456276420465!3d47.42637010040583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741e9f708c762d7%3A0x12c01ea2cec9daf6!2sPit%20Bull%20team%20Soroks%C3%A1r!5e0!3m2!1shu!2shu!4v1717598588794!5m2!1shu!2shu";
</script>

<section class="md:px-16 sm:px-8 px-4 py-8 bg-slate-800" id="contact">
  <div class="grid lg:grid-cols-2 gap-8">
    <!-- Info & Directions -->
    <div class="text-slate-100 flex flex-col gap-6 justify-evenly py-8">
      <h3 class="text-4xl PITBULL-FONT text-center py-4">
        {@html $_("contact.title")}
      </h3>

      <ul class="flex flex-col gap-3">
        <li>
          {@html $_("contact.email")}:
          <a class="underline hover:text-yellow-300" href="mailto:{email}"
            >{email}</a
          >
        </li>
        <li>
          {@html $_("contact.phone")}:
          <a class="underline hover:text-yellow-300" href="tel:{phone}"
            >{phone}</a
          >
        </li>
        <li>
          {@html $_("contact.facebook")}:
          <a
            class="underline hover:text-yellow-300"
            href={$_("contact.facebookUrl")}
            target="_blank"
            rel="noopener">{@html $_("contact.facebookText")}</a
          >
        </li>
      </ul>

      <h4 class="text-3xl PITBULL-FONT text-center py-4">
        {@html $_("contact.directions")}
      </h4>

      <!-- Egyedi járatok kiszűrése duplikáció nélkül -->
      <div>
        <p>{@html $_("contact.byStation1")}</p>
        <div class="flex flex-wrap gap-2 mt-2">
          {#each Array.from(new Set($_("contact.lines1"))) as line}
            <span class="bg-blue-500 BKK-FONT font-bold px-2 rounded-md">
              {line}
            </span>
          {/each}
        </div>
      </div>

      <!-- Második megálló (szintén egyedi lista) -->
      <div>
        <p>{@html $_("contact.byStation2")}</p>
        <div class="flex flex-wrap gap-2 mt-2">
          {#each Array.from(new Set($_("contact.lines2"))) as line}
            <span
              class="{line === 'H6'
                ? 'bg-yellow-700'
                : 'bg-blue-500'} BKK-FONT font-bold px-2 rounded-md"
            >
              {line}
            </span>
          {/each}
        </div>
      </div>

      <button
        class="bg-yellow PITBULL-FONT text-slate-900 py-4 px-8 md:w-2/3 w-full my-4 rounded-3xl relative hover:bg-yellow-400"
        type="button"
      >
        <a
          class="absolute inset-0 w-full h-full grid place-content-center"
          href={mapsUrl}
          target="_blank"
          rel="noopener">{@html $_("contact.routeButton")}</a
        >
      </button>
    </div>

    <!-- Map & Optional Form -->
    <div class="space-y-8">
      <iframe
        title="Pit Bull Team Soroksár"
        src={embedSrc}
        class="w-full h-full min-h-[20rem] rounded-lg shadow-lg"
        style="border:0"
        allowfullscreen
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  </div>
</section>
