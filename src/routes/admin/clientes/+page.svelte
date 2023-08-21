<script lang="ts">
    import type { PageData } from "./$types";
    import { RecordsTable, actions } from "$lib/records-table";
    import { Pagination } from "$lib/pagination";
    import { invalidateAll } from "$app/navigation";
    import { Link } from "$lib/link";
    export let data: PageData;

    async function reload(): Promise<boolean>
    {
        invalidateAll();
        return true;
    }
</script>

<svelte:head>
    <title>Clientes | Teste DC</title>
</svelte:head>

<main id="app-main">
    <h1>Clientes</h1>
    <RecordsTable center>
        <svelte:fragment slot="head">
            <th>Código</th>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Endereço</th>
            <th>Ações</th>
        </svelte:fragment>
        <svelte:fragment slot="body">
            {#if data.data.length > 0}
                {#each data.data as customer (customer.id)}
                    <tr>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                        <td>
                            <svelte:component this={actions.edit} href="/admin/clientes/{customer.id}" />
                            <svelte:component this={actions.delete} href="/customers/{customer.id}" callback={reload} />
                        </td>
                    </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan="5">Nenhum registro encontrado</td>
                </tr>
            {/if}
        </svelte:fragment>
    </RecordsTable>

    <Pagination meta={data.meta} links={data.links} />
</main>

<aside id="app-aside">
    <Link href="/admin/clientes/cadastrar">
        Adicionar novo
    </Link>
</aside>