"use client";

import { useParams, useRouter } from "next/navigation";
import styles from "./userProfilePage.module.css";
import { useEffect, useState } from "react";
import { getUserById } from "@/services/axios-api-methods/axiosGet";
import { PATHS, UserProps } from "@/interface/interface";
import { AxiosError } from "axios";
import PageError from "@/app/components/users-page-error/PageError";
import Loading from "@/app/components/loading/Loading";
import UserAvatar from "@/app/components/user-avatar/UserAvatar";
import { Button, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import UniversalModal from "@/app/components/universal-modal/UniversalModal";
import InviteMemberForm from "@/app/components/invite-member-form/InviteMemberForm";
import UserGlobalRating from "@/app/components/user-global-rating/UserGlobalRating";

const UserProfilePage = () => {
  const t = useTranslations("UserProfilePage");
  const router = useRouter();
  const { userId } = useParams();
  const [error, setError] = useState<null | AxiosError>(null);
  const [userData, setUserData] = useState<null | UserProps>(null);
  const [isInviteModal, setIsInviteModal] = useState(false);

  const fetchUserData = async (id: number) => {
    try {
      const data = await getUserById(id);
      setUserData(data);
    } catch (error) {
      setError(error as AxiosError);
    }
  };

  useEffect(() => {
    fetchUserData(Number(userId));
  }, [userId]);

  if (error) {
    return (
      <PageError
        errorTitle={t("errorFetchingData")}
        actionTitle={t("backToUsers")}
        errorAction={() => router.push(`${PATHS.USERS}?page=1`)}
      />
    );
  }

  return !userData ? (
    <Loading />
  ) : (
    <div className="container">
      <UniversalModal
        open={isInviteModal}
        handleClose={() => setIsInviteModal(false)}
      >
        <InviteMemberForm memberId={Number(userId)} />
      </UniversalModal>

      <h1
        className={styles.pageTitle}
      >{`${userData.user_firstname} ${userData.user_lastname}`}</h1>
      <div className={styles.pageWrapper}>
        <aside className={styles.asideWrapper}>
          <UserAvatar avatarSrc={userData.user_avatar} />
          <div className={styles.userInfoWrapper}>
            <h3>{t("contactInfo")}</h3>
            <p>
              {t("email")}: {userData.user_email}
            </p>
            <p>
              {t("phone")}: {userData.user_phone || t("notAvailable")}
            </p>
          </div>
        </aside>
        <section className={styles.sectionWrapper}>
          <h4 className={styles.userTitle}>{t("userDetails")}</h4>
          <TextField
            label={t("status")}
            fullWidth
            disabled
            defaultValue={userData.user_status || t("notProvided")}
          />
          <ul className={styles.userInfoList}>
            <li>
              {t("city")}: {userData.user_city || t("unknown")}
            </li>
            {userData.user_links &&
              userData.user_links.map((link) => (
                <li key={link}>
                  {t("link")}: {link}
                </li>
              ))}
            <li>
              {t("superuser")}: {userData.is_superuser ? t("yes") : t("no")}
            </li>
          </ul>
          <UserGlobalRating userId={Number(userId)} />
        </section>
      </div>
      <div className={styles.backBtnWrapper}>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => router.back()}
        >
          {t("back")}
        </Button>
        <Button
          variant="outlined"
          color="success"
          onClick={() => setIsInviteModal(true)}
        >
          {t("invite")}
        </Button>
      </div>
    </div>
  );
};

export default UserProfilePage;
