import { Box, Typography } from "@mui/material";
import GithubLink from "../github-link/GithubLink";
import { themeConstants } from "../../../constants/themeConstants";
import { useTranslations } from "next-intl";
import styles from "./footer.module.css";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="container">
      <Box
        className={styles.footerWrapper}
        sx={{
          height: themeConstants.headerHeight,
          backgroundColor: "menuGray.main",
          borderColor: "menuGray.light",
        }}
      >
        <Typography className={styles.titleLong}>{t("title")}</Typography>
        <Typography className={styles.titleShort}>
          {t("title_short")}
        </Typography>

        <GithubLink url="https://github.com/marakoris2022" title="SergiiK" />
        <Typography>2024 {t("month")}</Typography>
      </Box>
    </footer>
  );
};

export default Footer;
