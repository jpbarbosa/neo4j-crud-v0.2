export const fileNameFromString = (str: string): string => {
  return str
    .toLocaleLowerCase()
    .replaceAll(' ', '_')
    .replaceAll('/', '_')
    .replaceAll("'", '');
};
