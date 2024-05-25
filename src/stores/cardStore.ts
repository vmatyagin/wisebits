import { writable } from "svelte/store";
import { Card } from "types";
import { getCard } from "api";
import { IMAGE_API_URL } from "const";
import { toastStore } from "./toastStore";

export const error = writable<Error | null>(null);
export const cards = writable<Card[]>([]);
export const isLoading = writable<boolean>(true);

export const loadMore = async (): Promise<void> => {
    try {
        isLoading.set(true);
        error.set(null);

        const card = await getCard();

        cards.update((prevList) => [
            ...prevList,
            {
                ...card,
                imageUrl: IMAGE_API_URL + `?lock=${card.id}`,
                notes: card.notes.split(", ")
            }
        ]);
    } catch (err) {
        toastStore.create(err.message);
        error.set(err);
    }

    isLoading.set(false);
};
