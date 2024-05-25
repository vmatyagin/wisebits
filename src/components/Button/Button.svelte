<script lang="ts">
    import "./styles.less";
    import cn from "classnames";
    export let onClick: VoidFunction;
    export let disabled: boolean = false;
    export let label: string;
    export let className: string | undefined = undefined;
</script>

<button
    class={cn("button", className)}
    aria-label={label}
    on:click={onClick}
    {disabled}
>
    <slot />
</button>
