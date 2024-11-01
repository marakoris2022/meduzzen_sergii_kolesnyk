"use client";

import { Box, Container, Typography } from "@mui/material";
import styles from "./editProfile.module.css";
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useRouter } from "next/navigation";
import { PATHS } from "@/interface/interface";
import General from "../../../components/edit-page-panels/GeneralEditPanel";
import Avatar from "../../../components/edit-page-panels/AvatarEditPanel";
import Password from "../../../components/edit-page-panels/PasswordEditPanel";

interface TabPanelProps {
  children?: React.ReactNode;
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
  const [value, setValue] = React.useState(0);
  const router = useRouter();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box className={styles.pageWrapper}>
        <Typography className={styles.pageTitle} variant={"h4"}>
          Edit Profile
        </Typography>

        <Box className={styles.tabContainer}>
          <Box className={styles.tabWrapper}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="General" {...a11yProps(0)} />
              <Tab label="Password" {...a11yProps(1)} />
              <Tab label="Avatar" {...a11yProps(2)} />
              <Tab
                className={styles.backBtn}
                onClick={() => {
                  router.push(PATHS.PROFILE);
                }}
                label="Back to Profile"
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
