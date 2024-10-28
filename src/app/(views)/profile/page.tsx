import { Box, Container } from "@mui/material";
import styles from "./profile.module.css";
// import { useTranslations } from "next-intl";

const ProfilePage = () => {
  // const t = useTranslations("ProfilePage");

  return (
    <Container>
      <Box className={styles.wrapper}></Box>
    </Container>
  );
};

export default ProfilePage;
