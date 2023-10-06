export const toFirstLetterCapital = (value: string) => {
  if (value === "") return value;

  return `${value.toLowerCase().charAt(0).toUpperCase()}${value
    .toLowerCase()
    .substring(1)}`;
};
