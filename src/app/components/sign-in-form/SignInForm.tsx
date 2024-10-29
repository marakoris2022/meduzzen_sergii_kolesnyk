"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import styles from "./signInForm.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  emailValidation,
  passwordValidation,
} from "../../../constants/validationSchemas";

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
          Sign In Form
        </Typography>

        <TextField
          {...register("email", emailValidation)}
          fullWidth
          error={!!errors.email}
          label="Email"
          helperText={errors.email ? errors.email.message : ""}
        />
        <TextField
          {...register("password", passwordValidation)}
          fullWidth
          type="password"
          error={!!errors.password}
          label="Password"
          helperText={errors.password ? errors.password.message : ""}
        />
        <Stack gap={3} direction={{ sm: "column", md: "row" }}>
          <Button type="submit" variant="outlined" fullWidth>
            Sign in
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
            Reset
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SignInForm;
