import { writable } from "svelte/store";

const store = writable<string | null>(null);

const reset = (): void => store.set(null);
const create = (message: string): void => store.set(message);

export const toastStore = { reset, create, subscribe: store.subscribe };
