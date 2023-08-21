<script lang="ts">
    import { RecordsTable } from "$lib/records-table";
    import { formatValue } from "$lib/support";
    import type { SaleFull } from "$lib/types";
    export let sale: SaleFull;
</script>

<RecordsTable center>
    <svelte:fragment slot="head">
        <th>Nome</th>
        <th>Quantidade</th>
        <th>Valor</th>
        <th>Total</th>
    </svelte:fragment>
    <svelte:fragment slot="body">
        {#each sale.products as product}    
            <tr>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{formatValue(product.value)}</td>
                <td>{formatValue(product.total)}</td>
            </tr>
        {/each}
    </svelte:fragment>
</RecordsTable>