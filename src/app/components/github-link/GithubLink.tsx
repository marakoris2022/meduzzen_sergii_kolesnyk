import { Box, Link, Typography } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import styles from "./githubLink.module.css";

type GithubLinkProps = {
  url: string;
  title: string;
};

const GithubLink = ({ url, title }: GithubLinkProps) => {
  return (
    <Link href={url} target="_blank">
      <Box className={styles.wrapper}>
        <GitHubIcon fontSize="small" color="success" />
        <Typography color="primary" component="span">
          {title}
        </Typography>
      </Box>
    </Link>
  );
};

export default GithubLink;
