# Overflow

When an element has children that occupies more space than itself, the normal behavior is to allow the children to appear out of bounds, with no impact on layout. That means an element's overflow will **never** push other elements!

Defaults to `visible`

## Scroll

When we set this to an element, it will gain a scrollbar in the direction its children overflows. It can be solely on the X or Y axis, or both!

THat is why we can use the shorthand `overflow` property or the more specific `overflow-x` and `overflow-y`.

> Attention: The looks of this can differ depending on your OS. A mac with a trackpad behaves differently than the same mac with a wired mouse

## Auto

The desired on most cases. It will automatically add the scroll bar *as needed*, depending on the size of the element's children.

### Why use scroll then?

When on `auto`, content inside the element might shift position when the scroll bar gets added (~15px) to its right interior side. That might cause some UI issues. So if we *know* that we'll need a scroll bar, its ok to use `scroll` over `auto`.

## Hidden

This option truncates anything that goes beyond the parent's boundaries. Might be useful for:

1. Truncating text with ellipsis (...)
2. Artistic/Decorative elements

3. When shifting content to the side (eg opening a mobile drawer menu), to prevent undesirable horizontal scrollbar

> Consider adding a *comment* to elements that receive *hidden* as a value in light of no. 3. It can prevent unwanted changes in the future.

## Scroll container

Sometimes, we'll want to use overflow-x or overflow-y to clip the overflow in one axis, but not affect the other. Unfortunately, this isn't possible in CSS.

When we set the overflow property of the element, we transform it on a scroll container. It becomes an element that its children can **never** visually escape.

## Horizontal Overflow

Sometimes we want to create horizontal scrolls: tab menus, image galleries... And just `overflow-y: auto` might not suffice.

For example, if we have this:

```html
  <div>
    <img />
    <img />
    <img />
    <img />
  </div>
```

And we want our `<div>` to overflow horizontally, just by setting `overflow-x: auto` will not do the trick.

That is because images are *inline* by default, which causes them to line wrap. With that, overflow can't help us.

We can use a property called `white-space` to handle this. Doing `white-space: nowrap` on that `<div>` will solve this issue.

## Position layout

How does overflow work with positioned elements?

We've learned that positioned elements don't necessarily have the same *containing block* as an in-flow sibling. Because of that, overflow is also affected by the containing block difference. Take a look at this example:

```html
<style>
  .wrapper {
    overflow: hidden;
    width: 150px;
    height: 150px;
    border: 3px solid;
  }
  .box {
    position: absolute;
    top: 24px;
    left: 24px;
    background: deeppink;
    width: 150px;
    height: 200px;
  }
</style>

<div class="wrapper">
  <div class="box"></div>
</div>
```

You'll notice that the pink box peaks outside its wrapper container. That happens because the `wrapper` element **is not in position layout**. Because of that, the box' containing block is actually the "first element on screen" and the overflow rules should be modified there. If we give `position: relative` to the wrapper, we fix the issue!

> Important: if the box had `position: fixed` the container would not have a scrollbar, as the containing block for fixed elements is the "first element on screen". Provided there's no ancestor using `transform` or `will-change: transform`.

This can help us while positioning our elements but can be tricky if we want, say, a menu that hs a scroll bar but also sub-menus that pop-right on some cases. To solve this, we can try [this](https://css-tricks.com/popping-hidden-overflow/) particular strategy with a bit of javascript.
