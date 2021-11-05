# Margin Collapse

Sometimes elements margin can collapse, that is, occupy the same space, instead of 'adding up'.

The most clear example of this can be seen if you give two paragraphs that are together one a margin-bottom and the other a margin-top

```html
<style>
  p {
    margin-top: 24px;
    margin-bottom: 24px;
  }
</style>

<p>Paragraph One</p>
<p>Paragraph Two</p>
```

You will notice the space between them is `24px`, **not** 48!

But we have a lot of rules about this:

## 1. Only Vertical Margins Collapse

When margin-collapse was added to the CSS specification, the language designers made a curious choice: **horizontal** margins (margin-left and margin-right) shouldn't collapse.

If, however, we change the *writing* mode to vertical, the behavior flips: now horizontal margins collapse! But this shouldn't come up very often.

## 2. Margins only collapse in *Flow Layout*

Elements inside a flex container will never collapse their margin!

## 3. Only adjacent elements collapse

If we put a `<br>` in between our two paragraphs, we no longer have the effect!

## 4. Bigger margin wins

And its the one that the elements will share as distance!

## 5. Nesting doesn't prevent collapsing!

```html
<style>
  p {
    margin-top: 48px;
    margin-bottom: 48px;
  }
</style>
<div>
  <p>Paragraph One</p>
</div>
<p>Paragraph Two</p>
```

This would also collapse!

Margin will always try and increase distance between siblings, even if it means transferring margin to the parent element! In this case, the effect is the same as if we had applied the margin to the parent `<div>`, not the child `<p>`.

And, there's a special trick on this one: margins *only* collapse when they are **touching**!!

If you have any padding/border in between, the margins won't collapse!

## 6. Margins can collapse in the same direction

And the bigger one wins!

## 7. 0px margin is still collapsible

```html
<style>
.blue {
  background-color: lightblue;
}
.pink {
  background-color: lightpink;
}

p {
  margin-top: 32px;
}
</style>

<section class="blue">
  <p>Paragraph One</p>
</section>

<section class="pink">
  <p>Paragraph Two</p>
</section>
```

Which means the code above would reproduce two colored rectangles spaced by 32px!

## 8. More than 2 margins can collapse

It could be as much as its present!

## 9. Negative margins

If they are all negative, the "more negative" one wins, similar to the positive effect.

If you find positive margins, tho, they are **added together**!

This trick can be useful to cancel out a margin you might not have control over it.

If there are more than one of each, the algorithm works like:

- Find the largest positive margin
- Find the largest ("more negative") negative margin
- Add those two numbers together

