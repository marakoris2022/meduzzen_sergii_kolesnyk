import { Box, Container } from "@mui/material";
import { themeConstants } from "../../constants/themeConstants";
import Navigation from "./Navigation";
import LocaleSwitcher from "./LocaleSwitcher";
import LogoIcon from "./LogoIcon";
import Link from "next/link";
import { PATHS } from "@/interface/interface";

const Header = () => {
  return (
    <Box component="header">
      <Container>
        <Box
          sx={{
            marginTop: themeConstants.headerMarginTop,
            height: themeConstants.headerHeight,
            backgroundColor: "menuGray.main",
            border: "1px solid",
            borderColor: "menuGray.light",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
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
