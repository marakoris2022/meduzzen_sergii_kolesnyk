import { Box, Container, Typography } from "@mui/material";
import GithubLink from "../github-link/GithubLink";
import { themeConstants } from "../../../constants/themeConstants";
import { useTranslations } from "next-intl";
import styles from "./footer.module.css";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <Box component="footer">
      <Container>
        <Box
          className={styles.footerWrapper}
          sx={{
            height: themeConstants.headerHeight,
            backgroundColor: "menuGray.main",
            borderColor: "menuGray.light",
          }}
        >
          <Typography className={styles.titleLong}>{t("title")}</Typography>
          <Typography className={styles.titleShort}>Meduzzen</Typography>

          <GithubLink url="https://github.com/marakoris2022" title="SergiiK" />
          <Typography>2024 {t("month")}</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
