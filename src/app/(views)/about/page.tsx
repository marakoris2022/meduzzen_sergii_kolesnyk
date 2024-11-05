import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("AboutPage");

  return (
    <div className="container">
      <Typography>{t("about")}</Typography>
    </div>
  );
};

export default AboutPage;
