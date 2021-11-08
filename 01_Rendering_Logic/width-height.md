# Width Algorithms

## Auto

The default width of *block* elements. It will make the element span for all the available space, without breaking the parents length.

It may seem like block elements have `width: 100%`, but that's quite not right. Try to paste this html snipped on a blank page to see the effect of it:

```html
<html>
  <head>
    <style>
      body {
        width: 100vw;
      }

      h1 {
        margin: 0 16px;
        width: 100%;
        background-color: aqua;
      }
    </style>
  </head>

  <body>
    <h1>Hello World!</h1>
  </body>
</html>
```

See how it explodes out of the screen? That happens because of the margin we gave it. The total size of the line became 100vw + 32px, which is more than the screen size!

*Remove* the width declaration and see how the default `width: auto` behaves!

## Min Content

`width: min-content` Determines the *minimal* width a **parent** element can have **based on its children**.


## Max Content

`width: max-content` Also looks at the **parents children**, but will never break a line. So the element's width will be the smallest amount that can fit all of it's children **without** breaking any line.

The behavior for both of this values can be seen tweaking an `<h1>` with some text and spaces in it

## Fit Content

`width: fit-content` Kinda of a mix of max-min content, this property will clip the elements size relative to the smallest it can be. If a line-break would be necessary, unlike `max-content`, it happens.

## Max/Min Width

Can be used to restrain the elements width to a specified width. Can be a really good combo with relative width values (eg `width: 100%; max-width: 450px`);

# Height Algorithms

While the default width for *block* elements is `auto`, when it comes to their height, it somewhat close to `min-content`.

This can lead to a *really* frustrating interaction: When we want our content to fit the entire screen, giving it a `height: 100%` only to see it take no effect.

Example:

```html
<html>
  <head>
    <style>
      div {
        padding: 16px;
        background: aqua;
        height: 100%;
      }
    </style>
  </head>

  <body>
    <div>
      <h1>Hello World!</h1>
    </div>
  </body>
</html>
```

Why does this happen?

Because when we set the height to 100%, the element will look up his parent to find that value. If none of the parents have a set height, the behavior will be the `min-content` one!

To fix this:

- Give the `<html>` tag a `height: 100%`. Unique at the top level html tag, giving it a 100% height is equivalent of giving it the entire viewport's height
- Give the body the same 100% value and, to your container, a `min-height: 100%` to allow it grow as needed by our content

A common solution, also, would be to give the app's container (or the body itself) a `min-height: 100vh`.

> *vh* stands for *viewport height*. There's also *vw - viewport width*

But, be aware! This might not quite work on mobile phones, as the viewport height can be adjusted to more than "100% of the screen" on some cases.

Everything else works basically as the width.

One quick note, tho: Sometimes we want to do the min-height trick to position our footer properly on the pages. (Even the ones that the content itself don't have the proper page height). Sadly, with just what we got, we would still need more to solve this issue (*flexbox* is coming!)

Just as a quick note, the 'solution' covered later on:

```html
<html>
  <head>
    <style>
      html, body {
        height: 100%;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        min-height: 100%;
      }

      footer {
        border: solid hotpink;
        padding: 8px;
        /* This + flex-column + min-height does it! */
        margin-top: auto;
      }
    </style>
  </head>

  <body>
    <div class="wrapper">
      <p>
        I fill the viewport!
      </p>
      <footer>I'm at the bottom</footer>
    </div>
  </body>
</html>
```
