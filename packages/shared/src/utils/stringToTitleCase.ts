export const stringToTitleCase = (txt: string) => {
  return txt.replace(/_/g, ' ').replace(/\w\S*/g, (txt: string) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
