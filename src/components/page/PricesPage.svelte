<script lang="ts">
  export let title: string;
  export let info: string;

  const prices = [
    { service: "Személyi edzés (60 perc)", price: "8000 Ft" },
    { service: "Csoportos edzés (60 perc)", price: "4000 Ft" },
    { service: "Táplálkozási tanácsadás", price: "12000 Ft" },
    { service: "Online edzésprogram", price: "15000 Ft" }
  ];
</script>

<section class="max-w-4xl mx-auto p-6 my-12 bg-white rounded-lg shadow-lg">
  <h1 class="text-4xl font-extrabold mb-6 text-center">{title}</h1>
  <p class="text-center text-gray-700 mb-10">{info}</p>

  <table class="w-full text-left border-collapse">
    <thead>
      <tr class="border-b border-gray-300">
        <th class="py-3 px-4 font-semibold">Szolgáltatás</th>
        <th class="py-3 px-4 font-semibold">Ár</th>
      </tr>
    </thead>
    <tbody>
      {#each prices as p}
        <tr class="border-b border-gray-200 hover:bg-gray-50 transition-colors">
          <td class="py-4 px-4">{p.service}</td>
          <td class="py-4 px-4 font-semibold">{p.price}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>
