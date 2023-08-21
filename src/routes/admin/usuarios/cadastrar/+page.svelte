<script lang="ts">
    import { Back } from "$lib/link";
    import { Input, Select } from "$lib/form";
    import type { UserData, User } from "$lib/types/user";
    import { Ajax } from "$lib/ajax";
    import { goto } from "$app/navigation";
    import { Messages } from "$lib/messages";

    const form: UserData = {
        name: '',
        email: '',
        role: '',
        password: '',
        password_confirmation: '',
    }

    async function save(): Promise<void>
    {
        const response = await Ajax
                                .post('/users')    
                                .sendJson<User>('json', form);
        if (!response) return;
        Messages.success('Usuário cadastrado com sucesso');
        goto(`/admin/usuarios/${response.data.id}`);
    }
</script>

<svelte:head>
    <title>Cadastrar usuário | Teste DC</title>
</svelte:head>

<main id="app-main">
    <h1>Cadastrar usuário</h1>
    <form id="form" on:submit|preventDefault={save}>
        <Input type="text" label="Nome" error="name" bind:value={form.name} required size=60 />
        <br>
        <Input type="email" label="E-Mail" error="email" bind:value={form.email} required size=60 />
        <Select blank label="Grupo" error="group" required bind:value={form.role}>
            <option value="admin">Administrador</option>
            <option value="seller">Vendedor</option>
        </Select>
        <br>
        <Input type="password" label="Senha" error="password" bind:value={form.password} required size=40 />
        <Input type="password" label="Confirmação da senha" error="password_confirmation" bind:value={form.password_confirmation} required size=40 />
    </form>
</main>

<aside id="app-aside">
    <button type="submit" form="form">
        Cadastrar
    </button>
    <Back href="/admin/usuarios" />
</aside>