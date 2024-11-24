import { useTranslations } from "next-intl";
import styles from "./about.module.css";
import classNames from "classnames";

type TechProps = {
  id: number;
  name: string;
};

const technologies: TechProps[] = [
  { id: 1, name: "React 18" },
  { id: 2, name: "Next.js 14" },
  { id: 3, name: "Redux Toolkit" },
  { id: 4, name: "React Hook Form" },
  { id: 5, name: "Material UI" },
  { id: 6, name: "Chart.js" },
  { id: 7, name: "Socket.IO" },
  { id: 8, name: "Axios" },
  { id: 9, name: "TypeScript" },
  { id: 10, name: "Next-Intl" },
];

const AboutPage = () => {
  const t = useTranslations("AboutPage");

  return (
    <div className={classNames("container", styles.pageWrapper)}>
      <h1 className={styles.aboutTitle}>{t("title")}</h1>
      <p className={styles.aboutDescription}>{t("description")}</p>
      <h2 className={styles.aboutSubtitle}>{t("technologiesTitle")}</h2>
      <ul>
        {technologies.map((tech) => (
          <li key={tech.id}>{tech.name}</li>
        ))}
      </ul>
      <h2 className={styles.aboutSubtitle}>{t("skillsTitle")}</h2>
      <p>{t("skillsDescription")}</p>
    </div>
  );
};

export default AboutPage;
