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
    <title>Usuários | Teste DC</title>
</svelte:head>

<main id="app-main">
    <h1>Usuários</h1>
    <RecordsTable center>
        <svelte:fragment slot="head">
            <th>Código</th>
            <th>Nome</th>
            <th>E-Mail</th>
            <th>Grupo</th>
            <th>Ações</th>
        </svelte:fragment>
        <svelte:fragment slot="body">
            {#if data.data.length > 0}
                {#each data.data as user (user.id)}
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role === 'admin' ? 'Administrador' : 'Vendedor'}</td>
                        <td>
                            <svelte:component this={actions.edit} href="/admin/usuarios/{user.id}" />
                            <svelte:component this={actions.delete} href="/users/{user.id}" callback={reload} />
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
    <Link href="/admin/usuarios/cadastrar">
        Adicionar novo
    </Link>
</aside>