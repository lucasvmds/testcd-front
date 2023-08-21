<script lang="ts">
    import Error from "./Error.svelte";
    type Type = 
        'password' |
        'number' |
        'email' |
        'text' |
        'tel' |
        'date' |
        'datetime-local' |
        'search' |
        'file' |
        'color';

    export let
        type: Type,
        label: string,
        value: string | number | FileList | undefined | null,
        error: string = '',
        disabled: boolean = false;
</script>

<!-- svelte-ignore a11y-label-has-associated-control -->
<label class="input-component" class:disabled>
    <span>{label}</span>
    {#if type === 'password'}
        <input type="password" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'number'}
        <input type="number" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'email'}
        <input type="email" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'text'}
        <input type="text" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'tel'}
        <input type="tel" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'date'}
        <input type="date" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'search'}
        <input type="search" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'color'}
        <input type="color" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'datetime-local'}
        <input type="datetime-local" bind:value autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
    {:else if type === 'file' && (value === null || value instanceof FileList)}
        <input type="file" bind:files={value} autocomplete="off" {...$$restProps} {disabled} on:input on:blur />
        <span>{value instanceof FileList ? value[0].name : 'Nenhum arquivo selecionado'}</span>
    {/if}
    <Error {error} />
</label>