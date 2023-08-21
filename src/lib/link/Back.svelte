<script lang="ts">
    import { query } from "./store";
    export let href: string;

    href += $query ? `?${$query}` : '';

    function cleanLinksStore(): void
    {
        query.set('');
    }
</script>

<a {href} {...$$restProps} on:click={cleanLinksStore}>
    <slot>
        Voltar
    </slot>
</a>