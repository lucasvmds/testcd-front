<script lang="ts">
    import { Back } from "$lib/link";
    import { Input, Select } from "$lib/form";
    import type { UserData, User } from "$lib/types/user";
    import { Ajax } from "$lib/ajax";
    import type { PageData } from "./$types";
    import { Messages } from "$lib/messages";
    export let data: PageData;

    const formData: UserData = {
        name: data.data.name,
        email: data.data.email,
        role: data.data.role,
        password: '',
        password_confirmation: '',
    }

    async function save(): Promise<void>
    {
        return Ajax
                .patch(`/users/${data.data.id}`)    
                .sendJson<User>('json', formData)
                .then(response => {
                    Messages.success('Usuário editado com sucesso');
                    data.data.name = formData.name;
                    return;
                });
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
        <Input type="text" label="Nome" error="name" bind:value={formData.name} required size=60 />
        <br>
        <Input type="email" label="E-Mail" error="email" bind:value={formData.email} required size=60 />
        <Select blank label="Grupo" error="group" required bind:value={formData.role}>
            <option value="admin">Administrador</option>
            <option value="seller">Vendedor</option>
        </Select>
        <br>
        <Input type="password" label="Senha" error="password" bind:value={formData.password} size=40 />
        <Input type="password" label="Confirmação da senha" error="password_confirmation" bind:value={formData.password_confirmation} size=40 />
    </form>
</main>

<aside id="app-aside">
    <button type="submit" form="form">
        Alterar
    </button>
    <Back href="/admin/usuarios" />
</aside>