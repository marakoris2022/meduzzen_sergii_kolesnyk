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

const Avatar = () => {
  const { userData } = useUserData();
  const [errorText, setErrorText] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<null | File>(null);
  const dispatch = useAppDispatch();

  if (!userData) return null;

  function validateFile(file: File) {
    if (file.name.length > 20) {
      setErrorText("File name is to long. Maximum 20 letters.");
      return false;
    }
    if (file.size > 600000) {
      setErrorText("File size it to big. Maximum 600Kb.");
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
    } else setErrorText("You need to choose file.");
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarContainer}>
        <Image
          fill={true}
          objectFit="cover"
          src={userData.user_avatar || "/no_image.webp"}
          alt={"No_Avatar"}
        />
      </div>
      <p>File selected: {selectedFile?.name}</p>
      {errorText && <Typography color="error">Error : {errorText}</Typography>}
      <div className={styles.btnWrapper}>
        <Button
          className={styles.uploadBtn}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<AccountBoxIcon />}
        >
          Select an Avatar
          <VisuallyHiddenInput
            type="file"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleChange}
          />
        </Button>
        <Button onClick={handleSubmit} variant="outlined" color="success">
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Avatar;
