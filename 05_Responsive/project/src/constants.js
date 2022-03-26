export const COLORS = {
  white: 'hsl(0deg 0% 100%)',
  gray: {
    100: 'hsl(185deg 5% 95%)',
    300: 'hsl(190deg 5% 80%)',
    500: 'hsl(196deg 4% 60%)',
    700: 'hsl(220deg 5% 40%)',
    900: 'hsl(220deg 3% 20%)',
  },
  primary: 'hsl(340deg 65% 47%)',
  secondary: 'hsl(240deg 60% 63%)',
};

export const WEIGHTS = {
  normal: 500,
  medium: 600,
  bold: 800,
};

export const BREAKPOINTS = {
  PHONE: 600,
  TABLET: 950,
  LAPTOP: 1300
}

const PIXEL_TO_REM = 16;

export const MEDIA = {
  PHONE: `@media(max-width: ${BREAKPOINTS.PHONE / PIXEL_TO_REM}rem)`,
  TABLET: `@media(max-width: ${BREAKPOINTS.TABLET / PIXEL_TO_REM}rem)`,
  LAPTOP: `@media(max-width: ${BREAKPOINTS.LAPTOP / PIXEL_TO_REM}rem)`
}
