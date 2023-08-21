<script lang="ts">
    import { Ajax } from "$lib/ajax";
    import { Messages } from "$lib/messages";
    import icon from "./icons/xmark.svg?raw";
    export let href: string;
    export let callback: (response: Response) => void;

    async function destroy(): Promise<void>
    {
        const response = await Ajax
                                    .delete(href)
                                    .send('none');
        if (!response) return;
        callback(response);
        Messages.success('Registro excluído com sucesso');
    }
</script>

<a {href} class="delete" title="desativar registro" on:click|preventDefault={destroy}>
    {@html icon}
</a>