<script lang="ts">
    import { Back } from "$lib/link";
    import { Input } from "$lib/form";
    import type {CustomerData, Customer } from "$lib/types";
    import { Ajax } from "$lib/ajax";
    import { goto } from "$app/navigation";
    import { Messages } from "$lib/messages";

    const form: CustomerData = {
        name: '',
        phone: 0,
        address: '',
    }

    async function save(): Promise<void>
    {
        const response = await Ajax
                                .post('/customers')    
                                .sendJson<Customer>('json', form);
        if (!response) return;
        Messages.success('Cliente cadastrado com sucesso');
        goto(`/admin/clientes/${response.data.id}`);
    }
</script>

<svelte:head>
    <title>Cadastrar cliente | Teste DC</title>
</svelte:head>

<main id="app-main">
    <h1>Cadastrar cliente</h1>
    <form id="form" on:submit|preventDefault={save}>
        <Input type="text" label="Nome" error="name" bind:value={form.name} required size=60 />
        <Input type="number" label="Telefone (somente números)" error="phone" bind:value={form.phone} required min="1" />
        <br>
        <Input type="text" label="Endereço" error="address" bind:value={form.address} required size="80" />
    </form>
</main>

<aside id="app-aside">
    <button type="submit" form="form">
        Cadastrar
    </button>
    <Back href="/admin/clientes" />
</aside>