<script lang="ts">
    import { Back } from "$lib/link";
    import type { PageData } from "./$types";
    import SaleDetails from "./detail.svelte";
    import Products from "./products.svelte";
    import Installments from "./installments.svelte";
    export let data: PageData;
</script>

<svelte:head>
    <title>Consultar venda | Teste DC</title>
</svelte:head>

<main id="app-main">
    <h1>
        Consultar venda
        <small>Nº {data.data.id}</small>
    </h1>
    <h2>Detalhes</h2>
    <SaleDetails sale={data.data} />
    <h2>Produtos</h2>
    <Products sale={data.data} />
    <h2>Parcelas</h2>
    <Installments sale={data.data} />
</main>

<aside id="app-aside">
    <Back href="/admin/vendas" />
</aside>

<style>
    h2 {
        margin-top: 2em;
        margin-bottom: .5em;
        text-align: center;
    }
</style>