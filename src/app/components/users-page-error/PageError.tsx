"use client";

import { Button } from "@mui/material";
import styles from "./pageError.module.css";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { PATHS } from "@/interface/interface";

type PageErrorType = {
  errorTitle: string;
  errorAction?: () => void;
};

const PageError = ({ errorTitle, errorAction }: PageErrorType) => {
  const t = useTranslations("PageError");
  const router = useRouter();

  return (
    <div className={styles.errorWrapper}>
      <h6>{errorTitle}</h6>
      {Boolean(errorAction) && (
        <>
          <p>{t("tryAgain")}</p>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => errorAction!()}
          >
            {t("retry")}
          </Button>
        </>
      )}
      <Button
        variant="outlined"
        color="warning"
        onClick={() => router.push(PATHS.MAIN)}
      >
        {t("toMain")}
      </Button>
    </div>
  );
};

export default PageError;
