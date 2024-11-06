export const isValidUri = (uri: string) => {
  const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w \.-]*)*\/?$/;
  return regex.test(uri);
};
