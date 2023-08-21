<script lang="ts">
    import { Input, SelectionBox } from "$lib/form";
    import type { AuthData, AuthResponse } from "$lib/types";
    import { MessagesComponent } from "$lib/messages";
    import { goto } from "$app/navigation";
    import { Ajax } from "$lib/ajax";
    import "./page.less";

    const form: AuthData = {
        email: '',
        password: '',
        remember: false,
    }

    async function login(): Promise<void>
    {
        const response = await Ajax
                                .post(`/auth`)
                                .sendJson<AuthResponse>('json', form);
        if (!response) return;
        if (form.remember) {
            window.localStorage.setItem('access_token', response.data.access_token);
        } else {
            window.sessionStorage.setItem('access_token', response.data.access_token);
        }
        goto('/admin/vendas');
    }
</script>

<svelte:head>
    <title>Login | Teste DC</title>
</svelte:head>

<main id="login-page">
    <h1>Entrar</h1>
    <form on:submit|preventDefault={login}>
        <Input type="email" label="E-Mail" bind:value={form.email} error="email" required size="40" />
        <br>
        <Input type="password" label="Senha" bind:value={form.password} error="password" required size="40" />
        <br>
        <SelectionBox type="checkbox" label="Manter conectado" bind:checked={form.remember} error="remember" />
        <br>
        <br>
        <button type="submit">
            Acessar
        </button>
    </form>
</main>

<MessagesComponent />