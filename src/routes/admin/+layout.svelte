<script lang="ts">
    import "./layout.less";
    import iconUser from "./layout-icons/edit-user.svg?raw";
    import iconLogout from "./layout-icons/logout.svg?raw";
    import { Messages, MessagesComponent } from "$lib/messages";
    import { Ajax } from "$lib/ajax";
    import { goto } from "$app/navigation";

    async function logout(): Promise<void>
    {
        const response = await Ajax
                                    .delete('/auth')
                                    .send('none');
        if (!response) return;
        window.localStorage.removeItem('access_token');
        window.sessionStorage.removeItem('access_token');
        Messages.success('Sessão encerrada com sucesso');
        goto('/login');
    }
</script>

<header id="app-header">
    <nav>
        <a href="/admin/vendas">Vendas</a>
        <a href="/admin/clientes">Clientes</a>
        <a href="/admin/produtos">Produtos</a>
        <a href="/admin/usuarios">Usuários</a>
    </nav>
    <div>
        <!-- <a href="/admin/perfil" title="editar dados de acesso">
            {@html iconUser}
        </a> -->
        <a href="/logout" title="sair do sistema" on:click|preventDefault={logout}>
            {@html iconLogout}
        </a>
    </div>
</header>
<slot />
<MessagesComponent />