export { default as Pagination } from "./Pagination.svelte";
export type PaginatedResponse<T = object> = {
    data: T[];
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
    }
    links: {
        first: string;
        last: string | null;
        next: string | null;
        prev: string | null;
    }
}