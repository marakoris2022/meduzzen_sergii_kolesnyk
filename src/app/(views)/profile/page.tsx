"use client";

import {
  Box,
  Button,
  Container,
  Grid2,
  Stack,
  Typography,
} from "@mui/material";
import styles from "./profile.module.css";
import { useUserData } from "@/app/hooks/useUserData";
import Loading from "@/app/components/Loading";
import Image from "next/image";
import { UserProps } from "@/interface/interface";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

function UserDataTable({ userData }: { userData: UserProps }) {
  return (
    <Grid2 container spacing={2} columns={12}>
      <Grid2 size={6}>Super User: </Grid2>
      <Grid2 size={6}>{userData?.is_superuser ? "Yes" : "No"}</Grid2>

      <Grid2 size={6}>User Id: </Grid2>
      <Grid2 size={6}>{userData?.user_id || "none"}</Grid2>

      <Grid2 size={6}>City : </Grid2>
      <Grid2 size={6}>{userData?.user_city || "none"}</Grid2>

      <Grid2 size={6}>Phone: </Grid2>
      <Grid2 size={6}>{userData?.user_phone || "none"}</Grid2>

      <Grid2 size={6}>Social : </Grid2>
      <Grid2 size={6}>{userData?.user_links || "none"}</Grid2>
    </Grid2>
  );
}

const ProfilePage = () => {
  const { userData, isLoading } = useUserData();

  if (isLoading)
    return (
      <Container component="main">
        <Loading />
      </Container>
    );

  return (
    <Container>
      <Box className={styles.wrapper}>
        <Stack className={styles.photoCardWrapper} direction={"column"} gap={1}>
          <Box className={styles.photoWrapper}>
            <Image
              width={200}
              height={250}
              src={
                userData?.user_avatar
                  ? userData?.user_avatar
                  : "/no_avatar_main.webp"
              }
              alt={""}
            />
          </Box>
          <Typography>{userData?.user_email}</Typography>
        </Stack>
        <Stack className={styles.contentWrapper}>
          <Stack
            className={styles.userNameTitle}
            direction={"row"}
            justifyContent={"center"}
            gap={3}
          >
            <Typography>{userData?.user_firstname}</Typography>
            <Typography>{userData?.user_lastname}</Typography>
            <Typography color={userData?.user_status ? "success" : "error"}>
              {userData?.user_status ? "online" : "offline"}
            </Typography>
          </Stack>
          <Box className={styles.tableWrapper}>
            <UserDataTable userData={userData!} />
          </Box>
          <Box className={styles.buttonWrapper}>
            <Button
              color={"warning"}
              variant={"outlined"}
              endIcon={<SettingsOutlinedIcon />}
            >
              Edit Data
            </Button>
            <Button
              color={"error"}
              variant={"text"}
              endIcon={<WarningAmberOutlinedIcon />}
            >
              Delete Profile
            </Button>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
};

export default ProfilePage;
