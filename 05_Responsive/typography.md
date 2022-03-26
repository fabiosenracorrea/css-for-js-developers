# Typography

Lets divide where the text is located (or its use) to tackle on this:

## Body Text

Generally, it should stay the **same** as on desktop. All the hard math to make sure the size matches the readability we get on a PC is already done by the phone/browser

We should aim for *at least* 16px of font size.

> But remember, **never** use absolute font sizing, like `font-size: 15px`, because folks can choose to either increase or decrease their default font size, which, in turn, wouldn't have any effect if we had declarations like this one. Use relative units. Almost always, `rem`


## Smaller Text

Found in captions or disclaimers, for example.

If its a text important enough for the user (img caption), we might want to crank up its size. If its a copyright declaration or something like it, it might be ok to just leave it as a small text and let the user pinch in to read it.

## Form Fields

This is something really important. Form fields generally have smaller text inside them, which is standard for most websites. But when we get to the mobile version, this can trigger a not-so-good behavior.

Have you ever had a page automatically zoom-in after clicking on an input with an Iphone? Thats because Safari IOS automatically zoom in to inputs **if their font size is smaller than 16px**

This changes *drastically* the UX on some sites.

```css
input, select, textarea {
  font-size: 1rem;
}
```

Use this in your CSS Reset, either globally or with the appropriate media query to be safe from this behavior

## Headings

Headings can get really big on some desktop sites. When on mobile, that can get ugly, as mobile screens are too narrow.

One approach to this is to use a media query to reduce the font-size to a smaller `rem` value.

Another one is to choose a *fluid* approach so our font scales with the viewport, seen next:

# Fluid Typography

Instead of using `rem` to describe the font size, we can use `vw` to size our headings!

BUT, it can be tricky, obviously. The text could get very large or very small depending on the size of our screens (iphone SE x 50+ inch TV...)

To solve this, we can use **clamp** to help us!

```css
font-size: clamp(1.5rem, 6vw, 3rem);
```

### Safari Issues

Clamp and vw are both supported by safari. The problem, however, is when they are used together.

```Specifically, it only calculates the value when the element first appears. It won't recalculate the font size when the window is resized.```

To fix this, we can do:

```css
h1 {
  font-size: clamp(1.5rem, 6vw, 3rem);
  min-height: 0vh;
}
```

When the element is first rendered, the browser caches the pixel equivalent of 6vw. On a 1000px-wide viewport, this value is 60px. When used inside clamp(), 6vw will always equal 60px, even if the window gets resized.

When we use vw or vh elsewhere in the style, we guarantee that the browser will refresh the pixel equivalent for all viewport units in the style, including within our clamp() call

### Accessibility

Using this method can break users that use the *zoom* function, as we've basically fixed the size of our font

[The WCAG guidelines state that text should be scalable up to 200%](https://www.w3.org/WAI/WCAG21/Understanding/resize-text.html). Its even common to have users crank it up even more.

We can fix that by using a relative unit **with** our viewport one:

```css
h1 {
  /* clamp/min/max will resolve any calc-like expression inside them! */
  font-size: clamp(
    1.5rem,
    4vw + 1rem,
    3rem
  );
`
```

# Fluid Spacing

This trick can be used to space items based on our viewport as well!!


