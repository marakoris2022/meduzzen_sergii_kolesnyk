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
import { registerUser } from "@/services/axios-api-methods/axiosPost";
import { useState } from "react";
import UniversalModal from "../universal-modal/UniversalModal";
import { AxiosError } from "axios";
import { PATHS } from "@/interface/interface";
import { useRouter } from "next/navigation";

type RegistrationFromProps = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SuccessRegistrationAction = () => {
  const router = useRouter();

  return (
    <Stack direction={"column"} alignItems={"center"}>
      <Button onClick={() => router.push(PATHS.SIGNIN)}>To Login Page</Button>
    </Stack>
  );
};

type ModalDataProps = {
  isModal: boolean;
  modalTitle: string;
  modalText: string;
  modalAction: null | JSX.Element;
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
  const [modalData, setModalData] = useState<ModalDataProps>({
    isModal: false,
    modalTitle: "",
    modalText: "",
    modalAction: null,
  });

  const submitForm: SubmitHandler<RegistrationFromProps> = async (data) => {
    const { email, password, confirmPassword, firstName, lastName } = data;
    try {
      await registerUser(email, password, confirmPassword, firstName, lastName);

      setModalData({
        isModal: true,
        modalTitle: "Registration Success",
        modalText: "You will be redirected to the Login Page",
        modalAction: <SuccessRegistrationAction />,
      });
    } catch (error) {
      let errorMessage = "";
      if (error instanceof AxiosError && error.status === 422) {
        errorMessage = "Validation filed.";
      } else if (error instanceof AxiosError && error.status === 400) {
        errorMessage = "User email already exists.";
      } else {
        errorMessage = (error as Error).message;
      }
      setModalData({
        isModal: true,
        modalTitle: "Registration Failed",
        modalText: errorMessage,
        modalAction: null,
      });
    }
  };

  return (
    <Box className={styles.formWrapper}>
      <UniversalModal
        open={modalData.isModal}
        handleClose={() =>
          setModalData((state) => ({ ...state, isModal: false }))
        }
        title={modalData.modalTitle}
        description={modalData.modalText}
        footerActions={modalData.modalAction}
      />
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
