<script lang="ts">
    import { Back } from "$lib/link";
    import { Input } from "$lib/form";
    import type { ProductData, Product } from "$lib/types";
    import { Ajax } from "$lib/ajax";
    import { goto } from "$app/navigation";
    import { Messages } from "$lib/messages";

    const form: ProductData = {
        name: '',
        value: 0,
    }

    async function save(): Promise<void>
    {
        const response = await Ajax
                                .post('/products')    
                                .sendJson<Product>('json', form);
        if (!response) return;
        Messages.success('Produto cadastrado com sucesso');
        goto(`/admin/produtos/${response.data.id}`);
    }
</script>

<svelte:head>
    <title>Cadastrar produto | Teste DC</title>
</svelte:head>

<main id="app-main">
    <h1>Cadastrar produto</h1>
    <form id="form" on:submit|preventDefault={save}>
        <Input type="text" label="Nome" error="name" bind:value={form.name} required size=60 />
        <Input type="number" label="Valor" error="value" bind:value={form.value} required step=".01" min=".01" />
    </form>
</main>

<aside id="app-aside">
    <button type="submit" form="form">
        Cadastrar
    </button>
    <Back href="/admin/produtos" />
</aside>