import { Box, Link, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

type GithubLinkProps = {
  url: string;
  title: string;
};

const GithubLink = ({ url, title }: GithubLinkProps) => {
  return (
    <Link href={url} target="_blank">
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
          {title}
        </Typography>
      </Box>
    </Link>
  );
};

export default GithubLink;
