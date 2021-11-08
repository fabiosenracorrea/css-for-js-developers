# Flow Layout

By default, the rendering of elements will occur using the *Flow Layout*, which means *block* elements (h1, div, main, header...) are greedy and take up the whole available width of space (*not* to be confused with `width: 100%`. Block elements have `width: auto`, which means they will take the available space, not more), stacking up vertically, while *inline* elements (span, strong, img...) stack horizontally.

Because of this, there is a set of rules that implicitly apply to them.

For example, *inline* elements don't want to disrupt the 'harmony' of their horizontal stack. This means a few sets of properties don't work on them. (If have ever tried to give a span a fixed height/width, you probably know this). You can space them with margins (left/right), but not give its sizing.

> *Important* There is **two** exceptions of this rule: "replacement elements", which are represented by tags that embeds a foreign object (img, video, canvas), and the `<button>` tag

## 'Magic Space'

Because of stacking horizontally, inline elements have a 'magical' space between them to, well, space them out a little bit. Try wrapping a fixed size img by a div, and then check its content size. You'll see space being occupied is more than the fixed img size.

You can fix that by doing 2 things:

- Give imgs `display: block`
- Set the `line-height` of the wrapping div to `0`.

## Wrapping

Inline elements can **wrap**! If the content inside a span can't fit the available width, it will grow to the next line to fit it.

One thing you gotta be aware, tho, is padding of these elements. When you give padding to a span that's wrapping its content, the padding left/right is only applied to the start/end of the whole content! This can be fixed by using

```css
  span {
    -webkit-box-decoration-break: clone;
    box-decoration-break: clone;
  }
```

## Inline block

Its a special type of display that allow us to 'open all css properties' to our element. So if an `<a>` is given it, you can set set it's height/width, and a `<div>` can now stack horizontally with a span.

> *But be aware!* inline-block elements **don't** wrap! Be sure to check if the element you are using it on will need it
