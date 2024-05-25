<script lang="ts">
    import "./styles.less";
    import cn from "classnames";

    export let className: string | undefined = undefined;
</script>

<span class={cn("spinner", className)} />
