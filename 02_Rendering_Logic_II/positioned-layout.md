# Positioned Layout

We've seen how the *Flow Layout* works. It tries very hard not to make elements occupy the same space. With position layout, we can break free of that!

We do that by using `position` and giving it a value of `relative`, `absolute`, `fixed` or `sticky`.

> The **default** position to elements is `static`. This just means it's an element that does not use the *position* layout. You can also use the value `initial`.

## Relative Position

The most simple value, `relative`, often seem to "do nothing". In fact, it does two things:

1. Constraints certain children (more on that later)
2. Enables some CSS properties to be used (top, left, right, bottom)

The biggest advantage of `position` is that **it doesn't impact layout** like margin would! All the other elements stay on their place while the positioned element is adjusted.

This need caution when used, as elements don't auto adjust their size if given, say, `left: 20px` instead of `margin-left: 20px;`. Left just pushes the whole element, no carrying about its size.

And this positioning can be applied to both *inline* and *block* elements, making it possible to do stuff it isn't possible with Flow layout:

```html
<html>
  <head>
    <style>
      strong {
        position: relative;
        top: -4px;
      }
    </style>
  </head>

  <body>
    <p>
      This paragraph has some bolded text, and it <strong>appears to float</strong> a bit!
    </p>
  </body>
</html>
```

Relative is kinda a "middle ground" between flow and position layout, in a way that changing it's `display` property between *block* and *inline* CAN alter how things are shown. On other position types, `display` is mostly ignored! (Except for `display: none`, but that's for every case)

## Absolute Position

We use `absolute` if we want to ignore the elements natural position. When given to an element, it will be adjusted based on it's container (like `relative`), "removing" itself from the flow layout elements. They break free out of it, and the other "normal" elements occupy their space. This is incredibly useful for things like tool-tips, modals, dropdowns...

### What if we don't specify directions?

By just giving an element `position: absolute`, the element will **sit in its default in-flow position**


### Collapsing Parents

Sometimes, tho, setting positioned elements can be rather annoying.

```html
<html>
  <head>
    <style>
      .parent {
        border: 4px solid;
      }

      .child {
        /* position: absolute; */
        width: 200px;
        height: 200px;
        background: pink;
        opacity: 0.5;
      }
    </style>
  </head>

  <body>
    <div class="parent">
      <div class="child"></div>
    </div>
  </body>
</html>
```

Try running this code and toggling the position property. Se how the parent box gets squished? This happens because it's child broke free and its no more "findable" by it. Because it now it "thinks" there's no more children inside, his height is adjusted to be only the defined border, while the child stacks on top of it.

### Element sizing

As flow layout, *block* elements grow to its available space, while **inline* kinda fit their content. How does it work with positioned elements?

With it, elements will clip their size to fit the available content. It is, however, constrained by **its container**. And remember, its container it's **not** necessarily its parent!

### Centering Trick

If you think about the for top/left/right/bottom properties and how they work (essentially telling the element to be X amount off the indicated side), if we set *all* directions to be X amount, we will center it!!!

> Important: if we also give the element width/height, the algorithm will look at the **top/left** values to position element, and then give it the given size.

Another great thing to know is that, different from *flow layout*, here `margin: auto` **works on both directions**!

Take a look at this example:

```html
<html>
  <head>
    <style>
      .box {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        width: 100px;
        height: 100px;
        margin: auto;
        background: deeppink;
      }
    </style>
  </head>

  <body>
    <div class="box"></div>
  </body>
</html>
```

Notice how the box is perfectly centered at the middle of the screen! Try removing its margin or tweaking the sides. This trick can be really good if you are designing a **modal**! Couple it with some max/min width/height and you are good to go!

4 things are required for this to work:

1. Absolute positioning (position: absolute)
2. Equal distances from each edge (ideally 0px)
3. A fixed size (defined width and height properties)
4. Hungry margins (margin: auto)

### Containing Blocks

When setting our elements position, it will be calculated relative to it's containing block! Like mentioned before, this does not necessarily mean his direct parent. That is because __absolute elements can only be contained by *other* elements using the positioned layout__. If no element is found with this characteristics, it will look up the tree until it finds. If none is found, its set relative to the first containing block, which has the size of the viewport!

And remember, when positioning the element, its padding don't apply. It will sit glued to the border if `left: 0`!

## Fixed Position

Fixed is very similar to `absolute` positioning. The only difference is: It can *only* be contained by the viewport. This style is very useful for help/chat buttons on the bottom of your page, for example, as they become immune to scrolling.

