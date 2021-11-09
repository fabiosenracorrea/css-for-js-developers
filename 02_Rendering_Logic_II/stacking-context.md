# Stacking Context

How does the browser decide which element to render "on top"?

Depends on the layout mode:

- If on flow layout and with negative margin, the order respects the DOM order (but be aware: content is painted separately from the background in flow layout)

```html
<html>
  <head>
    <style>
      .box {
        width: 50px;
        height: 50px;
        border: 3px solid;
        background: silver;
        font-size: 2rem;
        text-align: center;
      }

      .second.box {
        margin-top: -30px;
        margin-left: 20px;
        background: pink;
      }
    </style>
  </head>

  <body>
    <div class="first box">
      A
    </div>
    <div class="second box">
      B
    </div>
  </body>
</html>
```

If we add a relative position to our "A box", it will sit completely on top. Thats the **general** rule: positioned elements will always render on top of non-positioned elements.

If we have both elements as positioned, *DOM order* wins!

Summarize:

- When all siblings are rendered in Flow layout, the DOM order controls how the background elements overlap, but the content will always float to the front.
- If one sibling uses positioned layout, it will appear above its non-positioned sibling, no matter what the DOM order is.
- If both siblings use positioned layout, the DOM order controls which element will be on top. Unlike in Flow layout, the content does not float to the front.

We can override the normal stacking order with a css property: `z-index`;

## z-index

It only works with *positioned* elements (or flex/grid children!)

Defaults to `auto`, which is equivalent to 0.

They can be *negative*, but introduces more complexity and won't be covered in the course.

## Stack Context

A stacking context is a closed scope of all elements z positions! When inside a stacking context, an element can **never** break free out of it. This means that no matter how high its z-index inside that context is, if there's another stacking context on the page with a higher z-index, the element wont end up on top!

Check this out:

```html
<html>
  <head>
    <style>
      header {
        position: relative;
        z-index: 2;
      }

      main {
        position: relative;
        /*
          Toggle this property to
          create/destroy the stacking
          context
        */
        z-index: 1;
      }

      .tooltip {
        position: absolute;
        z-index: 999999;
      }

      /* These styles are purely cosmetic */
      body {
        background: #eee;
      }

      header {
        height: 60px;
        line-height: 60px;
        background: pink;
        text-align: center;
      }

      main {
        padding: 32px;
      }

      .tooltip {
        top: -12px;
        left: 0px;
        right: 0px;
        margin: 0 auto;
        width: 90px;
        text-align: center;
        padding: 8px;
        background: white;
        box-shadow: 1px 2px 8px hsl(0deg 0% 0% / 0.25);
        border-radius: 6px;
      }
    </style>
  </head>

  <body>
    <header>
      My Cool Site
    </header>

    <main>
      <div class="tooltip">
        A tooltip
      </div>
      <p>Some main content</p>
    </main>
  </body>
</html>
```

No matter how high the tool-tip z-index gets, it can never break out of the 'main' stacking context, which, in turn, is less-powerful than the header's context (z-index 1 x 2)

#### How to create one?

Whenever we give an element a non-static `position` value AND a `z-index`, we create a stacking context withing that element (and all of its children!)

There is also other ways of doing so:

- Setting opacity to a value less than 1

- Setting position to fixed or sticky (No z-index needed for these values!)

- Applying a mix-blend-mode other than normal

- Adding a z-index to a child inside a `display: flex` or `display: grid` container

- Using transform, filter, clip-path, or perspective

- Explicitly creating a context with `isolation: isolate` (More on this soon!)

[MDN specification](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context)

### Debugging stacking contexts

First, this extension: [here](https://github.com/andreadev-it/stacking-contexts-inspector)

## Managing Z-Index

Fighting "z-index wars" can be a real problem. Specially when the size of the application grows and more elements are constantly added to the mix.

To avoid it, we can rely on the DOM order and creation of isolated stacking contexts.

### DOM Order

If the elements we are trying to position are closed together (say, a card with decorative blobs around it), we can rely solely on DOM order to solve the stacking issue, we put the decorative images first and then our card, all with non-static position values!

> Be aware: Changing DOM order on elements that **do have tabbing interaction**, like links, inputs, buttons, can lead to un-wanted effects on tabbing. Pay attention to this.

### Isolated stacking contexts

Like we saw earlier, we can create an isolated context by positioning a container and giving it a non `auto` z-index value.

Lets say we have this scenario:


```html
<html>
  <head>
    <style>
      header {
        position: sticky;
        z-index: 2;
      }

      .card {
        position: relative;
        z-index: 1;
      }

      .card.main {
        z-index: 2;
      }
    </style>
  </head>

  <body>
    <header>
      My Cool Site
    </header>

    <main>
      <div class="some-container">
        <div class="card">
          ...some content
        </div>
        <div class="card main">
          ...some content
        </div>
        <div class="card">
          ...some content
        </div>
      </div>
    </main>
  </body>
</html>
```

Each card is its own stacking context, as is our header. When interacting, we need to compare their relative index to decide which will sit on top on conflicting scenarios.

Here's how its calculated:

- the header has 2 z-index
- A normal card has 1 of z-index
- The main card has 2 of z-index

When contrasting them, both the header and the main card has the same index, which means the card will sit on top because of its DOM order.

We could give the header a z-index of 10, but that would start z-index war!

Instead, if we create a stacking context for our container, we can solve this issue!

```css
  .some-container {
    position: relative;
    z-index: 1;
  }
```

This way, even tho our card has a z-index of 2, its **constrained inside** a `z-index: 1` context. That will always lose to our header's `z-index: 2;`!!!

### The isolation property

We can also use this strategy with a different approach: the `isolation` property.

```css
  .some-container {
    isolation: isolate;
  }
```

This does the same thing, creating the stacking context inside!

Just remember this does not work on IE!

