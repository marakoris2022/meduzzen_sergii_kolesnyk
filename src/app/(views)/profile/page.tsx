"use client";

import { Button, Grid2 } from "@mui/material";
import styles from "./profile.module.css";
import { useUserData } from "@/app/hooks/useUserData";
import Loading from "@/app/components/loading/Loading";
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

  if (!userData) return null;

  const userStats = [
    { label: t("status"), value: userData.user_status || t("none") },
    { label: t("super"), value: userData.is_superuser ? t("yes") : t("no") },
    { label: t("id"), value: userData.user_id || t("none") },
    { label: t("city"), value: userData.user_city || t("none") },
    { label: t("phone"), value: userData.user_phone || t("none") },
  ];

  return (
    <Grid2 key={userData.user_id} container spacing={2} columns={12}>
      {userStats.map((item) => (
        <React.Fragment key={item.label}>
          <Grid2 size={6}>{item.label}</Grid2>
          <Grid2 size={6}>{item.value}</Grid2>
        </React.Fragment>
      ))}

      {Boolean(userData.user_links.length) ? (
        userData.user_links.map((link, index) => {
          return (
            <React.Fragment key={index}>
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
    <div className={styles.modalActionsWrapper}>
      <Button onClick={handleDeleteUser} color="error" variant="outlined">
        {t("deleteConfirm")}
      </Button>
      <Button onClick={handleCloseModal} color="success" variant="outlined">
        {t("close")}
      </Button>
    </div>
  );
}

const ProfilePage = () => {
  const t = useTranslations("ProfilePage");
  const { userData, isLoading } = useUserData();
  const [isModal, setIsModal] = useState<boolean>(false);
  const router = useRouter();
  const logout = useLogout();

  if (isLoading) return <Loading />;

  async function handleDeleteUser() {
    try {
      await deleteUser(userData!.user_id);
      logout();
    } catch {
      setIsModal(false);
    }
  }

  return (
    <main className="container">
      <UniversalModal
        open={isModal}
        handleClose={() => {
          setIsModal(false);
        }}
        title={t("delete")}
        description={t("confirmDelete")}
        footerActions={
          <ModalActions
            handleDeleteUser={handleDeleteUser}
            handleCloseModal={() => setIsModal(false)}
          />
        }
      />
      <div className={styles.wrapper}>
        <div className={styles.photoCardWrapper}>
          <div className={styles.photoWrapper}>
            <Image
              fill
              objectFit="cover"
              src={
                userData?.user_avatar
                  ? userData?.user_avatar
                  : "/no_avatar_main.webp"
              }
              alt="User_Avatar"
            />
          </div>
          <p>{userData?.user_email}</p>
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.userNameTitle}>
            <p>{userData?.user_firstname}</p>
            <p>{userData?.user_lastname}</p>
          </div>
          <div className={styles.tableWrapper}>
            <UserDataTable userData={userData!} />
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              color="warning"
              variant="outlined"
              endIcon={<SettingsOutlinedIcon />}
              onClick={() => {
                router.push(PATHS.PROFILE_EDIT);
              }}
            >
              {t("edit")}
            </Button>
            <Button
              color="error"
              variant="text"
              endIcon={<WarningAmberOutlinedIcon />}
              onClick={() => {
                setIsModal(true);
              }}
            >
              {t("delUser")}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
