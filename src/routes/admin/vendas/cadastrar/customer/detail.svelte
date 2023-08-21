<script lang="ts">
    import { RecordsTable } from "$lib/records-table";
    import { Error } from "$lib/form";
    import type { Customer } from "$lib/types";
    export let customer: Customer | null;
    export let customerId: number | null;

    function removeSelectedCustomer(): void
    {
        customerId = null;
        customer = null;
    }
</script>

<Error error="customer_id" />
{#if customer && customerId}
    <RecordsTable>
        <svelte:fragment slot="body">
            <tr>
                <td><b>Código:</b> {customer.id}</td>
                <td><b>Nome:</b> {customer.name}</td>
            </tr>
            <tr>
                <td><b>Telefone:</b> {customer.phone}</td>
                <td><b>Endereço:</b> {customer.address}</td>
            </tr>
            <tr>
                <td colspan="2" class="remove">
                    <button type="button" on:click={removeSelectedCustomer}>Remover</button>
                </td>
            </tr>
        </svelte:fragment>
    </RecordsTable>
{:else}
    <p>
        Cliente não selecionado
        <br>
        <small>Informar o cliente é opcional</small>
    </p>
{/if}

<style>
    .remove {
        color: red;
        font-weight: 400;
        text-align: right;
    }
</style>
