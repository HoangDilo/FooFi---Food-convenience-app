export const isValidUri = (uri: string) => {
  const uriSubstring = uri ? uri.slice(0, 50) : '';
  const regex =
    /^(https?:\/\/|file:\/\/\/?)([\da-z\.-]+)?([a-z\.]{2,6})?([/\\\w \.-]*)*\/?$/i;
  return regex.test(uriSubstring);
};
