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

const General = () => {
  const t = useTranslations("EditProfileGeneral");
  const [updateStatus, setUpdateStatus] = useState<{
    text: string;
    color: "success" | "error";
  }>({
    text: "",
    color: "success",
  });
  const dispatch = useAppDispatch();
  const { userData } = useUserData();
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<EditGeneralFromProps>({
    defaultValues: {
      user_firstname: userData?.user_firstname,
      user_lastname: userData?.user_lastname,
      user_status: userData?.user_status,
      user_city: userData?.user_city,
      user_phone: userData?.user_phone,
      user_links: userData?.user_links.join("\n"),
    },
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
      setUpdateStatus({ text: "Profile data is updated.", color: "success" });
    } catch {
      setUpdateStatus({ text: "Something wrong.", color: "error" });
    }
  }

  function handleReset() {
    clearErrors();
    reset();
    setUpdateStatus((state) => ({ ...state, text: "" }));
  }

  return userData ? (
    <Stack component={"form"} onSubmit={handleSubmit(submit)} gap={3}>
      <TextField
        error={!!errors.user_firstname}
        {...register("user_firstname", nameValidation(t))}
        label={"First Name"}
        helperText={errors.user_firstname ? errors.user_firstname.message : ""}
      />
      <TextField
        error={!!errors.user_lastname}
        {...register("user_lastname", nameValidation(t))}
        label={"Last Name"}
        helperText={errors.user_lastname ? errors.user_lastname.message : ""}
      />
      <TextField
        error={!!errors.user_status}
        {...register("user_status", statusValidation(t))}
        label={"Status"}
        helperText={errors.user_status ? errors.user_status.message : ""}
      />
      <TextField
        error={!!errors.user_city}
        {...register("user_city", cityValidation(t))}
        label={"City"}
        helperText={errors.user_city ? errors.user_city.message : ""}
      />
      <TextField
        error={!!errors.user_phone}
        {...register("user_phone", phoneValidation(t))}
        label={"Phone"}
        helperText={errors.user_phone ? errors.user_phone.message : ""}
      />
      <TextField
        error={!!errors.user_links}
        multiline
        minRows={3}
        {...register("user_links", linksValidation(t))}
        label={"User Links"}
        helperText={errors.user_links ? errors.user_links.message : ""}
      />

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
          Submit
        </Button>
        <Button onClick={handleReset} variant="outlined" color="warning">
          Clear
        </Button>
      </Stack>
    </Stack>
  ) : (
    <></>
  );
};

export default General;
