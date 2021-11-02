# Color Formats

There are a various ways of representing colors on CSS. Let's have a look at the most common ones:

## Naming

We have a set of colors predefined to use, representing by their names - 'red', 'purple', 'blue' and so on. There's actually [140 different colors](https://www.w3schools.com/tags/ref_colornames.asp) that one can pick. But they are pretty limiting, and most normally are used for education purposes (or quick styling of demos and such)

## HEX Colors

Represented by the syntax `#FFFFFF` in which we represent red, green and blue using each 2 digits of hex values (total 256 possible representations of each color contribution). Most common across the web, it's **hard** to understand quickly how to modify the colors slightly.

## RGB

Same as HEX colors, representing red, green and blue with 256 possible values. But instead of using a hex scale, we use decimal. Example: `rgb(255, 0, 0)` (red).

## HSL

One of the more interesting ways of representing a color. We combine the angle (representing a color in a color wheel) with the levels of saturation and lightness to achieve our color.

Here's an example: `hsl(60deg 100% 50%)`. Here, if we wanted to tweak the color for a darker version, we could just adjust the lightness (3rd value) and quickly find the color we are looking for, without needing external tools for it.

**Important:** Because humans have different perceptions on colors depending on it's frequency, its hard to create an uniform representation with the same 'percepted' light. This can be seen if you contrast `hsl(234deg 100% 50%)` (dark-ish blue) to `hsl(50deg 100% 50%)` (yellow), which are opposed to each other on the 'color wheel' but seem to be at different lightness levels.


## Transparency

We can supply an additional channel to our color formats to specify our its opacity. Opacity values range from 0 to 1. Heres how to add it:

* **HEX**: add an *prefix* double hex digit to the color. Full opacity would be #**FF**FF0000, while zero would be #*00**FF0000;
* **RGB**: 'rgb' becomes 'rgba' and the last values are represented in percentages (or decimals). Eg: `rgba(255, 0, 0, 0.2)`;
* **HSL**: add the representation at the end with an slash followed by the decimal 0-1 representation. Eg: `hsl(340deg 100% 50% / 0.75)`;
