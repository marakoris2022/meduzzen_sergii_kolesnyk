import { Box, Container, Typography } from "@mui/material";
import { themeConstants } from "../constants/themeConstants";
import Navigation from "./Navigation";

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
          <Typography>Header</Typography>
          <Navigation />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
