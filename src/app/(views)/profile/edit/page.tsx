"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/interface/interface";
import styles from "./editProfile.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import General from "../../../components/edit-page-panels/GeneralEditPanel";
import Avatar from "../../../components/edit-page-panels/AvatarEditPanel";
import Password from "../../../components/edit-page-panels/PasswordEditPanel";
import { useTranslations } from "next-intl";

const ProfileEditPage = () => {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const t = useTranslations("ProfileEditPage");

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="container">
      <div className={styles.pageWrapper}>
        <h4 className={styles.pageTitle}>{t("edit")}</h4>

        <div className={styles.tabContainer}>
          <div className={styles.tabWrapper}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label={t("general")} />
              <Tab label={t("password")} />
              <Tab label={t("avatar")} />
              <Tab
                className={styles.backBtn}
                onClick={() => {
                  router.push(PATHS.PROFILE);
                }}
                label={t("back")}
              />
            </Tabs>
          </div>
          {value === 0 && <General />}
          {value === 1 && <Password />}
          {value === 2 && <Avatar />}
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
