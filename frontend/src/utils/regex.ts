export const isValidPhonenumber = (value: string) => {
  return /^\d{7,}$/.test(value.replace(/[\s()+\-\.]|ext/gi, ''));
};

export const isZipCodeValide = (value: string) => {
  const match = /\b\d{5}\b/g;
  return !match.test(value);
};

export const isUsernameInvalid = (username: string) => {
  const match = /^([a-z]|_|[0-9])+$/g;
  return !match.test(username);
};

export const isEmailInvalid = (email: string) => {
  const match =
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return !match.test(email);
};

export const isPasswordInvalid = (password: string) => {
  const match = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return !match.test(password);
};
