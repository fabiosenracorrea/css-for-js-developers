# Units

# Pixel

The norm. Translates to what we see on the screen and it's used by most developers.

# EM

It's a relative unit, equal to the font size of the current element. If we give a paragraph a font size of 20px, giving it a padding o 2em would result in 40px!

Not really practical, as modifications on the parent element can result in unpleasant surprises on child elements.

# REM

Similar to `em`, but everything is related to the **root** element. The `<html>` tag. The default size of it is 16px.

> *Note*: You **should not** specify the font-size of the html tag. That will **overwrite** the users' preference.

### Accessibility

There's two ways of a user changing the size of the pages it sees:

1. Tweaking the zoom levels
2. Adjusting their default font-size in the browser's settings.

For the first tweak, it does not matter if you are setting things in `px` or `rem`. Everything will always adjust to the ratio of zoom selected.

If the user, however, changes it's font-size preference, if you set everything using `px`, they will not be adjusted.

### PX x REM

The course advocates for using rem for font-sizes, while px for box model properties (margin, padding, border...), because it more intuitive.

While true, we can make usage of modern features like `styled-components` we can create a function to relate to it:

```javascript
function convertPixelToRem(pixel) {
  const rootSize = parseInt(window.getComputedStyle(document.querySelector('html')).fontSize);

  const rem = pixel / rootSize;

  return `${rem}rem`;
}
```

And use it all over our application without worrying about it!
