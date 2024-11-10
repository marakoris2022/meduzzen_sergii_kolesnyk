const nameRegex = /^[A-Za-z]+$/i;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const cityRegex = /^[A-Za-z\s]+$/i;
const phoneRegex = /^[+()0-9]+$/;
const linkValidationRegex =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

const maxFileSize = 600000;
const maxNameLength = 20;

export const noImagePath = "/no_image.webp";
export const accepterFileTypes = "image/png, image/jpeg, image/webp";

export function validateFile(file: File, t: (key: string) => string) {
  if (file.name.length > maxNameLength) {
    return t("long");
  }
  if (file.size > maxFileSize) {
    return t("size");
  }
  return false;
}

export const nameValidation = (t: (key: string) => string) => ({
  required: t("required"),
  pattern: {
    value: nameRegex,
    message: t("onlyLatinSymbols"),
  },
  validate: (value: string) =>
    value[0] === value[0].toUpperCase() || t("firstLetterUppercase"),
});

export const emailValidation = (t: (key: string) => string) => ({
  required: t("emailRequired"),
  pattern: {
    value: emailRegex,
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
    value: passwordRegex,
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
    value: cityRegex,
    message: t("onlyLatinSymbols"),
  },
});

export const phoneValidation = (t: (key: string) => string) => ({
  pattern: {
    value: phoneRegex,
    message: t("phoneInvalid"),
  },
  maxLength: {
    value: 15,
    message: t("phoneMaxLength"),
  },
});

export const linksValidation = (t: (key: string) => string) => ({
  required: t("required"),
  pattern: {
    value: linkValidationRegex,
    message: t("invalidLink"),
  },
  validate: (text: string) =>
    linkValidationRegex.test(text) ? true : t("invalidLink"),
});
