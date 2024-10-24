import { Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("AboutPage");

  return (
    <Container>
      <Typography>{t("about")}</Typography>
    </Container>
  );
};

export default AboutPage;
