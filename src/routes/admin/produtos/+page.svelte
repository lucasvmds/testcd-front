<script lang="ts">
    import type { PageData } from "./$types";
    import { RecordsTable, actions } from "$lib/records-table";
    import { Pagination } from "$lib/pagination";
    import { invalidateAll } from "$app/navigation";
    import { Link } from "$lib/link";
    import { formatValue as format } from "$lib/support";
    import { Messages } from "$lib/messages";
    export let data: PageData;

    type ProductInUseResponse = {
        data: {
            state: 'in_use';
        }
    }

    async function handleResponse(response: Response): Promise<boolean>
    {
        if (response.status === 204) {
            invalidateAll();
            return true;
        }
        try {
            const json: ProductInUseResponse = await response.json();
            if (json.data.state === 'in_use')
                    Messages
                        .error('Erro ao excluir produto')
                        .warning('Você não pode excluir um produto que já foivinculado a uma venda');
        } catch (error) {
            Messages.error(String(error));
        }
        return false;
    }
</script>

<svelte:head>
    <title>Produtos | Teste DC</title>
</svelte:head>

<main id="app-main">
    <h1>Produtos</h1>
    <RecordsTable center>
        <svelte:fragment slot="head">
            <th>Código</th>
            <th>Nome</th>
            <th>Valor</th>
            <th>Ações</th>
        </svelte:fragment>
        <svelte:fragment slot="body">
            {#if data.data.length > 0}
                {#each data.data as product (product.id)}
                    <tr>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{format(product.value)}</td>
                        <td>
                            <svelte:component this={actions.edit} href="/admin/produtos/{product.id}" />
                            <svelte:component this={actions.delete} href="/products/{product.id}" callback={handleResponse} />
                        </td>
                    </tr>
                {/each}
            {:else}
                <tr>
                    <td colspan=4>Nenhum registro encontrado</td>
                </tr>
            {/if}
        </svelte:fragment>
    </RecordsTable>

    <Pagination meta={data.meta} links={data.links} />
</main>

<aside id="app-aside">
    <Link href="/admin/produtos/cadastrar">
        Adicionar novo
    </Link>
</aside>