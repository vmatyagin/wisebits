<script lang="ts">
    import "./styles.less";
    import { onDestroy } from "svelte";
    import { toastStore } from "stores/toastStore";

    let showToast = false;

    const unsub = toastStore.subscribe((tst) => {
        if (tst !== null) {
            showToast = true;
            setTimeout(toastStore.reset, 3000);
        } else {
            showToast = false;
        }
    });

    onDestroy(unsub);
</script>

{#if showToast}
    <div class="toast-container">
        <div class="toast">{$toastStore}</div>
    </div>
{/if}
