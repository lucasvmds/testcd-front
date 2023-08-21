import { writable } from "svelte/store";
import type { Message } from "./index";

const store = writable<Message[]>([]);
export { store as messages }