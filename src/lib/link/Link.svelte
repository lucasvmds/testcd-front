<script lang="ts">
    import { query } from "./store";
    export let href: string;

    function updateLinksStore(): void
    {
        let strArray = location.href.split('?', 2);
        query.set(strArray[1]);
    }
</script>

<a {href} {...$$restProps} on:click={updateLinksStore} on:click>
    <slot />
</a>