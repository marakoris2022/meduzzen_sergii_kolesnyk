"use client";

import { Button } from "@mui/material";
import styles from "./page.module.css";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useUserData } from "./hooks/useUserData";
import { PATHS } from "@/interface/interface";
import Loading from "./components/loading/Loading";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const { userData, isLoading } = useUserData();

  if (isLoading) return <Loading />;

  return (
    <main className="container">
      <div className={styles.mainWrapper}>
        {userData ? (
          <>
            <div className={styles.videoWrapper}>
              <div className={styles.videoWrapperHeigh} />
            </div>
            <h2 className={styles.mainTitle}>{t("title")}</h2>
            <h3 className={styles.mainUser}>{userData.user_email}</h3>
          </>
        ) : (
          <>
            <h2 className={styles.title}>{t("title2")}</h2>
            <h3>{t("account")}</h3>
            <Link className={styles.link} href={PATHS.SIGNIN}>
              <Button variant="outlined" fullWidth>
                {t("signin")}
              </Button>
            </Link>
            <Link className={styles.link} href={PATHS.SIGNUP}>
              <Button variant="outlined" fullWidth>
                {t("signup")}
              </Button>
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
