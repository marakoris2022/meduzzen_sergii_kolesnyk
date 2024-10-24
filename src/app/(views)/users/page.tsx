import { Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const UsersPage = () => {
  const t = useTranslations("UsersPage");
  return (
    <Container>
      <Typography>{t("title")}</Typography>
    </Container>
  );
};

export default UsersPage;
