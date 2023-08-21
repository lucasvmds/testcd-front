<script lang="ts">
    import { RecordsTable } from "$lib/records-table";
    import { DateUtil } from "$lib/date";
    import { formatValue } from "$lib/support";
    import type { SaleFull } from "$lib/types";
    export let sale: SaleFull;
</script>

<RecordsTable center>
    <svelte:fragment slot="head">
        <th>Cliente</th>
        <th>Vendedor</th>
        <th>Total</th>
        <th>Data/hora</th>
    </svelte:fragment>
    <svelte:fragment slot="body">
        <tr>
            <td>{sale.customer ?? '-'}</td>
            <td>{sale.user}</td>
            <td>{formatValue(sale.total)}</td>
            <td>{DateUtil.make(sale.created_at).format('d/m/Y H:i')}</td>
        </tr>
    </svelte:fragment>
</RecordsTable>