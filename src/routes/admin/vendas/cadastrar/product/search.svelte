<script lang="ts">
    import { Ajax } from "$lib/ajax";
    import { RecordsTable } from "$lib/records-table";
    import { Input } from "$lib/form";
    import type { ProductSaleData, Product } from "$lib/types";
    import { formatValue } from "$lib/support";
    import { onMount } from "svelte";
    import icon from "../icons/plus.svg?raw";
    export let products: ProductSaleData[];
    let value: string = '';
    let _products: Product[] = [];
    async function search(): Promise<void>
    {
        const response = await Ajax
                                    .get(`/products/search?search=${value}`)
                                    .send<Product[]>('json');
        if (!response) return;
        _products = response.data;
    }

    function choice(product: Product): void
    {
        products.push({
            id: product.id,
            name: product.name,
            value: product.value,
            quantity: 1,
        });
        products = products;
    }

    onMount(
        () => document.querySelector<HTMLInputElement>('#search-product')?.focus()
    );
</script>

<form on:submit|preventDefault={search}>
    <Input type="search" label="Pesqusiar produto" bind:value placeholder="Digite a consulta e tecle Enter" size="80" id="search-product" />
    {#if _products.length > 0}
        <RecordsTable center>
            <svelte:fragment slot="head">
                <th>Código</th>
                <th>Nome</th>
                <th>Valor</th>
                <th>Ações</th>
            </svelte:fragment>
            <svelte:fragment slot="body">
                {#each _products as product (product.id)}
                    <tr>
                        <td>{product.id}</td>
                        <td>{product.name}</td>
                        <td>{formatValue(product.value)}</td>
                        <td>
                            <button type="button" class="restore" title="selecionar cliente" on:click={() => choice(product)}>
                                {@html icon}
                            </button>
                        </td>
                    </tr>
                {/each}
            </svelte:fragment>
        </RecordsTable>
    {:else}
        <p>Nenhum produto encontrado</p>
    {/if}
</form>