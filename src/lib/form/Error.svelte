<script lang="ts">
    import { errors } from "./errors";
    export let error: string = '';
</script>

{#if $errors[error]}
    <br />
    <small class="error-component">
        {$errors[error][0]}
    </small>
{/if}