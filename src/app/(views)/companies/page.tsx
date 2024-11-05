import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const CompaniesPage = () => {
  const t = useTranslations("CompaniesPage");

  return (
    <div className="container">
      <Typography>{t("companies")}</Typography>
    </div>
  );
};

export default CompaniesPage;
