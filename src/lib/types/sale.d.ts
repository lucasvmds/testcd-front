import type { Installment, InstallmentData } from "./installment";

type BaseSale = {
    id: number;
    customer_id: number | null;
    customer: string | null;
    user: string;
    user_id: null;
    total: number;
    created_at: string;
    updated_at: string;
}

type ProductSale = {
    id: number;
    name: string;
    value: number;
    quantity: number;
    total: number;
}

type ProductSaleData = {
    id: number;
    name: string;
    quantity: number;
    value: number;
}

export type SaleSimple = BaseSale & {
    products_count: number;
    installments_count: number;
}

export type SaleFull = BaseSale & {
    products: ProductSale[];
    installments: Installment[];
}

export type SaleData = {
    customer_id: number | null;
    products: ProductSaleData[];
    installments: InstallmentData[];
}