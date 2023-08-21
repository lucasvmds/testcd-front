import type { PageLoad } from "./$types";
import { goto } from "$app/navigation";

export const load: PageLoad = async () => {
    if (
        window.localStorage.getItem('access_token') ||
        window.sessionStorage.getItem('access_token')
    ) goto('/admin');
}