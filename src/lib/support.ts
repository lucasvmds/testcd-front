export function formatValue(value: number): string
{
    const formatter = new Intl.NumberFormat('pt-BR', {
        currency: 'BRL',
        style: 'currency',
        maximumFractionDigits: 2,
    });
    return formatter.format(value);
}