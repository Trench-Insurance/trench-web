<script>
  import { account, contract } from "$lib/stores/walletStore";
  let value = 100;
  let tx;
  let inflation = 100;
  let error;

  const getInflationRates = async () => {
    inflation = await $contract.getInflationToday();
  }

  const setInflationRate = async () => {
    try {
      await $contract.changeInflationToday({newInflation: inflation})
    } catch (err) {
      error = err;
    }
  }

  const claim = async () => {
    tx = await $contract.claim({ _amount: value });
    console.log(tx);
  };
</script>

<div class="w-full h-full flex flex-col px-4 py-2 ">
  <h1>Claim Insurance</h1>
  <div class="flex flex-row items-end gap-2 mt-4">
    <div class="w-full">
      <h3>Inflation Today</h3>
      {#await getInflationRates()}
        <div class=" h-full flex flex-row w-full px-2 py-2">
          <p>Getting Data...</p>
        </div>
      {:then res}
        <input
          class="bg-neutral-200 px-2 py-1 rounded-md w-full"
          bind:value={inflation}
          type="number"
        />
      {/await}
    </div>
    <button on:click={setInflationRate} class="bg-blue-600 text-white rounded-md text-sm px-3 py-1 h-8"
      >Change</button
    >
  </div>
  <p class="mt-4">Asset Value</p>
  <input
    class="bg-neutral-200 rounded-md w-full px-2 py-1"
    bind:value
    type="number"
  />

  <div class="flex-grow" />
  {#if tx}
    <div class="gap-1 grid grid-cols-2 mt-4 border-t">
      <div class="py-2">
        <p>{tx}</p>
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

  <button on:click={claim} class="bg-blue-700 text-white rounded-md py-2 mb-2"
    >Claim Insurance</button
  >
</div>

<style>
  h1 {
    font-weight: 800;
  }
</style>
