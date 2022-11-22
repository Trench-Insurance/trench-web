<script>
    import { wallet } from "$lib/stores/walletStore";

    let iValue = 0;
    let basePremium = 175;
    let selectedInflation = 125;
    let selectedMonth = 3;

   
    const terms = [3, 6, 12];
</script>


<div class="flex flex-col gap-4 h-full">
    <div>
        <h3>Insured Asset Value</h3>
        <input bind:value={iValue} type="number" />
    </div>

    <div>
        <h3>Select Token</h3>
        <select>
            <option value="NEAR">NEAR</option>
        </select>
    </div>

    <div>
        <h3>Base Premium Rate</h3>
        <input disabled={true} value={175 / 100} type="number" />
    </div>

    <div>
        <h3>Available Packages</h3>
        <div class="flex flex-col rounded-xl bg-neutral-200">
            {#each terms as term}
                <div class=" h-full flex flex-row w-full px-2 py-2">
                    <p>{term} Months</p>
                    <p>Inflation Rate</p>
                    <p>Premium Rate</p>
                </div>
            {/each}
        </div>
    </div>
    <div class="flex-grow" />
    <button class="bg-blue-700 text-white rounded-md py-2">Submit</button>
</div>

<style>
    p {
        font-size: small;
    }
    h3 {
        font-weight: 600;
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
