<script lang="ts">
    import { RecordsTable } from "$lib/records-table";
    import { DateUtil } from "$lib/date";
    import { formatValue } from "$lib/support";
    import type { SaleFull } from "$lib/types";
    export let sale: SaleFull;
</script>

<RecordsTable center>
    <svelte:fragment slot="head">
        <th>Vencimento</th>
        <th>Valor</th>
    </svelte:fragment>
    <svelte:fragment slot="body">
        {#each sale.installments as installment}    
            <tr>
                <td>{DateUtil.make(installment.due_date).format('d/m/Y')}</td>
                <td>{formatValue(installment.value)}</td>
            </tr>
        {:else}
            <tr>
                <td colspan="2">Não há parcelas geradas</td>
            </tr>
        {/each}
    </svelte:fragment>
</RecordsTable>