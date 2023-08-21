<script lang="ts">
    import { Back } from "$lib/link";
    import { Input, Select } from "$lib/form";
    import type {ProductData,Product } from "$lib/types";
    import { Ajax } from "$lib/ajax";
    import type { PageData } from "./$types";
    import { Messages } from "$lib/messages";
    export let data: PageData;

    const form: ProductData = {
        name: data.data.name,
        value: data.data.value,
    }

    async function save(): Promise<void>
    {
        const response = await Ajax
                                    .patch(`/products/${data.data.id}`)    
                                    .sendJson<Product>('json', form);
        if (!response) return;
        Messages.success('Produto editado com sucesso');
        data.data.name = form.name;
    }
</script>

<svelte:head>
    <title>Editar produto | Teste DC</title>
</svelte:head>

<main id="app-main">
    <h1>
        Editar produto
        <small>{data.data.name}</small>
    </h1>
    <form id="form" on:submit|preventDefault={save}>
        <Input type="text" label="Nome" error="name" bind:value={form.name} required size=60 />
        <Input type="number" label="Valor" error="value" bind:value={form.value} required step=".01" />
    </form>
</main>

<aside id="app-aside">
    <button type="submit" form="form">
        Alterar
    </button>
    <Back href="/admin/produtos" />
</aside>