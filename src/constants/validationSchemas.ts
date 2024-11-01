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

export const statusValidation = (t: (key: string) => string) => ({
  maxLength: {
    value: 100,
    message: t("statusMaxLength"),
  },
});

export const cityValidation = (t: (key: string) => string) => ({
  maxLength: {
    value: 50,
    message: t("cityMaxLength"),
  },
  pattern: {
    value: /^[A-Za-z\s]+$/i,
    message: t("onlyLatinSymbols"),
  },
});

export const phoneValidation = (t: (key: string) => string) => ({
  pattern: {
    value: /^[+()0-9]+$/,
    message: t("phoneInvalid"),
  },
  maxLength: {
    value: 15,
    message: t("phoneMaxLength"),
  },
});

export const linksValidation = (t: (key: string) => string) => ({
  validate: (text: string) => {
    const arrayText = text.length > 0 ? text.split("\n") : "";

    if (arrayText) {
      for (let i = 0; i < arrayText.length; i++) {
        const regEx =
          /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
        if (!arrayText[i].match(regEx)) return t("invalidLink");
      }
    }

    return true;
  },
});
