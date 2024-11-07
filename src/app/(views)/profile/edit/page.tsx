"use client";

import { ReactNode, SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { PATHS } from "@/interface/interface";
import styles from "./editProfile.module.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import General from "../../../components/edit-page-panels/GeneralEditPanel";
import Avatar from "../../../components/edit-page-panels/AvatarEditPanel";
import Password from "../../../components/edit-page-panels/PasswordEditPanel";
import { useTranslations } from "next-intl";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <div>
      {value === index && <div className={styles.panelWrapper}>{children}</div>}
    </div>
  );
}

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
          <CustomTabPanel value={value} index={0}>
            <General />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Password />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Avatar />
          </CustomTabPanel>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;
