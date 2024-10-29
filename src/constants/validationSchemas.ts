export const nameValidation = {
  required: "Field is required.",
  pattern: {
    value: /^[A-Za-z]+$/i,
    message: "Only Latin symbols.",
  },
  validate: (value: string) =>
    value[0] === value[0].toUpperCase() || "First letter must be uppercase.",
};

export const emailValidation = {
  required: "Email is required.",
  pattern: {
    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    message: "Invalid email address.",
  },
};

export const passwordValidation = {
  required: "Password is required.",
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters.",
  },
  pattern: {
    value:
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    message:
      "Must include uppercase, lowercase, number, and special character.",
  },
};
