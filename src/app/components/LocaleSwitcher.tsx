"use client";
import { useLocale, useTranslations } from "next-intl";
import { Box, FormControl, NativeSelect } from "@mui/material";
import { setUserLocale } from "@/services/locale";

export default function LocaleSwitcher() {
  const t = useTranslations("LocalSwitcher");
  const locale = useLocale();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    if (newLocale === locale) return;

    setUserLocale(newLocale);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <NativeSelect defaultValue={locale} onChange={handleChange}>
          <option value="en">{t("en")}</option>
          <option value="ua">{t("ua")}</option>
        </NativeSelect>
      </FormControl>
    </Box>
  );
}
