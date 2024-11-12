import {
  AdditionalUserPropsCardProps,
  PATHS,
  UserProps,
} from "@/interface/interface";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import styles from "./userAccordion.module.css";
import { useTranslations } from "next-intl";
import { useAppDispatch } from "@/state/hooks";
import { fetchUserDataById } from "@/state/users/usersSlice";
import UserAvatar from "../user-avatar/UserAvatar";
import { memo } from "react";
import { useRouter } from "next/navigation";

type UserAccordionProps = {
  user: UserProps;
};

function AdditionalUserPropsCard({
  user_status,
  user_city,
  user_phone,
}: AdditionalUserPropsCardProps) {
  const t = useTranslations("UserAccordion");

  const userInfo = [
    { label: t("status"), value: user_status },
    { label: t("city"), value: user_city },
    { label: t("phone"), value: user_phone },
  ];

  return (
    <ul className={styles.propsWrapper}>
      {userInfo.map((info) => (
        <li key={info.label}>
          <strong>{info.label}:</strong> {info.value || t("empty")}
        </li>
      ))}
    </ul>
  );
}

const UserAccordion = memo(({ user }: UserAccordionProps) => {
  const t = useTranslations("UserAccordion");
  const dispatch = useAppDispatch();
  const router = useRouter();

  async function handleLoadData() {
    dispatch(fetchUserDataById(user.user_id));
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
          <UserAvatar avatarSrc={user.user_avatar} />
          <div className={styles.userProfileWrapper}>
            <p>
              {t("name")}: {user.user_firstname}
            </p>
            <p>
              {t("firstName")}: {user.user_lastname}
            </p>
            <Button
              onClick={() => router.push(`${PATHS.USERS}/${user.user_id}`)}
              variant="contained"
              color="info"
            >
              Profile
            </Button>
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
});

UserAccordion.displayName = "UserAccordion";

export default UserAccordion;
