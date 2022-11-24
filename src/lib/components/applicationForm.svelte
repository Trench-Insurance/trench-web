<script>
  import { wallet } from "$lib/stores/walletStore";
  import { account, contract } from "$lib/stores/walletStore";

  let iValue = 0;
  let month = 1;
  let basePremium = 175;
  let applied = false;

  const applyInsurance = async () => {
    try {
      await $contract.applyForInsurance({_value: iValue, _months: month});
      applied = true;
    } catch (err) {
      console.log(err)
    }
  }

  const getPredictions = async () => {
    const res = await fetch(
      "https://trench-backend.herokuapp.com/predict?month=12"
    );
    // console.log(res.json())
    return res.json();
  };

</script>

<div class="flex flex-col gap-4 h-full">
  <h1>DEMO CONTROLS</h1>
  <div class="flex flex-row items-end gap-2">
    <div class="w-full">
      <h3>Base Premium Rate</h3>
      <input bind:value={basePremium} type="number" />
    </div>
    <button class="bg-blue-600 text-white rounded-md text-sm px-3 py-1 h-8"
      >Change</button
    >
  </div>
  <div>
    <div class="w-full flex justify-between">
      <h3>Old Predictions</h3>
    </div>
    <div class="flex flex-row rounded-xl gap-2 ">
      {#await $contract.getInflationRates()}
        <div class=" h-full flex flex-row w-full px-2 py-2">
          <p>Getting Data...</p>
        </div>
      {:then res}
        <select class="bg-neutral-200">
          {#each res as item}
            <option
              >{Math.trunc(item)/100}% - {res.indexOf(item) + 1} month ahead</option
            >
          {/each}
        </select>
      {/await}
    </div>
  </div>

  <div>
    <div class="w-full flex justify-between">
      <h3>New Predictions</h3>
      <a
        class="underline text-sm"
        href="https://trench-backend.herokuapp.com/predict?month=12">View API</a
      >
    </div>
    <div class="flex flex-row rounded-xl gap-2 ">
      {#await getPredictions()}
        <div class=" h-full flex flex-row w-full px-2 py-2">
          <p>Getting Data...</p>
        </div>
      {:then res}
        <select class="bg-neutral-200">
          {#each res as item}
            <option
              >{Math.trunc(item) / 100}% - {res.indexOf(item) + 1} month ahead</option
            >
          {/each}
        </select>
      {/await}
      <button class="bg-blue-600 text-white rounded-md text-sm px-3 py-1 h-8"
        >Apply</button
      >
    </div>
  </div>
  <div />
  <div class="flex flex-row gap-2 border-t pt-5">
    <div class="w-full">
      <h3>Asset Value</h3>
      <input bind:value={iValue} type="number" />
    </div>

    <div class="w-full">
      <h3>Select Token</h3>
      <select class="w-full">
        <option value="NEAR">NEAR</option>
      </select>
    </div>
    
  </div>
  <div>
    <h3>Insurance Period (In Months)</h3>
    <input bind:value={month} type="number" />
  </div>
  <div class="flex-grow" />
  <button on:click={applyInsurance} class="{applied ? "bg-green-600": "bg-blue-700"} text-white rounded-md py-2">{applied?"Applied" : "Apply Insurance"}</button>
</div>

<style>
  p {
    font-size: small;
  }
  h3 {
    font-weight: 500;
  }
  h1 {
    font-weight: 700;
  }
  input,
  select {
    width: 100%;
    border-radius: 6px;
    box-sizing: border-box;
    background-color: rgb(237, 237, 237);
    padding-top: 2px;
    padding-bottom: 2px;
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
</style>
