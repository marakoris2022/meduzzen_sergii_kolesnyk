import { useTranslations } from "next-intl";

const CompaniesPage = () => {
  const t = useTranslations("CompaniesPage");

  return (
    <div className="container">
      <p>{t("companies")}</p>
    </div>
  );
};

export default CompaniesPage;
