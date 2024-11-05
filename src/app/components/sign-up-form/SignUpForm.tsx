"use client";

import { Button, TextField } from "@mui/material";
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
  const t = useTranslations("SignUpForm");

  return (
    <div className={styles.modalActionWrapper}>
      <Button onClick={() => router.push(PATHS.SIGNIN)}>{t("LoginBtn")}</Button>
    </div>
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
        modalTitle: t("registrationSuccessTitle"),
        modalText: t("registrationSuccessText"),
        modalAction: <SuccessRegistrationAction />,
      });
    } catch (error) {
      let errorMessage = "";
      if (error instanceof AxiosError && error.status === 422) {
        errorMessage = t("validationFailed");
      } else if (error instanceof AxiosError && error.status === 400) {
        errorMessage = t("emailExists");
      } else {
        errorMessage = (error as Error).message;
      }
      setModalData({
        isModal: true,
        modalTitle: t("registrationFailedTitle"),
        modalText: errorMessage,
        modalAction: null,
      });
    }
  };

  return (
    <div className={styles.formWrapper}>
      <UniversalModal
        open={modalData.isModal}
        handleClose={() =>
          setModalData((state) => ({ ...state, isModal: false }))
        }
        title={modalData.modalTitle}
        description={modalData.modalText}
        footerActions={modalData.modalAction}
      />
      <form
        className={styles.formWrapper}
        autoComplete="off"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className={styles.formTitle}>{t("title")}</h1>
        <div className={styles.formMiddleWrapper}>
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
        </div>
        <TextField
          {...register("email", emailValidation(t))}
          fullWidth
          error={!!errors.email}
          label={t("Email")}
          helperText={errors.email ? errors.email.message : ""}
        />
        <div className={styles.formMiddleWrapper}>
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
        </div>
        <div className={styles.formMiddleWrapper}>
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
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
