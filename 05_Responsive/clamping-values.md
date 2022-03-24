# Clamping Values

As seen before, we can constrain an element's size using a combination of `max-width`, `min-width` and a relative based `width` value (percentages, for example).

The problem with this is: we don't always have control over the total available width. On mobile, the `min-width` constraint can make the content overflow, which is almost always not wanted.

We could fix that using media queries, but there are a lot of "magic" numbers to this, especially if accounting for inner padding/margins that could change and break the design silently.

Fortunately, we have `clamp` to help us!

A declaration that would normally go like:

```css
  .column {
    width: 65%;
    min-width: 500px;
    max-width: 800px;
  }
```

can be done with:

```css
  .column {
    width: clamp(500px, 65%, 800px);
  }
```

The function takes 3 arguments:

1. The minimum value
2. The ideal (wanted) value
3. The maximum value

Its pretty identical to using the trio we've used before, with one *awesome* added bonus: We free `max-width` up! Which means we can constrain our element even more to make sure it fits well on all screens.


```css
  .column {
    width: clamp(500px, 65%, 800px);

    /* THIS!! */
    max-width: 100%;
  }
```

## Other properties two!

Its normal to see `clam` being used with width/height values, but we can actually use it for ANY length property! - Border width, for example

> In a later lecture, we'll see how to create fluid typography with it!

## Min and Max

If you want to constrain only to one side, there's also the `min` and `max` function. They take two values and evaluates to which is smaller/largest
