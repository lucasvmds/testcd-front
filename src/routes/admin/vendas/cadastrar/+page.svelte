<script lang="ts">
    import { Back } from "$lib/link";
    import type { SaleData, SaleFull, Customer } from "$lib/types";
    import { Ajax } from "$lib/ajax";
    import { goto } from "$app/navigation";
    import { Messages } from "$lib/messages";
    import CustomerSearch from "./customer/search.svelte";
    import CustomerDetail from "./customer/detail.svelte";
    import ProductSearch from "./product/search.svelte";
    import ProductsList from "./product/list.svelte";
    import InstallmentList from "./installment/list.svelte";
    import { slide } from "svelte/transition";
    import { SelectionBox } from "$lib/form";
    let isCustomerSearchVisible: boolean = false;
    let isProductSearchVisible: boolean = false;
    let customer: Customer | null = null;
    let paymentType: 'in_cash' | 'in_installments' = 'in_cash';

    const form: SaleData = {
        customer_id: null,
        products: [],
        installments: [],
    }

    async function save(): Promise<void>
    {
        const response = await Ajax
                                .post('/sales')    
                                .sendJson<SaleFull>('json', form);
        if (!response) return;
        Messages.success('Venda cadastrada com sucesso');
        goto(`/admin/vendas/${response.data.id}`);
    }

    function toggleCustomerSearchComponent(): void
    {
        isCustomerSearchVisible = !isCustomerSearchVisible;
        isProductSearchVisible = false;
    }

    function toggleProductSearchComponent(): void
    {
        isProductSearchVisible = !isProductSearchVisible;
        isCustomerSearchVisible = false;
    }
</script>

<svelte:head>
    <title>Cadastrar venda | Teste DC</title>
</svelte:head>

<main id="app-main">
    <h1>Cadastrar venda</h1>
    {#if isCustomerSearchVisible}
        <div transition:slide={{ duration: 100 }}>
            <CustomerSearch bind:customerId={form.customer_id} bind:customer bind:visibility={isCustomerSearchVisible} />
        </div>
    {/if}
    {#if isProductSearchVisible}
        <div transition:slide={{ duration: 100 }}>
            <ProductSearch bind:products={form.products} />
        </div>
    {/if}
    <form id="form" on:submit|preventDefault={save}>
        <fieldset>
            <legend>Cliente</legend>
            <CustomerDetail bind:customer bind:customerId={form.customer_id} />
        </fieldset>
        <fieldset>
            <legend>Produtos</legend>
            <ProductsList bind:products={form.products} />
        </fieldset>
        <fieldset>
            <legend>Pagamento</legend>
            <SelectionBox type="radio" label="À Vista" value="in_cash" bind:selected={paymentType} required />
            <SelectionBox type="radio" label="Parcelado" value="in_installments" bind:selected={paymentType} required />
            {#if paymentType === 'in_installments'}
                <InstallmentList bind:installments={form.installments} products={form.products} />
            {/if}
        </fieldset>
    </form>
</main>

<aside id="app-aside">
    <button type="submit" form="form">
        Cadastrar
    </button>
    <button type="button" on:click={toggleCustomerSearchComponent}>
        {isCustomerSearchVisible ? 'Fechar consulta do cliente' : 'Consultar cliente'}
    </button>
    <button type="button" on:click={toggleProductSearchComponent}>
        {isProductSearchVisible ? 'Fechar consulta do produto' : 'Consultar produto'}
    </button>
    <Back href="/admin/vendas" />
</aside>

<style>
    form {
        margin-top: 0;
        transition: margin-top .2s;
    }
    form:nth-child(3n) {
        margin-top: 3em;
    }
</style>