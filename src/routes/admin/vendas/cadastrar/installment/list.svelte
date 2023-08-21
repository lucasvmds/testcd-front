<script lang="ts">
    import { DateUtil } from "$lib/date";
    import { Input } from "$lib/form";
    import { formatValue } from "$lib/support";
    import type { ProductSaleData, InstallmentData } from "$lib/types";
    import icon from "../icons/xmark.svg?raw";
    export let installments: InstallmentData[];
    export let products: ProductSaleData[];
    let installmentsNumber: number = 1;
    let total: string;
    $: total = generateInstallmentsTotal(installments); 
    function generateTotal(): number
    {
        let total: number = 0;
        products.forEach(product => {
            total += product.quantity * product.value
        });
        return total;
    }
    function generateInstallmentsTotal(_installments: InstallmentData[]): string
    {
        let total: number = 0;
        _installments.forEach(item => {
            total += item.value
        });
        return formatValue(total);
    }
    function generateInstallments(): void
    {
        const total = generateTotal();
        let count: number = 1;
        const date = new DateUtil;
        installments = [];
        while (count <= installmentsNumber) {
            date.setMonth(date.getMonth() + 1);
            installments.push({
                id: Math.random(),
                due_date: date.format('Y-m-d'),
                value: Number((total / installmentsNumber).toFixed(2)),
            });
            count++;
        }
        installments = installments;
    }

    function removeInstallment(id: number): void
    {
        installments = installments.filter(
            _installment => _installment.id !== id
        );
    }
</script>

<p>
    <Input type="number" label="Número de parcelas" bind:value={installmentsNumber} />
    <button class="add" type="button" on:click={generateInstallments}>
        Gerar parcelas
    </button>
</p>
{#each installments as installment, index (installment.id)}
    <div>
        <b>#{index + 1}</b>
        <Input label="Data de vencimento" type="date" required bind:value={installment.due_date} error="installments.{index}.due_date" />
        <Input label="Valor" type="number" required step=".01" min=".01" bind:value={installment.value} error="installments.{index}.value" />
        <button type="button" class="delete" on:click={() => removeInstallment(installment.id)} title="remover produto">
            {@html icon}
        </button>
    </div>
{/each}
{#if installments.length > 0}
    <p class="total">
        <b>Total das parcelas:</b> {total}
    </p>
{/if}

<style>
    div {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }

    p.total {
        text-align: right;
        font-size: 1.2em;
    }
    button.add {
        margin-top: 1em;
        font-weight: 400;
    }

    button.delete {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: .2em;
        width: 1.3em;
        height: 1.3em;
        color: rgb(var(--action-color));
        background-color: rgba(var(--action-color), .4);
        border-radius: .3em;
        margin-top: .6em;
        margin-left: 1em;
        --action-color: 255, 0, 0;
    }
</style>