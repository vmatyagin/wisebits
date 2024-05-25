<script lang="ts">
    import "./styles.less";
    import Image from "components/Image/Image.svelte";
    import TagList from "components/TagList/TagList.svelte";
    import { Card } from "types";

    export let card: Card | undefined = undefined;
</script>

<article class="card">
    <Image src={card.imageUrl} alt={card.blend_name} />
    <div class="card__content">
        <p class="card__country">
            {card.origin}
        </p>
        <h2 class="card__name">
            {card.blend_name}
        </h2>
        <p class="card__variety">
            {card.variety}
        </p>
        <p class="card__intensifier">
            {card.intensifier}
        </p>
        <TagList className="card__taglist" tags={card.notes} />
    </div>
</article>
