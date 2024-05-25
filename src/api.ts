import { API_URL } from "const";
import { RequestCard } from "types";

const get = async <T>(url: string): Promise<T> => {
    let response: Response | undefined;
    try {
        response = await fetch(url);
    } catch (err) {
        console.error(err);
    }

    if (!response?.ok) {
        if (response?.status === 429) {
            throw new Error("Too many attempts, please slow down :)");
        }
        if (!window.navigator.onLine) {
            throw new Error(
                "Looks like you're offline. Check your internet connection"
            );
        }

        throw new Error("Unknown loading error. Try later");
    }

    return response.json();
};

export const getCard = (): Promise<RequestCard> => get(API_URL);
