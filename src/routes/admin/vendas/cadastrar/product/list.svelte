<script lang="ts">
    import { Input, Error } from "$lib/form";
    import type { ProductSaleData } from "$lib/types";
    import { formatValue } from "$lib/support";
    import icon from "../icons/xmark.svg?raw";
    export let products: ProductSaleData[];
    let total: string;
    $: total = generateTotal(products);
    function removeProduct(id: number): void
    {
        products = products.filter(
            _product => _product.id !== id
        );
    }

    function generateTotal(products: ProductSaleData[]): string
    {
        let total = 0;
        products.forEach(_product => total += (_product.quantity * _product.value));
        return formatValue(total);
    }
</script>

<Error error="products" />
{#each products as product, index (product.id)}
    <div>
        <Error error="products.{index}" />
        <Error error="products.{index}.id" />
        <Input label="Nome" type="text" value={product.name} readonly />
        <Input label="Quantidade" type="number" bind:value={product.quantity} error="products.{index}.quantity" required min="1" />
        <Input label="Valor (R$)" type="number" bind:value={product.value} error="products.{index}.value" required min=".01" step=".01" />
        <Input label="Total" type="text" value={formatValue(product.quantity * product.value)} readonly />
        <button type="button" class="delete" on:click={() => removeProduct(product.id)} title="remover produto">
            {@html icon}
        </button>
    </div>
{:else}
    <p>
        Nenhum produto selecionado
        <br>
        <small>Selecione pelo menos um produto</small>
    </p>
{/each}
{#if products.length > 0}
    <p class="total">
        <b>Valor total:</b> {total}
    </p>
{/if}

<style lang="less">
    button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: .2em;
        width: 1.3em;
        height: 1.3em;
        color: rgb(var(--action-color));
        background-color: rgba(var(--action-color), .4);
        border-radius: .3em;
        margin-top: .6em;
        margin-left: 1em;
        --action-color: 255, 0, 0;
    }

    p.total {
        text-align: right;
        font-size: 1.2em;
    }
</style>