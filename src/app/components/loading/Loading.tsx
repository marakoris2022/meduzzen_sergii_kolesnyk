import { CircularProgress } from "@mui/material";
import { useTranslations } from "next-intl";
import styles from "./loading.module.css";

const Loading = () => {
  const t = useTranslations("Loading");

  return (
    <div className="container">
      <div className={styles.loadingWrapper}>
        <CircularProgress color="secondary" />
        <p>{t("loading")}</p>
      </div>
    </div>
  );
};

export default Loading;
