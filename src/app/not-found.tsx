import Link from "next/link";
import styles from "./notFound.module.css";
import { PATHS } from "@/interface/interface";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <main className="container">
      <div className={styles.wrapper}>
        <h2>{t("title")}</h2>
        <p>{t("text")}</p>
        <Link href={PATHS.MAIN}>{t("button")}</Link>
      </div>
    </main>
  );
}
