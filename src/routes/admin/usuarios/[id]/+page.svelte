<script lang="ts">
    import { Back } from "$lib/link";
    import { Input, Select } from "$lib/form";
    import type { UserData, User } from "$lib/types";
    import { Ajax } from "$lib/ajax";
    import type { PageData } from "./$types";
    import { Messages } from "$lib/messages";
    export let data: PageData;

    const form: UserData = {
        name: data.data.name,
        email: data.data.email,
        role: data.data.role,
        password: '',
        password_confirmation: '',
    }

    async function save(): Promise<void>
    {
        const response = await Ajax
                                    .patch(`/users/${data.data.id}`)    
                                    .sendJson<User>('json', form);
        if (!response) return;
        Messages.success('Usuário editado com sucesso');
        data.data.name = form.name;
    }
</script>

<svelte:head>
    <title>Editar usuário | Teste DC</title>
</svelte:head>

<main id="app-main">
    <h1>
        Editar usuário
        <small>{data.data.name}</small>
    </h1>
    <form id="form" on:submit|preventDefault={save}>
        <Input type="text" label="Nome" error="name" bind:value={form.name} required size=60 />
        <br>
        <Input type="email" label="E-Mail" error="email" bind:value={form.email} required size=60 />
        <Select blank label="Grupo" error="group" required bind:value={form.role}>
            <option value="admin">Administrador</option>
            <option value="seller">Vendedor</option>
        </Select>
        <br>
        <Input type="password" label="Senha" error="password" bind:value={form.password} size=40 />
        <Input type="password" label="Confirmação da senha" error="password_confirmation" bind:value={form.password_confirmation} size=40 />
    </form>
</main>

<aside id="app-aside">
    <button type="submit" form="form">
        Alterar
    </button>
    <Back href="/admin/usuarios" />
</aside>