<script lang="ts">
    import { page } from "$app/stores";
</script>

<main id="app-main">
    <h1>Erro no Sistema</h1>
    <p>Código {$page.status}</p>
    <p>{$page.error?.message}</p>
</main>

<aside id="app-aside"></aside>

<style>
    p {
        font-size: 1.3em;
    }
</style>