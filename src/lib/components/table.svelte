<script>
  import { account, contract } from "$lib/stores/walletStore";
  let month = 1;
  let value = 100;
  let premium;
  let error;

  const getPremium = async () => {
    try {
      premium = await $contract.calcPremium({ value: value, month: month });
      error = false;
    } catch (err) {
      error = err;
    }
  };
</script>

<div class="w-full h-full flex flex-col px-4 py-2 ">
  <h1>Get Quote</h1>
  <p class="mt-4">Asset Value</p>
  <input
    class="bg-neutral-200 rounded-md w-full px-2 py-1"
    bind:value
    type="number"
  />
  <p class="mt-4">Insurance Period</p>
  <input
    class="bg-neutral-200 rounded-md w-full px-2 py-1"
    min="1"
    max="12"
    bind:value={month}
    type="number"
  />
  <div class="flex-grow" />
  {#if premium}
  <div class="gap-1 grid grid-cols-2 mt-4 border-t">
    <div class="py-2">
      <p>Premium: N {premium}</p>
    </div>
  </div>
  {/if}
  {#if error}
  <div class="gap-1 grid grid-cols-2 mt-4 border-t">
    <div class="py-2">
      <p class="text-red-800">{error}</p>
    </div>
  </div>
  {/if}
  <button on:click={getPremium} class="bg-blue-700 text-white rounded-md py-2 mb-2">Get Quote</button>
</div>

<style>
  h1 {
    font-weight: 800;
  }
</style>
