import GithubLink from "../github-link/GithubLink";
import { themeConstants } from "../../../constants/themeConstants";
import { useTranslations } from "next-intl";
import styles from "./footer.module.css";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <footer className="container">
      <div
        className={styles.footerWrapper}
        style={{
          height: themeConstants.headerHeight,
          backgroundColor: "menuGray.main",
          borderColor: "menuGray.light",
        }}
      >
        <p className={styles.titleLong}>{t("title")}</p>
        <p className={styles.titleShort}>{t("title_short")}</p>

        <GithubLink url="https://github.com/marakoris2022" title="SergiiK" />
        <p>2024 {t("month")}</p>
      </div>
    </footer>
  );
};

export default Footer;
