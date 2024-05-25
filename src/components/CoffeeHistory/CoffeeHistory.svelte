<script lang="ts">
    import "./styles.less";
    import { onDestroy, onMount } from "svelte";
    import { cards, loadMore, isLoading } from "stores/cardStore";
    import Card from "components/Card/Card.svelte";
    import Button from "components/Button/Button.svelte";
    import Plus from "icons/Plus.svelte";
    import Spinner from "components/Spinner/Spinner.svelte";
    import { scrollToBottom } from "utils";
    import { AUTO_LOAD_INTERVAL } from "const";

    let timer: ReturnType<typeof setInterval>;

    const load = async () => {
        clearTimeout(timer);
        await loadMore();
        timer = setTimeout(load, AUTO_LOAD_INTERVAL);
    };

    onMount(load);
    onDestroy(() => clearTimeout(timer));
</script>

<div class="history" use:scrollToBottom={$cards}>
    {#each $cards as card}
        <Card {card} />
    {/each}
    <Button
        className="history__button"
        label={$isLoading ? "Loading" : "Load more"}
        onClick={load}
        disabled={$isLoading}
    >
        <svelte:component this={$isLoading ? Spinner : Plus} />
    </Button>
</div>
