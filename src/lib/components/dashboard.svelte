<script>
  import ApplicationForm from "./applicationForm.svelte";
  import { account, contract } from "$lib/stores/walletStore";
  import * as nearAPI from "near-api-js";
  import Table from "./table.svelte";
  import ClaimForm from "./claimForm.svelte";
  const { Contract } = nearAPI;

  $contract = new Contract(
        $account, // the account object that is connecting
        "singletondev.testnet",
        {
            // name of contract you're connecting to
            viewMethods: ["getCooldown", "getInflationToday", "getInflationRates", "getInsuredAmount", "getBasePremiumRate", "getTotalInsured", "calcPremium"], // view methods do not change state but usually return a value
            changeMethods: ["applyForInsurance", "claim", "changeInflationToday", "changeBasePremium"], // change methods modify state
        }
    );
 
</script>

<div class=" flex flex-col h-full w-full py-8 mx-8">
  <div class="grid grid-cols-3 gap-2 h-32 w-full ">
    <div
      class="col-span-1 rounded-md justify-center px-14 w-full flex flex-col bg-neutral-100"
    >
      <p class="text-neutral-500">Contract Total Insured</p>
      {#await $contract.getTotalInsured()}
        <p class="text-neutral-800 text-4xl font-bold">...</p>
      {:then res}
        <p class="text-neutral-800 text-4xl font-bold flex flex-row gap-1"><img width="48" height="48" class="rounded-full" src="https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png" alt=""> {res}</p>
      {/await}
    </div>
    <div
      class="col-span-1 rounded-md justify-center px-14 w-full flex flex-col bg-neutral-100"
    >
    <p class="text-neutral-500">Today's Inflation Rate</p>
    {#await $contract.getInflationToday()}
      <p class="text-neutral-800 text-4xl font-bold">...</p>
    {:then res}
      <p class="text-neutral-800 text-4xl font-bold">{res/100}%</p>
    {/await}
    </div>
    <div
      class="col-span-1 rounded-md justify-center px-14 w-full flex flex-col bg-neutral-100"
    >
      <p class="text-neutral-500">My Insured Asset</p>
      {#await $contract.getInsuredAmount({caller:$account.accountId})}
      <p class="text-neutral-800 text-4xl font-bold">...</p>
    {:then res}
    <p class="text-neutral-800 text-4xl font-bold flex flex-row gap-1"><img width="48" height="48" class="rounded-full" src="https://s2.coinmarketcap.com/static/img/coins/64x64/6535.png" alt=""> {res}</p>
    {/await}
    </div>
  </div>
  <div class="grid grid-cols-3 gap-2 rounded-md mt-4 h-full w-full ">
    <div class="bg-neutral-100 rounded-md p-4">
      <ApplicationForm />
    </div>
    <div class="bg-neutral-100 rounded-md">
      <Table />
    </div>
    <div class="bg-neutral-100  rounded-md">
      <ClaimForm></ClaimForm>
    </div>
  </div>
</div>
