"use client";

import { Container, Box, Typography, Button } from "@mui/material";
import styles from "./page.module.css";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getMe } from "@/services/axios-api-methods/axiosGet";

async function handleClick() {
  console.log(await getMe());
}

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <Container component="main">
      <Box className={styles.mainWrapper}>
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
        <Button onClick={handleClick}>Get Me</Button>
      </Box>
    </Container>
  );
}
