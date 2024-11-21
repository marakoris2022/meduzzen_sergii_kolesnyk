"use client";

import { Button } from "@mui/material";
import styles from "./profile.module.css";
import { useUserData } from "@/app/hooks/useUserData";
import Loading from "@/app/components/loading/Loading";
import Image from "next/image";
import { PATHS } from "@/interface/interface";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import UniversalModal from "@/app/components/universal-modal/UniversalModal";
import React, { useState } from "react";
import { deleteUser } from "@/services/axios-api-methods/axiosDelete";
import { useLogout } from "@/app/hooks/useLogout";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import ProfileCompanies from "@/app/components/profile-companies/ProfileCompanies";
import UserDataTable from "@/app/components/UserDataTable";
import ProfileActions from "@/app/components/profile-actions/ProfileActions";
import UserGlobalRating from "@/app/components/user-global-rating/UserGlobalRating";
import ProfileAnalytics from "@/app/components/profile-analytics/ProfileAnalytics";

type ModalActionsProps = {
  handleDeleteUser: () => void;
  handleCloseModal: () => void;
};

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

  if (isLoading || !userData) return <Loading />;

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
      <div className={styles.companiesWrapper}>
        <UserGlobalRating userId={userData.user_id} />
      </div>
      <div className={styles.companiesWrapper}>
        <h3 className={styles.companiesTitle}>{t("myActions")}</h3>
        <ProfileActions userId={userData.user_id} />
      </div>
      <div className={styles.companiesWrapper}>
        <h3 className={styles.companiesTitle}>{t("companies")}</h3>
        <ProfileCompanies userId={userData.user_id} />
      </div>
      <div className={styles.companiesWrapper}>
        <h3 className={styles.companiesTitle}>{t("profileAnalytics")}</h3>
        <ProfileAnalytics userId={userData.user_id} />
      </div>
    </main>
  );
};

export default ProfilePage;
