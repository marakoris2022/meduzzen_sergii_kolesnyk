import { useUserData } from "@/app/hooks/useUserData";
import {
  cityValidation,
  linksValidation,
  nameValidation,
  phoneValidation,
  statusValidation,
} from "@/constants/validationSchemas";
import {
  updateUserGeneralData,
  UpdateUserGeneralProps,
} from "@/services/axios-api-methods/axiosPut";
import { useAppDispatch } from "@/state/hooks";
import { setUserData } from "@/state/user/userSlice";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";

type EditGeneralFromProps = {
  user_firstname: string;
  user_lastname: string;
  user_status: string;
  user_city: string;
  user_phone: string;
  user_links: string;
};

type UpdateStatusType = {
  text: string;
  color: "success" | "error";
};

const updateStatusInit: UpdateStatusType = {
  text: "",
  color: "success",
};

const General = () => {
  const t = useTranslations("EditProfileGeneral");
  const dispatch = useAppDispatch();
  const { userData } = useUserData();
  const [updateStatus, setUpdateStatus] =
    useState<UpdateStatusType>(updateStatusInit);
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<EditGeneralFromProps>({
    defaultValues: { ...userData, user_links: userData?.user_links.join("\n") },
  });

  async function submit(data: EditGeneralFromProps) {
    try {
      const linksArray =
        data.user_links.length > 0 ? data.user_links.split("\n") : [];

      const requestData: UpdateUserGeneralProps = {
        ...data,
        user_links: linksArray,
      };

      await updateUserGeneralData(requestData, userData!.user_id);
      dispatch(setUserData({ ...userData, ...requestData }));
      setUpdateStatus({ text: t("updated"), color: "success" });
    } catch {
      setUpdateStatus({ text: t("wrong"), color: "error" });
    }
  }

  function handleReset() {
    clearErrors();
    reset();
    setUpdateStatus((state) => ({ ...state, text: "" }));
  }

  const editInputFields = [
    { name: "user_firstname", label: t("fName"), validation: nameValidation },
    { name: "user_lastname", label: t("lName"), validation: nameValidation },
    { name: "user_status", label: t("Status"), validation: statusValidation },
    { name: "user_city", label: t("City"), validation: cityValidation },
    { name: "user_phone", label: t("Phone"), validation: phoneValidation },
    {
      name: "user_links",
      label: t("Links"),
      validation: linksValidation,
      multiline: true,
      minRows: 3,
    },
  ];

  type NameProps =
    | "user_firstname"
    | "user_lastname"
    | "user_status"
    | "user_city"
    | "user_phone"
    | "user_links";

  return userData ? (
    <Stack component={"form"} onSubmit={handleSubmit(submit)} gap={3}>
      {editInputFields.map(({ name, label, validation, ...props }) => (
        <TextField
          key={name}
          error={!!errors[name as keyof typeof errors]}
          {...register(name as NameProps, validation(t))}
          label={label}
          helperText={errors[name as keyof typeof errors]?.message || ""}
          {...props}
        />
      ))}

      <Typography textAlign={"center"} color={updateStatus.color}>
        {updateStatus.text}
      </Typography>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        direction={"row"}
        gap={3}
      >
        <Button type="submit" variant="outlined" color="success">
          {t("Submit")}
        </Button>
        <Button onClick={handleReset} variant="outlined" color="warning">
          {t("Clear")}
        </Button>
      </Stack>
    </Stack>
  ) : null;
};

export default General;