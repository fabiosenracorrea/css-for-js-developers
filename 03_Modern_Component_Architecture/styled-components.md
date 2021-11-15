# Component Architecture

This module talks about components libraries and how to utilize them to make the best out of your CSS

Its focused on styled components, one of React's most famous styling libraries.

Since its knowledge i already have, this section will contain only the observations that i found interesting.

## Inversion of style control

When using styled components (and other style options that allow nesting), it's common to see declarations like this:

```js
const QuoteContainer = styled.div`
  a {
    color: pink;
  }
`
```

Declarations like this are too broad, and reach in to other component's to modify them.

A better solution, would be to use interpolation:

```js
const DefaultLink = styled.a`
  color: red;
`;

const QuoteContainer = styled.div`
  ${DefaultLink} {
    color: pink;
  }
`
```

This reduces the scope of our 'reach-in' style, but still makes so our application can apply styles to our components everywhere (in big apps, these components would be in different files). Its hard to understand where the styles are coming from when the app gets big enough.

The champion solution is to *invert control* and define, inside the own component, how it will react when its child of other components:

```js
const QuoteContainer = styled.div`
  ...some styles
`

const DefaultLink = styled.a`
  color: red;

  ${QuoteContainer} & {
    color: pink;
  }
`;
```

By doing this, we have **every** style applied to our components in one place. It can get to a point in which we have 5+ declarations like this. And its ok! Because we will always know where to look if we need any modifications to be done!

> Important: This does require us to import the containers to the files we want to invert control, increasing our JS bundle size

### Inversion without importing

```js
const ButtonGroup = styled.div.attrs({
  'data-id': 'ButtonGroup'
})`
  padding: 16px;
  border: 1px solid;
`;

const Button = styled.button`
  border-radius: 16px;

  [data-id=ButtonGroup] & {
    border-radius: 0px;
  }
`;
```

This version eliminates the need of importing, but adds complications:

- We cant assure "ButtonGroup" will be unique to all the application
- If we change that id inside our ButtonGroup file, things can break silently

