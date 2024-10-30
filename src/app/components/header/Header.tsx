"use client";

import { Box, Container, Stack } from "@mui/material";
import { themeConstants } from "../../../constants/themeConstants";
import Navigation from "../navigation/Navigation";
import LocaleSwitcher from "../LocaleSwitcher";
import LogoIcon from "../LogoIcon";
import Link from "next/link";
import { PATHS } from "@/interface/interface";
import styles from "./header.module.css";
import ExitButton from "../ExitButton";
import { useUserData } from "@/app/hooks/useUserData";

const Header = () => {
  const { userData } = useUserData();
  return (
    <Box component="header">
      <Container>
        <Box
          className={styles.headerWrapper}
          sx={{
            marginTop: themeConstants.headerMarginTop,
            height: themeConstants.headerHeight,
            backgroundColor: "menuGray.main",
            borderColor: "menuGray.light",
          }}
        >
          <Link href={PATHS.MAIN}>
            <LogoIcon />
          </Link>
          <LocaleSwitcher />
          <Stack direction={"row"} gap={2}>
            <Navigation />
            {userData && <ExitButton />}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
