<script>
  import Dashboard from "$lib/components/dashboard.svelte";

  import { account } from "$lib/stores/walletStore";
  import "../app.postcss";
  import { initContract } from "$lib/js/caller";
  export const prerender = true
  export const ssr = false
  let toggleApp = false;

</script>

<button
  on:click={() => (toggleApp = !toggleApp)}
  class=" {toggleApp
    ? 'hidden'
    : 'fixed'} top-[50%] left-[50%] bg-white h-20 rounded-r-full w-10 text-neutral-700 flex items-center text-xl"
  >►</button
>
<div class="flex flex-row w-full h-screen">
  <div class="{toggleApp ? 'flex-1' : 'w-1/2'} bg-white flex flex-col h-full">
    <nav class="flex h-10 w-full px-8 items-end justify-between sticky">
      <img src="/trenchlogo.svg" width="32" height="32" alt="" />
      {#if $account}
        <button class="bg-blue-700 text-white rounded-md px-5"
          >{$account.accountId}</button
        >
      {/if}
    </nav>
    <div class="w-full flex-1">
      <div class="h-full flex justify-center items-center">
        {#if !$account}
          <button
            on:click={async () => {
              await initContract();
              // $wallet = await selector.wallet();
            }}
            class="outline px-[15%] pb-4 outline-neutral-200 rounded-md flex flex-col justify-center items-center"
          >
            <img
              src="/near_icon.png"
              class="opacity-80"
              width="200"
              height="200"
              alt=""
            />
            <p class="text-neutral-400 font-semibold">
              Connect to Near Network
            </p>
          </button>
        {:else if toggleApp}
          <Dashboard />
        {:else}
          <img class="pr-8" src="/skeleton.png" alt="" />
        {/if}
      </div>
    </div>
  </div>
  <div
    class="{toggleApp
      ? 'w-[40px]'
      : 'w-1/2'} bg-neutral-100 flex flex-col h-full"
  >
    {#if toggleApp}
      <button
        on:click={() => (toggleApp = !toggleApp)}
        class="flex justify-center w-full mt-2"
      >
        <img
          src="https://img.icons8.com/ios-filled/100/000000/menu-rounded.png"
          width="24"
          height="24"
        />
      </button>
    {:else}
      <div class="flex-1  h-full w-full">
        <div class="flex justify-center items-center h-full w-full">
          <div
            class="overflow-y-scroll text-neutral-500 px-20 py-4 h-[65%] w-[80%]"
          >
            <slot />
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>
