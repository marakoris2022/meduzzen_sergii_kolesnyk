"use client";
import { useLocale, useTranslations } from "next-intl";
import { FormControl, NativeSelect } from "@mui/material";
import { setUserLocale } from "@/services/locale";
import styles from "./localSwitcher.module.css";

export default function LocaleSwitcher() {
  const t = useTranslations("LocalSwitcher");
  const locale = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    if (newLocale === locale) return;

    setUserLocale(newLocale);
  };

  return (
    <div className={styles.wrapper}>
      <FormControl fullWidth>
        <NativeSelect defaultValue={locale} onChange={handleChange}>
          <option value="en">{t("en")}</option>
          <option value="ua">{t("ua")}</option>
        </NativeSelect>
      </FormControl>
    </div>
  );
}
