import { Box, Container } from "@mui/material";
import { themeConstants } from "../../../constants/themeConstants";
import Navigation from "../navigation/Navigation";
import LocaleSwitcher from "../LocaleSwitcher";
import LogoIcon from "../LogoIcon";
import Link from "next/link";
import { PATHS } from "@/interface/interface";
import styles from "./header.module.css";

const Header = () => {
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
          <Navigation />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