> Curiosity: If we don't set any top/left/right/bottom values to a fixed element, it will sit in its *flow* position! It will still behavior as fixed on scroll, tho!

### Transform Exception

When the parent or grandparent(or further away) of a fixed element uses a `transform` property, it will become the element's container, not the viewport anymore. That and the `will-change: transform` declaration have the same effect.

Because it could be an element really far from our fixed element, we can use this JS snippet to debug and find possible errors:

```javascript
// Replace this with a relevant selector.
// If you use a tool that auto-generates classes,
// you can temporarily add an ID and select it
// with '#id'.
const selector = '.the-fixed-child';

function findCulprits(elem) {
  if (!elem) {
    throw new Error(
      'Could not find element with that selector'
    );
  }
  let parent = elem.parentElement;
  while (parent) {
    const {
      transform,
      willChange
    } = getComputedStyle(parent);
    if (transform !== 'none' || willChange === 'transform') {
      console.warn(
        '🚨 Found a culprit! 🚨\n',
        parent,
        { transform, willChange }
      );
    }
    parent = parent.parentElement;
  }
}
findCulprits(document.querySelector(selector));
```

## Sticky

A value to change the elements position from in-flow/relative to being fixed. In addition to setting `position: sticky` we also need to provide one edge for the element to stick to (top/left/right/bottom).

### Behavior

A sticky element will **never** leave it's parent box.

```html
<html>
  <head>
    <style>
      .sticky-ball {
        position: sticky;
        top: 0;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: deeppink;
      }

      .wrapper {
        height: 50%;
        margin-top: 25%;
        margin-bottom: 100%;
        border: 4px solid;
      }
      html, body {
        height: 165%;
      }
    </style>
  </head>

  <body>
    <div class="wrapper">
      <div class="sticky-ball"></div>
    </div>
  </body>
</html>
```

The pink ball will follow the box until its in view, staying **contained** after.

### Space

Sticky elements do take space of its parent container. They become "incorporeal" when scrolling is happening, but unlike absolute/fixed element, they do push elements with their size!

### Positions Meaning

Differently from the other position types, `sticky` brings new meaning to what the values from top/left/right/bottom represent. While on absolute/fixed they mean the distance from the edge of the containing block, in sticky they mean **the threshold to which sticking should start**.

This basically means that when an element has `top: 16px`, it will stick once it gets 16 away from its container in-view.

By taking advantage of this, we can create elements with "delay-like" stickness, like below:

```html
<style>
  header {
    height: 60px;
    position: sticky;
    top: -10px; /* Here! */
    padding-top: 10px;
  }

  html {
  height: 100%;
  }
  body {
    height: 150%;
    padding: 0;
  }
  header {
    background: slateblue;
    color: white;
    opacity: 0.96;
  }
  .arp {
    background-color: slateblue;
    height: 10px;
    width: 100%;
  }
  ul {
    padding: 0;
    margin: 0;
    text-align: center;
  }
  li {
    display: inline-block;
    padding: 0;
    margin: 0 16px;
    line-height: 50px;
  }
  main {
    padding: 32px;
  }
</style>

<header>
  <ul>
    <li>Home</li>
    <li>About</li>
    <li>Contact</li>
  </ul>
</header>

<main>
  <p>Hello world!</p>
</main>
```

### Troubleshooting Sticky

Sometimes we can apply the `position:sticky` to an element only to see it not work. How would that be?

#### A parent is hiding/managing overflow

If we set an overflow to `auto`, `hidden` or `scroll` we mean that the element should stick in that overflow context, not the whole page. This means the element will only stick if the parent (or any ancestor) managing overflow *has* a scrollbar!

To find any ancestor managing overflow, you can use

```javascript
// Replace this with a relevant selector.
// If you use a tool that auto-generates classes,
// you can temporarily add an ID and select it
// with '#id'.
const selector = '.the-fixed-child';

function findCulprits(elem) {
  if (!elem) throw new Error('Could not find element with that selector');

  let parent = elem.parentElement;

  while (parent) {
    const hasOverflow = getComputedStyle(parent).overflow;

    if (hasOverflow !== 'visible') console.log(hasOverflow, parent);

    parent = parent.parentElement;
  }
}

findCulprits(document.querySelector(selector));
```

#### The container isn't big enough

As seen earlier, sticky elements will only go as far as their parent's boundaries.

#### The sticky element is stretched

When using Flexbox or Grid, it's possible for a sticky element to be stretched along the cross-axis. This, in effect, makes it so that the element has no space to move in its parent container.

#### Thin gap above sticky header

Might be a rounding issue and the edge of the browser. You can solve this by setting `top: -1px` instead of 0.
