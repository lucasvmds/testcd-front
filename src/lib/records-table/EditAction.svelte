<script lang="ts">
    import icon from "./icons/pen.svg?raw";
    export let href: string;
</script>

<a {href} class="edit" title="editar registro">
    {@html icon}
</a>