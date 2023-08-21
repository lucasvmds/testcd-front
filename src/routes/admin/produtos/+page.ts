import type { PageLoad } from "./$types";
import { Ajax } from "$lib/ajax";
import type { Product } from "$lib/types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ url }) => {
    const response = await Ajax
                                .get(`/products${url.search}`)
                                .send<Product>('paginate');
    if (response) return response;
    throw error(500, { message: 'Server Error' });
}