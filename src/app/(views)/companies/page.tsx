import { Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const CompaniesPage = () => {
  const t = useTranslations("CompaniesPage");

  return (
    <Container>
      <Typography>{t("companies")}</Typography>
    </Container>
  );
};

export default CompaniesPage;
