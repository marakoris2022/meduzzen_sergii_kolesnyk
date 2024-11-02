"use client";

import { Container, Box, Typography, Button, Stack } from "@mui/material";
import styles from "./page.module.css";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useUserData } from "./hooks/useUserData";
import { PATHS } from "@/interface/interface";
import Loading from "./components/Loading";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchUserDataById, fetchUsersData } from "@/state/users/usersSlice";

export default function HomePage() {
  const t = useTranslations("HomePage");
  const { userData, isLoading } = useUserData();
  const dispath = useAppDispatch();
  const users = useAppSelector((state) => state.users);

  if (isLoading)
    return (
      <Container component="main">
        <Loading />
      </Container>
    );

  return (
    <Container component="main">
      <Box className={styles.mainWrapper}>
        {userData ? (
          <Stack gap={3} alignContent={"center"}>
            <Box className={styles.videoWrapper}>
              <Box className={styles.videoWrapperHeigh} />
            </Box>
            <Typography className={styles.mainTitle} component={"h2"}>
              {t("title")}
            </Typography>
            <Typography className={styles.mainUser} component={"h3"}>
              {userData.user_email}
            </Typography>
            <Button
              onClick={async () => {
                await dispath(fetchUsersData(1));
                await dispath(fetchUserDataById(1));
                console.log(users);
              }}
            >
              Data
            </Button>
          </Stack>
        ) : (
          <>
            <Typography className={styles.title}>{t("title2")}</Typography>
            <Typography>{t("account")}</Typography>
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
      </Box>
    </Container>
  );
}
