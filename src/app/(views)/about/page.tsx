import { useTranslations } from "next-intl";

const AboutPage = () => {
  const t = useTranslations("AboutPage");

  return (
    <div className="container">
      <p>{t("about")}</p>
    </div>
  );
};

export default AboutPage;
