<script>
  import Dashboard from "$lib/components/dashboard.svelte";
  import { ethers } from "ethers";
  import {metamask} from "$lib/stores/metamaskStore"
import "../app.postcss";
  
  let toggleApp = true;

  const connectWallet = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    $metamask = await provider.getSigner().getAddress();
    toggleApp = true;
  }

  $:{
    console.log($metamask);
  }
</script>

<button on:click={() => toggleApp = !toggleApp} class=" {toggleApp ? "hidden" : "fixed"} top-[50%] left-[50%] bg-white h-20 rounded-r-full w-10 text-neutral-700 flex items-center text-xl">►</button>
<div class="flex flex-row w-full h-screen">
 <div class="{toggleApp ? "flex-1" : "w-1/2"} bg-white flex flex-col h-full">
  <nav class="flex h-10 w-full px-8 items-end justify-between sticky"><img src="/trenchlogo.svg" width="32" height="32" alt=""> {#if $metamask} <button class="bg-green-700 text-white rounded-md px-5">{$metamask.substring(0, 10)}...</button> {/if}</nav>
  <div class="w-full flex-1">
    <div class="h-full flex justify-center items-center">
      {#if !$metamask}
      <button on:click={connectWallet} class="outline px-[15%] pb-4 outline-neutral-200 rounded-md flex flex-col justify-center items-center">
        <img src="/MetaMask_Fox.png" width="200" height="200" alt="">
        <p class="text-neutral-600 font-semibold">Connect to Metamask</p>
      </button>
      {:else}
      {#if toggleApp}
      <Dashboard></Dashboard>
      {:else}
      <img class="pr-8" src="/skeleton.png" alt="">
      {/if}
      {/if}
    </div>
  </div>
  
 </div>
 <div class="{toggleApp ? "w-[40px]" : "w-1/2"} bg-neutral-100 flex flex-col h-full">
  {#if toggleApp}
  <button on:click={() => toggleApp = !toggleApp} class="flex justify-center w-full mt-2">
    <img src="https://img.icons8.com/ios-filled/100/000000/menu-rounded.png" width="24" height="24"/>
  </button>
  {:else}
  <nav class="sticky gap-6 flex items-end text-neutral-500 justify-end px-8 h-10 w-full">
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/">How to</a>
    <!-- <a href="/">Community</a> -->
  </nav>
  <div class="flex-1  h-full w-full">
    <div class="flex justify-center items-center h-full w-full">
      <div class="overflow-y-scroll text-neutral-500 px-20 py-4 h-[65%] w-[80%]">
        <slot />
      </div>
    </div>
    
  </div>
  {/if}
  
</div>
</div>

