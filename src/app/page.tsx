"use client";

import { Container, Box, Typography, Button } from "@mui/material";
import styles from "./page.module.css";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useUserData } from "./hooks/useUserData";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const { userData, isLoading } = useUserData();

  if (isLoading)
    return (
      <Container component="main">
        <Box className={styles.mainWrapper}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );

  return (
    <Container component="main">
      <Box className={styles.mainWrapper}>
        {userData ? (
          <Typography>Welcome: {userData.user_email}</Typography>
        ) : (
          <>
            <Typography className={styles.title}>{t("title")}</Typography>
            <Typography>{t("account")}</Typography>
            <Link className={styles.link} href={"/signin"}>
              <Button variant="outlined" fullWidth>
                {t("signin")}
              </Button>
            </Link>
            <Link className={styles.link} href={"/signup"}>
              <Button variant="outlined" fullWidth>
                {t("signup")}
              </Button>
            </Link>
          </>
        )}
      </Box>
    </Container>
  );
}
