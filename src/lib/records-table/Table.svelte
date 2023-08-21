<script lang="ts">
    import "./style.less";
    export let center = false;
</script>

<table class:center class="records">
    <thead>
        <tr>
            <slot name="head"></slot>
        </tr>
    </thead>
    <tbody>
        <slot name="body"></slot>
    </tbody>
</table>