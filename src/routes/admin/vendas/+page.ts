import type { PageLoad } from "./$types";
import { Ajax } from "$lib/ajax";
import type { SaleSimple } from "$lib/types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ url }) => {
    const response = await Ajax
                                .get(`/sales${url.search}`)
                                .send<SaleSimple>('paginate');
    if (response) return response;
    throw error(500, { message: 'Server Error' });
}