import { Container, Box } from "@mui/material";
// import { useTranslations } from "next-intl";
import styles from "./page.module.css";

export default function HomePage() {
  // const t = useTranslations("HomePage");

  return (
    <Container component="main">
      <Box className={styles.mainWrapper}></Box>
    </Container>
  );
}
