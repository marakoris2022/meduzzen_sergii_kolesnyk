import { CompanyProps, PATHS } from "@/interface/interface";
import styles from "./companyListCard.module.css";
import CompanyAvatar from "../company-avatar/CompanyAvatar";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

const CompanyListCard = ({ company }: { company: CompanyProps }) => {
  const t = useTranslations("CompanyListCard");
  const router = useRouter();

  return (
    <div className={styles.companyCardWrapper} key={company.company_id}>
      <CompanyAvatar avatarSrc={company.company_avatar} />
      <div className={styles.contentWrapper}>
        <div className={styles.textWrapper}>
          <h2 className={styles.companyName}>{company.company_name}</h2>
          <p className={styles.companyTitle}>{company.company_title}</p>
        </div>
        <Button
          variant="outlined"
          onClick={() =>
            router.push(`${PATHS.COMPANIES}/${company.company_id}`)
          }
        >
          {t("open")}
        </Button>
      </div>
    </div>
  );
};

export default CompanyListCard;
