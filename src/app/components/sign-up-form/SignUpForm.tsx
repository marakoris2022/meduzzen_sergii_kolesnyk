"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import styles from "./signUpForm.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "../../../constants/validationSchemas";

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
          Registration Form
        </Typography>
        <Stack gap={3} direction={{ sm: "column", md: "row" }}>
          <TextField
            {...register("firstName", nameValidation)}
            fullWidth
            error={!!errors.firstName}
            label="First Name"
            helperText={errors.firstName ? errors.firstName.message : ""}
          />
          <TextField
            {...register("lastName", nameValidation)}
            fullWidth
            error={!!errors.lastName}
            label="Last Name"
            helperText={errors.lastName ? errors.lastName.message : ""}
          />
        </Stack>
        <TextField
          {...register("email", emailValidation)}
          fullWidth
          error={!!errors.email}
          label="Email"
          helperText={errors.email ? errors.email.message : ""}
        />
        <Stack gap={3} direction={{ sm: "column", md: "row" }}>
          <TextField
            {...register("password", passwordValidation)}
            fullWidth
            type="password"
            error={!!errors.password}
            label="Password"
            helperText={errors.password ? errors.password.message : ""}
          />
          <TextField
            {...register("confirmPassword", {
              required: "Confirm Password is required.",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match.",
            })}
            fullWidth
            type="password"
            error={!!errors.confirmPassword}
            label="Confirm Password"
            helperText={
              errors.confirmPassword ? errors.confirmPassword.message : ""
            }
          />
        </Stack>
        <Stack gap={3} direction={{ sm: "column", md: "row" }}>
          <Button type="submit" variant="outlined" fullWidth>
            Sign up
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

export default SignUpForm;
