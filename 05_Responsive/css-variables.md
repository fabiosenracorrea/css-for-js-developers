# CSS Variables

One of the most exciting additions to the language!

> CSS variables aren't "variables" per say, it more like a brand new property!

And like a property, it has some peculiarities:

- We create one by starting it with `--` to differentiate from normal properties
- Much like color and font-size, they are inherited by ALL of our **children**. This means any element below the family tree in which a element had a variable defined can access it.
- Value read using the `var` function as in `color: var(--color-bg);`

Unlike many people tend to think, css variables are **not** global. In the example bellow:

```html
<style>
  a {
    --some-var: red;
  }
</style>

<main>
  <a href="#link"></a>
</main>
```

If we try to access it in our `main` element, it wil not work!

### Disabling inheritance

If, for some reason, we wanted to disable the inheritance, we could use a (brand new) api: `@property`

```css
@property --text-color {
  syntax: '<color>';
  inherits: false;
  initial-value: red;
}

main {
  --text-color: deeppink;
  color: var(--text-color);
}

section {
  color: var(--text-color);
}
```

This is still a relative new API, only available on Chrome and Edge. Be aware of this!

### Default Values

Its possible to define a default value if, for some reason, css can't find the variable:


```css
.btn {
  font-size: var(--custom-size, 16px);
}
```

### They are Reactive!

Preprocessor variables (Sass/Less) exists for quite a while. Why use css variables? Because **they are reactive**!

If you change its value, every property that references it also changes accordingly!!

## Responsive values

A great way of using these reactive variables is to define responsive values. A lot of UI components need to be adjusted on mobile sizes (Inputs, Buttons...). Apple, for example, recommends a minimum of 44x44px of tap size on their [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/ios/visual-design/adaptivity-and-layout/)

Instead of trying to define that size on each and every components that needs it, we might want to do something like this:

```css
  @media (pointer: coarse) {
    html {
      --min-tap-height: 44px;
    }
  }
```

Inside our global styles file. Because we are only setting it for folks with a "finger-like" pointer (a smartphone, for instance), its value will be **undefined** for other cases, meaning we can use our regular styles with no backfire:

```js
const FancyButton = styled.button`
  /* regular styles, including a min-height, as the one above will not work on pcs */

  min-height: var(--min-tap-height);
`;

const TextInput = styled.input`
  min-height: var(--min-tap-height, 32px);
`;
```

Using it like this makes every piece of UI react to the same, unique, value. Single source of truth!

## Combining Variables

We can combine CSS variables to make what we want! Look:

```css
body {
  --standard-border-width: 4px;
}

strong {
  --border-details: dashed goldenrod;
  border:
    var(--standard-border-width)
    var(--border-details);
}
```

Obviously, we still need the "final product" to be a valid declaration.

A better example can be given using the `hsl` color scheme:

```css
body {
  --pink-hue: 340deg;
  --blue-hue: 275deg;
  --intense: 100% 50%;

  --color-primary: hsl(
    var(--pink-hue)
    var(--intense)
  );
  --color-secondary: hsl(
    var(--blue-hue)
    var(--intense)
  );
}

```

With that, we can easily find patterns for our colors, and modify them as needed with a predefined set of intensity variables!!

A great way of doing this is for creating **dark mode** styles! (with the `prefers-color-scheme` media query)

## Calc magic

On CSS, we have the `calc` function that is able to calculate the 4 basic operations. Its great to use to be more descriptive, as in, trying to be clear we want an element to take up 1/7th of the available space:

```css
.something {
  width: 14.286%;
  width: calc(100% / 7);
}
```

But also, being able to **mix units** to get the end result:

```css
.something {
  width: calc(50% + 32px);
}
```

Its great, but we don't often this have many uses. With css variables, tho, we can combine the two to create really great patterns:

```css
article {
  padding: var(--spacing);
  border-radius: calc(var(--spacing) / 2);
  /*
    8px -> 4px
    16px -> 8px
  */
}
```

#### Calculating colors with HSL

```css
  :root {
    --red-hue: 0deg;
    --intense: 100% 50%;

    --red: hsl(
      var(--red-hue) var(--intense)
    );
    --orange: hsl(
      calc(var(--red-hue) + 20deg)
      var(--intense)
    );
    --yellow: hsl(
      calc(var(--red-hue) + 40deg)
      var(--intense)
    );
    --pinkred: hsl(
      calc(var(--red-hue) - 20deg)
      var(--intense)
    );
    --pink: hsl(
      calc(var(--red-hue) - 40deg)
      var(--intense)
    );
  }
```

It might not seem such a big deal, but if we are working with *gradients*, this thing SHINES!

Lets take a look at an example:

```css
:root {
  --root-hue: 0deg;
  --range: 220deg;
}
.box {
  --start-color: calc(
    var(--root-hue) - var(--range)
  );
  --end-color: calc(
    var(--root-hue) + var(--range)
  );

  width: 150px;
  height: 150px;
  border-radius: 2px;
  background: linear-gradient(
    45deg,
    hsl(var(--start-color) 100% 50%),
    hsl(var(--end-color) 100% 50%)
  );
}
```

With that little calculation, we can create a ranged gradient using the color scheme to our advantage!
