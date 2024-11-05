"use client";

import { Button, TextField } from "@mui/material";
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
import Cookies from "js-cookie";
import { setUserData } from "@/state/user/userSlice";
import { getMe } from "@/services/axios-api-methods/axiosGet";

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
    <div className={styles.actionWrapper}>
      <Button onClick={() => router.push(PATHS.MAIN)}>{t("LoginBtn")}</Button>
    </div>
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
        Cookies.set(TOKEN.NAME, token, {
          expires: 7,
          secure: true,
          sameSite: "Strict",
        });
        const userData = await getMe();
        dispatch(setUserData(userData));
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
        autoComplete="off"
        className={styles.formWrapper}
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className={styles.formTitle}>{t("title")}</h1>

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
        <div className={styles.btnWrapper}>
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
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
