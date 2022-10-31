<script>
  import "../app.postcss";
</script>

<div class="fixed top-[50%] left-[50%] bg-white h-20 rounded-r-full w-10 text-neutral-700 flex items-center text-xl">►</div>
<div class="grid grid-cols-4 w-full h-screen">
 <div class="col-span-2 bg-white flex flex-col h-full">
  <nav class="flex h-10 w-full px-8 items-end sticky"><img src="/trenchlogo.svg" width="32" height="32" alt=""></nav>
  <div class="w-full flex-1">
    <div class="h-full flex justify-center items-center">
      <div class="outline px-[15%] pb-4 outline-neutral-200 rounded-md flex flex-col justify-center items-center">
        <img src="/MetaMask_Fox.png" width="200" height="200" alt="">
        <p class="text-neutral-600 font-semibold">Connect to Metamask</p>
      </div>
    </div>
  </div>
  
 </div>
 <div class="col-span-2 bg-neutral-100 ">
  <nav class="sticky gap-6 flex items-end justify-end px-8 h-10 w-full">
    <a href="/">Home</a>
    <a href="/">About</a>
    <a href="/">How to</a>
    <a href="/">Community</a>
  </nav>
  <div class="flex justify-center items-center h-[100%-56px]">
    <div class="overflow-y-scroll px-20 py-8 h-[65%]">
    <slot />
  </div>
  </div>
  
</div>
</div>

