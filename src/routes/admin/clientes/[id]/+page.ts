import { Ajax } from "$lib/ajax";
import type { PageLoad } from "./$types";
import type { Customer } from "$lib/types";
import { error } from "@sveltejs/kit";

export const load: PageLoad = async ({ params }) => {
    const response = await Ajax
                            .get(`/customers/${params.id}`)
                            .send<Customer>('json');
    if (!response) throw error(500, { message: 'Server Error' });
    return response;
}