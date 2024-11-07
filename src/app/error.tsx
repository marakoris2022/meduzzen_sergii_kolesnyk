"use client";

import styles from "./error.module.css";
import { useTranslations } from "next-intl";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
