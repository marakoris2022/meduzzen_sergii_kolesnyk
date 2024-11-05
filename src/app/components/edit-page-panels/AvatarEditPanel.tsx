import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import styles from "./avatar.module.css";
import Image from "next/image";
import { useUserData } from "@/app/hooks/useUserData";
import { ChangeEvent, useState } from "react";
import { updateUserAvatar } from "@/services/axios-api-methods/axiosPut";
import { useAppDispatch } from "@/state/hooks";
import { fetchUserData } from "@/state/user/userSlice";
import { AxiosError } from "axios";
import { useTranslations } from "next-intl";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const maxFileSize = 600000;
const maxNameLength = 20;
const noImagePath = "/no_image.webp";
const accepterFileTypes = "image/png, image/jpeg, image/webp";

const Avatar = () => {
  const t = useTranslations("AvatarProfileGeneral");
  const { userData } = useUserData();
  const [errorText, setErrorText] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const dispatch = useAppDispatch();

  if (!userData) return null;

  function validateFile(file: File) {
    if (file.name.length > maxNameLength) {
      setErrorText(t("long"));
      return false;
    }
    if (file.size > maxFileSize) {
      setErrorText(t("size"));
      return false;
    }
    return true;
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      if (!validateFile(e.target.files[0])) return;
      const file = e.target.files[0];

      setSelectedFile(file);
      setErrorText("");
    }
  }

  async function handleSubmit() {
    if (selectedFile) {
      try {
        await updateUserAvatar(selectedFile, userData!.user_id);
        await dispatch(fetchUserData());
        setSelectedFile(null);
        setErrorText("");
      } catch (error) {
        setErrorText((error as AxiosError).message);
      }
    } else setErrorText(t("choose"));
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarContainer}>
        <Image
          fill={true}
          objectFit="cover"
          src={userData.user_avatar || noImagePath}
          alt={"No_Avatar"}
        />
      </div>
      <p>
        {t("file")}
        {selectedFile?.name}
      </p>
      {errorText && (
        <Typography color="error">
          {t("error")}
          {errorText}
        </Typography>
      )}
      <div className={styles.btnWrapper}>
        <Button
          className={styles.uploadBtn}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<AccountBoxIcon />}
        >
          {t("select")}
          <VisuallyHiddenInput
            type="file"
            accept={accepterFileTypes}
            onChange={handleChange}
          />
        </Button>
        <Button onClick={handleSubmit} variant="outlined" color="success">
          {t("submit")}
        </Button>
      </div>
    </div>
  );
};

export default Avatar;
