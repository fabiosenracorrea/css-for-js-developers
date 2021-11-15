export function getDisplayedValue(value, options) {
  const selectedOption = options.find(
    (option) => option.value === value
  );

  return selectedOption.displayName;
}
