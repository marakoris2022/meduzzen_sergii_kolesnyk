// validation.ts
export const nameValidation = (t: (key: string) => string) => ({
  required: t("required"),
  pattern: {
    value: /^[A-Za-z]+$/i,
    message: t("onlyLatinSymbols"),
  },
  validate: (value: string) =>
    value[0] === value[0].toUpperCase() || t("firstLetterUppercase"),
});

export const emailValidation = (t: (key: string) => string) => ({
  required: t("emailRequired"),
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: t("invalidEmail"),
  },
});

export const passwordValidation = (t: (key: string) => string) => ({
  required: t("passwordRequired"),
  minLength: {
    value: 8,
    message: t("passwordMinLength"),
  },
  pattern: {
    value:
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message: t("passwordComplexity"),
  },
});
