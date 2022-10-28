<script>
  import "../app.postcss";
</script>

<div class="fixed top-[50%] left-[50%] bg-neutral-800 h-20 rounded-r-full w-10 text-white flex items-center  text-xl">➔</div>
<div class="grid grid-cols-4 w-full h-screen">
 <div class="col-span-2 bg-neutral-800">

 </div>
 <div class="col-span-2 bg-orange-100 ">
  <nav class="sticky gap-6 flex items-end justify-end px-8 py-4 w-full">
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

