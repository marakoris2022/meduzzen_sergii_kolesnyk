"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import styles from "./signUpForm.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "../../../constants/validationSchemas";
import { useTranslations } from "next-intl";

type RegistrationFromProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    getValues,
    formState: { errors },
  } = useForm<RegistrationFromProps>({
    defaultValues: {},
  });
  const t = useTranslations("SignUpForm");

  const submitForm: SubmitHandler<RegistrationFromProps> = (data) => {
    console.log("Submitted", data);
  };

  return (
    <Box className={styles.formWrapper}>
      <Stack
        gap={3}
        className={styles.formWrapper}
        component={"form"}
        autoComplete="off"
        onSubmit={handleSubmit(submitForm)}
      >
        <Typography className={styles.formTitle} component={"h1"}>
          {t("title")}
        </Typography>
        <Stack gap={3} direction={{ sm: "column", md: "row" }}>
          <TextField
            {...register("firstName", nameValidation(t))}
            fullWidth
            error={!!errors.firstName}
            label={t("First Name")}
            helperText={errors.firstName ? errors.firstName.message : ""}
          />
          <TextField
            {...register("lastName", nameValidation(t))}
            fullWidth
            error={!!errors.lastName}
            label={t("Last Name")}
            helperText={errors.lastName ? errors.lastName.message : ""}
          />
        </Stack>
        <TextField
          {...register("email", emailValidation(t))}
          fullWidth
          error={!!errors.email}
          label={t("Email")}
          helperText={errors.email ? errors.email.message : ""}
        />
        <Stack gap={3} direction={{ sm: "column", md: "row" }}>
          <TextField
            {...register("password", passwordValidation(t))}
            fullWidth
            type="password"
            error={!!errors.password}
            label={t("Password")}
            helperText={errors.password ? errors.password.message : ""}
          />
          <TextField
            {...register("confirmPassword", {
              required: t("Confirm Required"),
              validate: (value) =>
                value === getValues("password") || t('"Passwords Match"'),
            })}
            fullWidth
            type="password"
            error={!!errors.confirmPassword}
            label={t("Confirm Password")}
            helperText={
              errors.confirmPassword ? errors.confirmPassword.message : ""
            }
          />
        </Stack>
        <Stack gap={3} direction={{ sm: "column", md: "row" }}>
          <Button type="submit" variant="outlined" fullWidth>
            {t("Sign_up")}
          </Button>
          <Button
            onClick={() => {
              clearErrors();
              reset();
            }}
            variant="outlined"
            color="warning"
            fullWidth
          >
            {t("Reset")}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SignUpForm;
