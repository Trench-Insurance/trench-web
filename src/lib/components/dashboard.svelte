<script>
    import ApplicationForm from "./applicationForm.svelte";
    import Table from "./table.svelte";

</script>
<div class=" flex flex-col h-full w-full py-8 mx-8">
    <div class="grid grid-cols-3 gap-2 h-32 w-full ">
      <div class="col-span-1 rounded-md justify-center px-14 w-full flex flex-col bg-neutral-100">
        <p class="text-neutral-500">Paid Premium</p>
        <p class="text-neutral-800 text-4xl font-bold">$32,000</p>
      </div>
      <div class="col-span-1 rounded-md justify-center px-14 w-full flex flex-col bg-neutral-100">
        <p class="text-neutral-500">Claimable</p>
        <p class="text-neutral-800 text-4xl font-bold">$24,000</p>
      </div>
      <div class="col-span-1 rounded-md justify-center px-14 w-full flex flex-col bg-neutral-100">
        <p class="text-neutral-500">Policy Expiry</p>
        <p class="text-neutral-800 text-4xl font-bold">June 10th, 2022</p>
      </div>
      
    </div>
    <div class="grid grid-cols-3 gap-2 rounded-md mt-4 h-full w-full ">
      <div class="bg-neutral-100 rounded-md p-4">
        <ApplicationForm></ApplicationForm>
      </div>
      <div class="bg-neutral-100 col-span-2 rounded-md">
        <Table></Table>
      </div>
    </div>
  </div>