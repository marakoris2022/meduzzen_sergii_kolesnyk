import { Box, Container, Typography } from "@mui/material";
import React from "react";
import GithubLink from "./GithubLink";
import { themeConstants } from "../constants/themeConstants";

const Footer = () => {
  return (
    <Box component="footer">
      <Container>
        <Box
          sx={{
            height: themeConstants.headerHeight,
            backgroundColor: "menuGray.main",
            border: "1px solid",
            borderColor: "menuGray.light",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <Typography
            sx={{ display: { xs: "none", md: "block", lg: "block" } }}
          >
            Meduzzen Intern project
          </Typography>
          <Typography sx={{ display: { xs: "block", md: "none", lg: "none" } }}>
            Meduzzen
          </Typography>
          <GithubLink />
          <Typography>2024 Oct</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
