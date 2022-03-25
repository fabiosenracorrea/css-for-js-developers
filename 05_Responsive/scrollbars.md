# Scrollbar

Sometimes a web page can have a *small* horizontal scroll that can cause **a lot** of problems to find out why.

That is because, sadly, there is no single explanation to this phenomenal

* An element has an explicit width that is too large to fit in the parent container.
* A replaced element (eg. a video or an image) is used without constraining its width to fit in the parent container.
* A really long word like “disestablishmentarianism” forces an element to be too wide for its parent container.
* An element is explicitly pulled outside of the parent (positioned elements with negative left/right values, elements with negative margin, etc).
* `box-sizing: content-box` is applied and some margin/padding overflow happens


### Exercises

To find and fix the horizontal scrollbars

1. Problem with setting img to `width: 28rem !important;`. That can easily overflow on small screens. Changed to `width: min(32rem, 100%) !important`

> The code is FULL of 'important' declarations. I guess its part of the challenge. DO NOT USE IMPORTANT, ever! Only when overwriting libs styles

2. Solution:

- There was an element inside our content with a `margin-left: -1px` and another class on it with `margin-left: -15px`
- There was an element deeply nested on our content with the style on mobile `margin: -30px -80px 0px 0px !important;` and `margin-right: -40px !important;`

With those fixed, the scroll vanished.

It is OBVIOUS that i did not kept looking inside dev tools on each element. I used a script inside the console:

```js
[...document.querySelectorAll('#content *')].find(el => parseInt(getComputedStyle(el).width) > 350)
```

The `find` could be a `filter`, as you may want to find all at once

Obviously, window size was fixed at 350px.

3. This one was pretty obvious when scrolling, as the issue was the 'decorations' inside each sub-heading (h2)

Trying with the strategy above **did not work**, as the elements here were out of flow (position absolute).

But that can be tweaked to work:

```js
[...document.querySelectorAll('.max-width-wrapper *')].filter(el => parseInt(el.getClientRects()?.[0]?.right) > 350)
```

That way we find all the elements positioned "more to the right" than what they should. This method works for the #2 exercise as well! Use it away!

Since this element is an aesthetic choice, we need a way of keeping the design while solving the problem.

The first thing would be setting `overflow: hidden` to the content container (<main> here). BUT! That has an effect: it messes up our social media links sticky position (*an element cant be sticky if __any__ parent has overflow hidden*).

That could be an issue, but the icons go away when on mobile sizing. We just need to apply the overflow hidden to the container using a media query.


