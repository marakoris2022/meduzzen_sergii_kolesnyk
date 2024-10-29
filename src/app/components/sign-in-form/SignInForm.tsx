"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import styles from "./signInForm.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  emailValidation,
  passwordValidation,
} from "../../../constants/validationSchemas";
import { useTranslations } from "next-intl";

type LoginFromProps = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<LoginFromProps>({
    defaultValues: {},
  });

  const t = useTranslations("SignInForm");

  const submitForm: SubmitHandler<LoginFromProps> = (data) => {
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

        <TextField
          {...register("email", emailValidation(t))}
          fullWidth
          error={!!errors.email}
          label={t("Email")}
          helperText={errors.email ? errors.email.message : ""}
        />
        <TextField
          {...register("password", passwordValidation(t))}
          fullWidth
          type="password"
          error={!!errors.password}
          label={t("Password")}
          helperText={errors.password ? errors.password.message : ""}
        />
        <Stack gap={3} direction={{ sm: "column", md: "row" }}>
          <Button type="submit" variant="outlined" fullWidth>
            {t("Sign_in")}
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

export default SignInForm;
