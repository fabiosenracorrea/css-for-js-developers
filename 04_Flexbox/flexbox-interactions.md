# Flexbox interactions

We've been through most of flexbox features, but haven't really gone by its interactions with other layout modes. Lets do that!

## Positioned flex children

What happens if we give a flex children a `position` value? Either absolute or fixed?

We are asking it to participate in 2 layout modes: flex and positioned. This CANT happen.

And **position layout always wins**

> Obviously `position: relative` is not on the same rule, as it's just a 'placeholder' indicator. The element is layed as a flex item and then given the top/bottom/left/right capabilities

> `position: sticky` can work with flex children, but theres a gotcha to be explored later on!

## Margin collapse

When two block-level elements are adjacent or nested, their margins can overlap, or be absorbed. We've seen this before, on [Module 1](../01_Rendering_Logic).

**This behavior is exclusive to the _Flow_ layout**

## Z-index

This property **works** for flex children! Even tho we are not using the *position* layout. It works with `flexbox` AND `grid` children.

## Blending Modes

Lets do an exercise to see how we could blend layout modes!

We have a two column card, one with an article and the other with a large list inside. We want the card's height to be determined by our smaller element, the article.

Here's one solution:

```html
<style>
  /* Cosmetic styles */
  h1, p, li {
    margin-bottom: 16px;
  }

  section {
    display: flex;
    gap: 32px;
    border: 3px solid hotpink;
    /* Determines the father element to our absolute list */
    position: relative;
    /* Prevents our list absolute list content to overflow */
    overflow: hidden;
  }

  .col {
    padding: 16px;
    /* fixes both columns width to occupy half of the space- flex-basis: 50% also works */
    width: 50%;
  }

  .list {
    /* adds the scroll bar */
    overflow-y: auto;
    /* takes the element out of flow, so the parent cant look at its content size to determine its height */
    position: absolute;
    /* makes sure its one the second column side */
    right: 0;
    /* expands the container to the parent's size (otherwise we dont have a scrollbar) */
    height: 100%;
  }
</style>

<section>
  <div class="col">
    <h1>Growing Column</h1>
    <p>This column will grow very tall indeed, whilst the adjacent one will be clamped to whatever height this one rests at!</p>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
  </div>

  <div class="col list">
    <p>Here is a list of all the letters in the English language:</p>
    <ol>
      <li>Item A</li>
      <li>Item B</li>
      <li>Item C</li>
      <li>Item D</li>
      <li>Item E</li>
      <li>Item F</li>
      <li>Item G</li>
      <li>Item H</li>
      <li>Item I</li>
      <li>Item J</li>
      <li>Item K</li>
      <li>Item L</li>
      <li>Item M</li>
      <li>Item N</li>
      <li>Item O</li>
      <li>Item P</li>
      <li>Item Q</li>
      <li>Item R</li>
      <li>Item S</li>
      <li>Item T</li>
      <li>Item U</li>
      <li>Item V</li>
      <li>Item W</li>
      <li>Item X</li>
      <li>Item Y</li>
      <li>Item Z</li>
    </ol>
  </div>
</section>
```

A more elegant solution would be to use `position:sticky`:

```html
<style>
  /* Cosmetic styles */
  h1, p, li {
    margin-bottom: 16px;
  }

  section {
    display: flex;
    gap: 32px;
    border: 3px solid hotpink;

    /* adds the scrollbar to the whole container - if added to the .list, it would make a really small container due to the height: 0px */
    overflow: auto;
  }

  .col {
    padding: 16px;
    /* Both sides occupy the same space */
    flex: 1;
  }

  .article {
    position: sticky;
    top: 0;
  }

  .list {
    height: 0px;
  }
</style>

<section>
  <div class="col article">
    <h1>Growing Column</h1>
    <p>This column will grow very tall indeed, whilst the adjacent one will be clamped to whatever height this one rests at!</p>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
  </div>

  <div class="col list">
    <p>Here is a list of all the letters in the English language:</p>
    <ol>
      <li>Item A</li>
      <li>Item B</li>
      <li>Item C</li>
      <li>Item D</li>
      <li>Item E</li>
      <li>Item F</li>
      <li>Item G</li>
      <li>Item H</li>
      <li>Item I</li>
      <li>Item J</li>
      <li>Item K</li>
      <li>Item L</li>
      <li>Item M</li>
      <li>Item N</li>
      <li>Item O</li>
      <li>Item P</li>
      <li>Item Q</li>
      <li>Item R</li>
      <li>Item S</li>
      <li>Item T</li>
      <li>Item U</li>
      <li>Item V</li>
      <li>Item W</li>
      <li>Item X</li>
      <li>Item Y</li>
      <li>Item Z</li>
    </ol>
  </div>
</section>
```

There are probably more solutions to this task! But both suffices.

