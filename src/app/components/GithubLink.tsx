import { Box, Link, Typography } from "@mui/material";
import React from "react";
import GitHubIcon from "@mui/icons-material/GitHub";

const GithubLink = () => {
  return (
    <Link href={"https://github.com/marakoris2022"} target="_blank">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "1rem",
          border: "1px solid primary",
        }}
      >
        <GitHubIcon fontSize="small" color="success" />
        <Typography color="primary" component="span">
          SergiiK
        </Typography>
      </Box>
    </Link>
  );
};

export default GithubLink;
