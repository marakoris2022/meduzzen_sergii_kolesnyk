import { Container, Box, Typography, Button } from "@mui/material";
import styles from "./page.module.css";
import Link from "next/link";
import { useTranslations } from "next-intl";

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
      </Box>
    </Container>
  );
}
