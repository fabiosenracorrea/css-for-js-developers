# Hidden Content

There's a lot of ways of hiding content using CSS. But we need to be careful not to hurt our accessibility or search engine rankings.

## display: none

An element with `display: none` becomes essentially removed from the DOM: it is completely invisible and incorporeal.

### React parallel

On React, we can do

```jsx
function Widget({ showButton }) {
  return (
    <div>
      {showButton && <Button>Hello</Button>}
    </div>
  )
}
```

Ultimately, the differences between this and `display: none` are slim, but worth mentioning:

1. When using the CSS pattern, the element is still present in the DOM and consuming memory, while un-rendered elements don't.

2. If doing transitions, it may be smoother to do it with elements that already exist

At the end, it comes down to each specific case, most of the time either are fine.

## visibility: hidden

The item can't be seen, but it still **takes space**.

It can be selectively undone by children!

```html
<style>
  section {
    visibility: hidden;
  }
  .button.two {
    visibility: visible;
  }
</style>

<section>
  <button class="button one">
    First Button
  </button>
  <button class="button two">
    Second Button
  </button>
  <button class="button three">
    Third Button
  </button>
</section>
```

In the snippet above, we can only see the button two.

## opacity

Removing items with opacity **does not remove it from flow**.

This means buttons can still be clicked, text can be selected and form elements can be focused.

Opacity is not supposed to be used to simply hide elements from the UI.

## Accessibility

We can use a *visually hidden* css snippet to hide content we want to be meant exclusively to screen readers. It goes like:

```css
  .visually-hidden {
    position: absolute;
    overflow: hidden;
    clip: react(0 0 0 0);
    height: 1px;
    width: 1px;
    margin: -1px;
    padding: 0;
    border: 0;
  }
```

#### aria-label

We can also use an HTML attribute `aria-label` to describe our element for screen readers.

Using aria effectively is no small task: it's estimated that most aria attributes are incorrect. There are likely subtleties to using aria-label that I'm not experienced enough to identify. One such example: most automatic translation services will ignore aria-label, but will catch visually-hidden children.

### Hiding from screen readers

We can do that by using the `aria-hidden="true"` html attribute.

> Be careful! Setting this attribute on an element won't exclude any of its children from being target by tab usage!


