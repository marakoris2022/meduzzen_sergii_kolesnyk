import { passwordValidation } from "@/constants/validationSchemas";
import { Button, Switch, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import { updateUserPassword } from "@/services/axios-api-methods/axiosPut";
import { useUserData } from "@/app/hooks/useUserData";
import styles from "./passwordEdit.module.css";

type EditPasswordFromProps = {
  password: string;
  confirmPassword: string;
};

type UpdateStatusType = {
  text: string;
  color: "green" | "red";
};

const updateStatusInit: UpdateStatusType = {
  text: "",
  color: "green",
};

const Password = () => {
  const t = useTranslations("EditProfilePassword");
  const { userData } = useUserData();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [updateStatus, setUpdateStatus] =
    useState<UpdateStatusType>(updateStatusInit);

  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    getValues,
    formState: { errors },
  } = useForm<EditPasswordFromProps>({
    defaultValues: {},
  });

  function handleReset() {
    clearErrors();
    reset();
    setUpdateStatus((state) => ({ ...state, text: "" }));
  }

  async function submit(data: EditPasswordFromProps) {
    try {
      await updateUserPassword({
        user_password: data.password,
        user_password_repeat: data.confirmPassword,
        user_id: userData!.user_id,
      });
      setUpdateStatus({ text: t("updated"), color: "green" });
    } catch {
      setUpdateStatus({ text: t("wrong"), color: "red" });
    }
  }

  function handleSwitch() {
    setIsHidden((state) => !state);
  }

  return (
    <form className={styles.formWrapper} onSubmit={handleSubmit(submit)}>
      <div className={styles.visibilityWrapper}>
        <VisibilityOffOutlinedIcon color={!isHidden ? "disabled" : "primary"} />
        <Switch onChange={handleSwitch} />
        <VisibilityOutlinedIcon color={isHidden ? "disabled" : "primary"} />
      </div>

      <TextField
        autoComplete="false"
        type={isHidden ? "password" : "text"}
        {...register("password", passwordValidation(t))}
        label={t("nPassword")}
        error={!!errors.password}
        helperText={errors.password?.message || ""}
      ></TextField>
      <TextField
        autoComplete="false"
        type={isHidden ? "password" : "text"}
        {...register("confirmPassword", {
          required: t("Confirm Required"),
          validate: (value) =>
            value === getValues("password") || t("Passwords Match"),
        })}
        label={t("cPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message || ""}
      ></TextField>

      <p className={styles.updateText} style={{ color: updateStatus.color }}>
        {updateStatus.text}
      </p>
      <div className={styles.btnWrapper}>
        <Button type="submit" variant="outlined" color="success">
          {t("Submit")}
        </Button>
        <Button onClick={handleReset} variant="outlined" color="warning">
          {t("Clear")}
        </Button>
      </div>
    </form>
  );
};

export default Password;
