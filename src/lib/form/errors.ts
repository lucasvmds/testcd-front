import { writable, get } from "svelte/store";

export function hasErrors(...keys: (string | RegExp)[]): boolean
{
    const errors = get(store);
    for (const key of keys) {
        if (key instanceof RegExp) {
            for (const errorKey in errors) {
                if (key.test(errorKey)) return true;
            }
        } else {
            if (key in errors) return true;
        }
    }
    return false;
}

type Errors = {
    [key: string]: string[];
}
const store = writable<Errors>({}); 
export { store as errors }