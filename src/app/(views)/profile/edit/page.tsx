"use client";

import { Box, Container, Typography } from "@mui/material";
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
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProfileEditPage = () => {
  const [value, setValue] = useState(0);
  const router = useRouter();
  const t = useTranslations("ProfileEditPage");

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box className={styles.pageWrapper}>
        <Typography className={styles.pageTitle} variant={"h4"}>
          {t("edit")}
        </Typography>

        <Box className={styles.tabContainer}>
          <Box className={styles.tabWrapper}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label={t("General")} {...a11yProps(0)} />
              <Tab label={t("Password")} {...a11yProps(1)} />
              <Tab label={t("Avatar")} {...a11yProps(2)} />
              <Tab
                className={styles.backBtn}
                onClick={() => {
                  router.push(PATHS.PROFILE);
                }}
                label={t("back")}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <General />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Password />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Avatar />
          </CustomTabPanel>
        </Box>
      </Box>
    </Container>
  );
};

export default ProfileEditPage;
