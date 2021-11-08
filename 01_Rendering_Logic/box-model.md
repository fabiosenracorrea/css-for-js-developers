# Box Model

By default, an HTML element can be divided into 4 different parts:

1. content
2. padding
3. border
4. margin

We can think of it as a box inside another box (and so on).

By default, the browser treats sizing relative only to the content box - behavior seen with the property `box-sizing: content-box`. This means that if we have the following css:

```css
  section {
    width: 200px;
  }

  section p {
    width: 100%;
    border: 4px solid black;
    padding: 10px;
  }
```

We would end up with our `p` tag having **228px** of size. This can be rather irritating when designing clean and responsive interfaces. To fix that, we change the behavior to `box-sizing: border-box`. Doing that would restrict our p to the initially set parent width, 200px.

### Defaults

Because of this behavior, its always good practice to set in a global definition for the box-sizing property:

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

## Space Filling

Check this HTML/CSS code:

```html
<style>
  * {
    box-sizing: border-box;
  }
  section {
    width: 500px;
    height: 250px;
    padding: 25px;
  }
  .box {
    width: 100%;
    height: 100%;
    border: 2px solid;
  }
</style>

<section>
  <div class="box"></div>
</section>
```

What are the dimensions of the box being created?

Despite using the `border-box` model, there is an important aspect to consider: The relative size looks up to the parent's **content** size. Since a 25px padding is being applied to it, the content will only get 450x200px available to fill, which, in turn, will be the box's size.


## Margin to Center

A common problem in the past, centering an HTML can be achieved by setting both it's side margins (left and right) to `auto`. This can be done to avoid tempering with flex/grid models, which mess with all the children of the container it has the property. But be aware, it will only work on the axial margins and on elements that have a *specified width*. Box elements (`display: block`) naturally span to full 'line width' so it works on them.
