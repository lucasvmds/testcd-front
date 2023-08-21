<script lang="ts">
    import type { PageData } from "./$types";
    import { RecordsTable, actions } from "$lib/records-table";
    import { Pagination } from "$lib/pagination";
    import { invalidateAll } from "$app/navigation";
    import { Link } from "$lib/link";
    import { formatValue as format } from "$lib/support";
    import { DateUtil } from "$lib/date";
    export let data: PageData;

    async function reload(): Promise<boolean>
    {
        invalidateAll();
        return true;
    }
</script>

<svelte:head>
    <title>Vendas | Teste DC</title>
</svelte:head>

<main id="app-main">
    <h1>Vendas</h1>
    <RecordsTable center>
        <svelte:fragment slot="head">
            <th>Código</th>
            <th>Cliente</th>
            <th>Vendedor</th>
            <th>Valor</th>
            <th>Nº Produtos</th>
            <th>Nº Parcelas</th>
            <th>Data/hora</th>
            <th>Ações</th>
        </svelte:fragment>
        <svelte:fragment slot="body">
            {#if data.data.length > 0}
                {#each data.data as sale (sale.id)}
                    <tr>
                        <td>{sale.id}</td>
                        <td>{sale.customer ?? '-'}</td>
                        <td>{sale.user}</td>
                        <td>{format(sale.total)}</td>
                        <td>{sale.products_count}</td>
                        <td>{sale.installments_count}</td>
                        <td>{DateUtil.make(sale.created_at).format('d/m/Y H:i')}</td>
                        <td>
                            <svelte:component this={actions.show} href="/admin/vendas/{sale.id}" />
                            <svelte:component this={actions.delete} href="/sales/{sale.id}" callback={reload} />
                        </td>
                    </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan="8">Nenhum registro encontrado</td>
                </tr>
            {/if}
        </svelte:fragment>
    </RecordsTable>

    <Pagination meta={data.meta} links={data.links} />
</main>

<aside id="app-aside">
    <Link href="/admin/vendas/cadastrar">
        Adicionar nova
    </Link>
</aside>