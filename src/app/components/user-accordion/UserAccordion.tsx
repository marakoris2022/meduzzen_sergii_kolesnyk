import { AdditionalUserPropsCardProps, UserProps } from "@/interface/interface";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import RandomAvatar from "../RandomAvatar/RandomAvatar";
import Image from "next/image";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "./userAccordion.module.css";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/state/hooks";
import { fetchUserDataById } from "@/state/users/usersSlice";

type UserAccordionProps = {
  user: UserProps;
};

function AdditionalUserPropsCard({
  user_status,
  user_city,
  user_phone,
  user_links,
  is_superuser,
}: AdditionalUserPropsCardProps) {
  const t = useTranslations("UserAccordion");

  const userInfo = [
    { label: t("status"), value: user_status },
    { label: t("city"), value: user_city },
    { label: t("phone"), value: user_phone },
  ];

  return (
    <div className={styles.propsWrapper}>
      <ul>
        {userInfo.map((info) => (
          <li key={info.label}>
            <strong>{info.label}:</strong> {info.value || t("empty")}
          </li>
        ))}
      </ul>
      <p>
        <strong>{t("links")}:</strong>
      </p>
      <ul>
        {user_links ? (
          user_links.map((link, index) => (
            <li key={index}>
              <p>{link}</p>
            </li>
          ))
        ) : (
          <p>
            <strong>{t("empty")}</strong>
          </p>
        )}
      </ul>
      {is_superuser && (
        <div>
          <Chip label="Superuser" color="secondary" variant="outlined" />
        </div>
      )}
    </div>
  );
}

const UserAccordion = ({ user }: UserAccordionProps) => {
  const t = useTranslations("UserAccordion");
  const dispath = useAppDispatch();

  async function handleLoadData() {
    dispath(fetchUserDataById(user.user_id));
  }

  return (
    <Accordion onChange={handleLoadData}>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className={styles.accordionHeadingWrapper}>
          <p>
            {t("email")}: {user.user_email}
          </p>
          <p>
            {t("Id")}: {user.user_id}
          </p>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.accordionWrapper}>
          <div>
            {user.user_avatar ? (
              <Image
                src={user.user_avatar}
                alt="Avatar"
                height={120}
                width={100}
              />
            ) : (
              <RandomAvatar />
            )}
          </div>
          <div>
            <p>
              {t("name")}: {user.user_firstname}
            </p>
            <p>
              {t("firstName")}: {user.user_lastname}
            </p>
          </div>
          <AdditionalUserPropsCard
            user_status={user.user_status}
            user_city={user.user_city}
            user_phone={user.user_phone}
            user_links={user.user_links}
            is_superuser={user.is_superuser}
          />
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default UserAccordion;
