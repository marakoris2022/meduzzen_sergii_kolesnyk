"use client";

import { useEffect } from "react";
import styles from "./error.module.css";
import { useTranslations } from "next-intl";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const t = useTranslations("Error");

  return (
    <div className="container">
      <div className={styles.errorWrapper}>
        <h2>{t("title")}</h2>
        <button onClick={() => reset()}>{t("button")}</button>
      </div>
    </div>
  );
}
