import { Action } from "svelte/action";

export const scrollToBottom: Action<HTMLElement, unknown> = (node) => {
    const scroll = () => {
        window.scrollTo({
            top: node.scrollHeight,
            behavior: "smooth"
        });
    };

    scroll();

    return { update: scroll };
};
