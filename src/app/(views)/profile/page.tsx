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
import React, { useState } from "react";
import { deleteUser } from "@/services/axios-api-methods/axiosDelete";
import { useLogout } from "@/app/hooks/useLogout";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

type ModalActionsProps = {
  handleDeleteUser: () => void;
  handleCloseModal: () => void;
};

function UserDataTable({ userData }: { userData: UserProps }) {
  const t = useTranslations("ProfilePage");
  return (
    <Grid2 key={userData.user_id} container spacing={2} columns={12}>
      <Grid2 size={6}>{t("status")}</Grid2>
      <Grid2 size={6}>{userData?.user_status || t("none")}</Grid2>

      <Grid2 size={6}>{t("super")}</Grid2>
      <Grid2 size={6}>{userData?.is_superuser ? t("yes") : t("no")}</Grid2>

      <Grid2 size={6}>{t("id")}</Grid2>
      <Grid2 size={6}>{userData?.user_id || t("none")}</Grid2>

      <Grid2 size={6}>{t("city")}</Grid2>
      <Grid2 size={6}>{userData?.user_city || t("none")}</Grid2>

      <Grid2 size={6}>{t("phone")}</Grid2>
      <Grid2 size={6}>{userData?.user_phone || t("none")}</Grid2>

      {Boolean(userData?.user_links.length) ? (
        userData?.user_links.map((link, index) => {
          return (
            <React.Fragment key={`${index}_fragment`}>
              <Grid2 size={6}>{t("link")}</Grid2>
              <Grid2 size={6}>{link}</Grid2>
            </React.Fragment>
          );
        })
      ) : (
        <>
          <Grid2 size={6}>{t("link")}</Grid2>
          <Grid2 size={6}>{t("none")}</Grid2>
        </>
      )}
    </Grid2>
  );
}

function ModalActions({
  handleDeleteUser,
  handleCloseModal,
}: ModalActionsProps) {
  const t = useTranslations("ProfilePage");
  return (
    <Stack gap={2} direction={"row"}>
      <Button onClick={handleDeleteUser} color="error" variant={"outlined"}>
        {t("delete_confirm")}
      </Button>
      <Button onClick={handleCloseModal} color={"success"} variant={"outlined"}>
        {t("close")}
      </Button>
    </Stack>
  );
}

const ProfilePage = () => {
  const t = useTranslations("ProfilePage");
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
        title={t("delete")}
        description={t("confirm_delete")}
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
              fill={true}
              objectFit="cover"
              src={
                userData?.user_avatar
                  ? userData?.user_avatar
                  : "/no_avatar_main.webp"
              }
              alt={"User_Avatar"}
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
              {t("edit")}
            </Button>
            <Button
              color={"error"}
              variant={"text"}
              endIcon={<WarningAmberOutlinedIcon />}
              onClick={() => {
                setIsModal(true);
              }}
            >
              {t("del_user")}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default ProfilePage;
