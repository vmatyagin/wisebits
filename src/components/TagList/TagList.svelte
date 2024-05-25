<script lang="ts">
    import "./styles.less";
    import cn from "classnames";

    export let className: string | undefined = undefined;
    export let tags: string[];
</script>

<section class={cn("tag-list", className)}>
    <ul>
        {#each tags as tag}
            <li class="tag-list__item">
                {tag}
            </li>
        {/each}
    </ul>
    <div class="tag-list__gradient" aria-hidden="true" />
</section>
