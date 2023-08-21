<script lang="ts">
    import { Back } from "$lib/link";
    import { Input } from "$lib/form";
    import type {CustomerData, Customer } from "$lib/types";
    import { Ajax } from "$lib/ajax";
    import type { PageData } from "./$types";
    import { Messages } from "$lib/messages";
    export let data: PageData;

    const form: CustomerData = {
        name: data.data.name,
        phone: data.data.phone,
        address: data.data.address,
    }

    async function save(): Promise<void>
    {
        const response = await Ajax
                                    .patch(`/customers/${data.data.id}`)    
                                    .sendJson<Customer>('json', form);
        if (!response) return;
        Messages.success('Cliente editado com sucesso');
        data.data.name = form.name;
    }
</script>

<svelte:head>
    <title>Editar cliente | Teste DC</title>
</svelte:head>

<main id="app-main">
    <h1>
        Editar cliente
        <small>{data.data.name}</small>
    </h1>
    <form id="form" on:submit|preventDefault={save}>
        <Input type="text" label="Nome" error="name" bind:value={form.name} required size=60 />
        <Input type="number" label="Telefone (somente números)" error="phone" bind:value={form.phone} required min="1" />
        <br>
        <Input type="text" label="Endereço" error="address" bind:value={form.address} required size="80" />
    </form>
</main>

<aside id="app-aside">
    <button type="submit" form="form">
        Alterar
    </button>
    <Back href="/admin/clientes" />
</aside>