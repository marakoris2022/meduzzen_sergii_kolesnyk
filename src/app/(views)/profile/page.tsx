"use client";

import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./profile.module.css";
import { useUserData } from "@/app/hooks/useUserData";
import Loading from "@/app/components/Loading";
import Image from "next/image";
import { PATHS, UserProps } from "@/interface/interface";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import UniversalModal from "@/app/components/universal-modal/UniversalModal";
import { useState } from "react";
import { deleteUser } from "@/services/axios-api-methods/axiosDelete";
import { useLogout } from "@/app/hooks/useLogout";
import { useRouter } from "next/navigation";

type ModalActionsProps = {
  handleDeleteUser: () => void;
  handleCloseModal: () => void;
};

function UserDataTable({ userData }: { userData: UserProps }) {
  return (
    <Grid2 container spacing={2} columns={12}>
      <Grid2 size={6}>Super User: </Grid2>
      <Grid2 size={6}>{userData?.is_superuser ? "Yes" : "No"}</Grid2>

      <Grid2 size={6}>User Id: </Grid2>
      <Grid2 size={6}>{userData?.user_id || "none"}</Grid2>

      <Grid2 size={6}>City : </Grid2>
      <Grid2 size={6}>{userData?.user_city || "none"}</Grid2>

      <Grid2 size={6}>Phone: </Grid2>
      <Grid2 size={6}>{userData?.user_phone || "none"}</Grid2>

      <Grid2 size={6}>Social : </Grid2>
      <Grid2 size={6}>{userData?.user_links || "none"}</Grid2>
    </Grid2>
  );
}

function ModalActions({
  handleDeleteUser,
  handleCloseModal,
}: ModalActionsProps) {
  return (
    <Stack gap={2} direction={"row"}>
      <Button onClick={handleDeleteUser} color="error" variant={"outlined"}>
        Delete
      </Button>
      <Button onClick={handleCloseModal} color={"success"} variant={"outlined"}>
        Close
      </Button>
    </Stack>
  );
}

const ProfilePage = () => {
  const { userData, isLoading } = useUserData();
  const [isModal, setIsModal] = useState<boolean>(false);
  const router = useRouter();
  const logout = useLogout();

  if (isLoading)
    return (
      <Container component="main">
        <Loading />
      </Container>
    );

  async function handleDeleteUser() {
    try {
      await deleteUser(userData!.user_id);
      logout();
    } catch {
      setIsModal(false);
    }
  }

  function handleCloseModal() {
    setIsModal(false);
  }

  return (
    <Container>
      <UniversalModal
        open={isModal}
        handleClose={() => {
          setIsModal(false);
        }}
        title="Delete Profile?"
        description="Are you sure, you want to delete your profile? All data will be lost!"
        footerActions={
          <ModalActions
            handleDeleteUser={handleDeleteUser}
            handleCloseModal={handleCloseModal}
          />
        }
      />
      <Box className={styles.wrapper}>
        <Stack className={styles.photoCardWrapper} direction={"column"} gap={1}>
          <Box className={styles.photoWrapper}>
            <Image
              width={200}
              height={250}
              src={
                userData?.user_avatar
                  ? userData?.user_avatar
                  : "/no_avatar_main.webp"
              }
              alt={""}
            />
          </Box>
          <Typography>{userData?.user_email}</Typography>
        </Stack>
        <Stack className={styles.contentWrapper}>
          <Stack
            className={styles.userNameTitle}
            direction={"row"}
            justifyContent={"center"}
            gap={3}
          >
            <Typography>{userData?.user_firstname}</Typography>
            <Typography>{userData?.user_lastname}</Typography>
            <Typography color={userData?.user_status ? "success" : "error"}>
              {userData?.user_status ? "online" : "offline"}
            </Typography>
          </Stack>
          <Box className={styles.tableWrapper}>
            <UserDataTable userData={userData!} />
          </Box>
          <Box className={styles.buttonWrapper}>
            <Button
              color={"warning"}
              variant={"outlined"}
              endIcon={<SettingsOutlinedIcon />}
              onClick={() => {
                router.push(PATHS.PROFILE_EDIT);
              }}
            >
              Edit Data
            </Button>
            <Button
              color={"error"}
              variant={"text"}
              endIcon={<WarningAmberOutlinedIcon />}
              onClick={() => {
                setIsModal(true);
              }}
            >
              Delete Profile
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default ProfilePage;
