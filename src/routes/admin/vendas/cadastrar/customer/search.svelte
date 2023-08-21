<script lang="ts">
    import { Ajax } from "$lib/ajax";
    import { RecordsTable } from "$lib/records-table";
    import { Input } from "$lib/form";
    import type { Customer } from "$lib/types";
    import { onMount } from "svelte";
    import icon from "../icons/plus.svg?raw";
    export let customerId: number | null;
    export let customer: Customer | null;
    export let visibility: boolean;
    let value: string = '';
    let customers: Customer[] = [];
    async function search(): Promise<void>
    {
        const response = await Ajax
                                    .get(`/customers/search?search=${value}`)
                                    .send<Customer[]>('json');
        if (!response) return;
        customers = response.data;
    }

    function choice(_customer: Customer): void
    {
        customer = _customer;
        customerId = _customer.id;
        visibility = false;
    }

    onMount(
        () => document.querySelector<HTMLInputElement>('#search-customer')?.focus()
    );
</script>

<form on:submit|preventDefault={search}>
    <Input type="search" label="Pesqusiar cliente" bind:value placeholder="Digite a consulta e tecle Enter" size="80" id="search-customer" />
    {#if customers.length > 0}
        <RecordsTable center>
            <svelte:fragment slot="head">
                <th>Código</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Ações</th>
            </svelte:fragment>
            <svelte:fragment slot="body">
                {#each customers as customer (customer.id)}
                    <tr>
                        <td>{customer.id}</td>
                        <td>{customer.name}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.address}</td>
                        <td>
                            <button type="button" class="restore" title="selecionar cliente" on:click={() => choice(customer)}>
                                {@html icon}
                            </button>
                        </td>
                    </tr>
                {/each}
            </svelte:fragment>
        </RecordsTable>
    {:else}
        <p>Nenhum cliente encontrado</p>
    {/if}
</form>