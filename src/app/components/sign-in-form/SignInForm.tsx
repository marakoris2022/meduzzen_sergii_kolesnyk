"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import styles from "./signInForm.module.css";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  emailValidation,
  passwordValidation,
} from "../../../constants/validationSchemas";
import { useTranslations } from "next-intl";
import { useState } from "react";
import UniversalModal from "../universal-modal/UniversalModal";
import { loginUser } from "@/services/axios-api-methods/axiosPost";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/state/hooks";
import { setToken } from "@/state/auth/authSlice";
import { PATHS, TOKEN } from "@/interface/interface";
import { useRouter } from "next/navigation";

type LoginFromProps = {
  email: string;
  password: string;
};

type ModalDataProps = {
  isModal: boolean;
  modalTitle: string;
  modalText: string;
  modalAction: null | JSX.Element;
};

const SuccessLoginAction = () => {
  const router = useRouter();
  const t = useTranslations("SignInForm");

  return (
    <Stack direction={"column"} alignItems={"center"}>
      <Button onClick={() => router.push(PATHS.MAIN)}>{t("LoginBtn")}</Button>
    </Stack>
  );
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
  const dispatch = useAppDispatch();

  const [modalData, setModalData] = useState<ModalDataProps>({
    isModal: false,
    modalTitle: "",
    modalText: "",
    modalAction: null,
  });

  const submitForm: SubmitHandler<LoginFromProps> = async (data) => {
    const { email, password } = data;

    try {
      const res = await loginUser(email, password);
      const token = res.result.access_token;

      if (token) {
        dispatch(setToken(res.result.access_token));
        localStorage.setItem(TOKEN.NAME, token);
      }

      setModalData({
        isModal: true,
        modalTitle: t("loggedSuccessfully"),
        modalText: t("welcomeBack"),
        modalAction: <SuccessLoginAction />,
      });
    } catch (error) {
      let errorMessage = "";

      if (error instanceof AxiosError && error.status === 422) {
        errorMessage = t("validationFailed");
      } else if (error instanceof AxiosError && error.status === 401) {
        errorMessage = t("incorrectUserPass");
      } else {
        errorMessage = (error as Error).message;
      }

      setModalData({
        isModal: true,
        modalTitle: t("authFailed"),
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
