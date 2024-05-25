<script lang="ts">
    import "./styles.less";
    import Spinner from "components/Spinner/Spinner.svelte";
    import Restart from "icons/Restart.svelte";

    export let src: string;
    export let alt: string;

    let failed = false;
    let loading = true;
    let image: HTMLImageElement;

    const onLoaded = () => {
        failed = false;
        loading = false;
    };

    const onError = () => {
        loading = false;
        failed = true;
    };

    const onRetry = () => {
        loading = true;
        image.src = src;
    };
</script>

<div class="image-container">
    {#if loading}
        <div class="image-container__icon" aria-label="Image loading">
            <Spinner />
        </div>
    {/if}
    {#if failed && !loading}
        <button
            class="image-container__icon image-container__icon--restart"
            on:click={onRetry}
            aria-label="Try to load image again"
        >
            <Restart />
        </button>
    {/if}
    <img
        bind:this={image}
        class:failed
        {src}
        {alt}
        loading="lazy"
        on:load={onLoaded}
        on:error={onError}
    />
</div>
