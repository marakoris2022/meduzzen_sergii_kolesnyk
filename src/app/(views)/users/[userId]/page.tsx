"use client";

import { useParams, useRouter } from "next/navigation";
import styles from "./userProfilePage.module.css";
import { useCallback, useEffect, useState } from "react";
import { getUserById } from "@/services/axios-api-methods/axiosGet";
import { PATHS, UserProps } from "@/interface/interface";
import { AxiosError } from "axios";
import PageError from "@/app/components/users-page-error/PageError";
import Loading from "@/app/components/loading/Loading";
import UserAvatar from "@/app/components/user-avatar/UserAvatar";
import { Button, TextField } from "@mui/material";

const UserProfilePage = () => {
  const router = useRouter();
  const { userId } = useParams();
  const [error, setError] = useState<null | AxiosError>(null);
  const [userData, setUserData] = useState<null | UserProps>(null);

  const fetchUserData = useCallback(async () => {
    try {
      const id = Number(userId);
      const data = await getUserById(id);
      setUserData(data);
    } catch (error) {
      setError(error as AxiosError);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserData();
  }, [userId, fetchUserData]);

  if (error) {
    return (
      <PageError
        errorTitle="Error fetching user data"
        actionTitle="Back to Users"
        errorAction={() => router.push(PATHS.USERS)}
      />
    );
  }

  return !userData ? (
    <Loading />
  ) : (
    <main className="container">
      <h1
        className={styles.pageTitle}
      >{`${userData.user_firstname} ${userData.user_lastname}`}</h1>
      <div className={styles.pageWrapper}>
        <aside className={styles.asideWrapper}>
          <UserAvatar avatarSrc={userData.user_avatar} />
          <div className={styles.userInfoWrapper}>
            <h3>Contact Information</h3>
            <p>Email: {userData.user_email}</p>
            <p>Phone: {userData.user_phone || "N/A"}</p>
          </div>
        </aside>
        <section className={styles.sectionWrapper}>
          <h4 className={styles.userTitle}>User Details</h4>
          <TextField
            label="Status"
            fullWidth
            disabled
            defaultValue={userData.user_status || "Not provided"}
          />
          <ul className={styles.userInfoList}>
            <li>City: {userData.user_city || "Unknown"}</li>
            {userData.user_links &&
              userData.user_links.map((link) => (
                <li key={link}>Link: {link}</li>
              ))}
            <li>Superuser: {userData.is_superuser ? "Yes" : "No"}</li>
          </ul>
        </section>
      </div>
      <div className={styles.backBtnWrapper}>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => router.back()}
        >
          Back
        </Button>
      </div>
    </main>
  );
};

export default UserProfilePage;
