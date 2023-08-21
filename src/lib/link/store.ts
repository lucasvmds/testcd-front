import { writable, get } from "svelte/store";
const store = writable<string>('');
export { store as query }