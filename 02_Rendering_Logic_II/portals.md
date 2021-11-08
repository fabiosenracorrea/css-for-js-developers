# Portals

Sometimes we want pieces of our UI to always be on top of the rest of the elements. That is the case for modals, tooltips, menus and selects and so fourth.

Because of what we've seen on [stacking context](./stacking-context.md), no matter how high we tweak our z-index, sometimes we can end up never being able to bring the element to the front.

For that, most front-end frameworks (react, angular, vue, svelte...) developed a *portal* mechanic, that allow us to render some piece of our UI at the same level as the top-level render element (#root on react, for example).

For the most part, portals are a *low* level mechanic, and we should rely on libraries that implement them with an easy and accessible API. For react, that would be [Reach UI](https://reach.tech/), a library without any style opinion and focused on accessibility.

That means that we can still localize the element interaction where it should be, but it will be rendered outside of the parent's context, to 'escape' stacking contexts.

BUT! Thats not all. Because of how the stacking context works, and how elements are displayed when we tweak the z-index,if an element inside our application (#root) changes its z-index, it can still cause problems with our portals, as they don't normally set a z-index value (and it would just get us back to z-index wars).

To solve this issue, we can simply use the `isolation` property learned before!

Simply doing

```css
  /* your framework renderer element */
  #root {
    isolation: isolate;
  }
```

We'll guarantee that,at the top level, the application has no z-index defined. Since our portal won't have it as well, but it's going to be later in the DOM order, it will always come on top!

- [React Portals](https://reactjs.org/docs/portals.html)
