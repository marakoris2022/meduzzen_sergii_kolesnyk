import { Link } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import styles from "./githubLink.module.css";

type GithubLinkProps = {
  url: string;
  title: string;
};

const GithubLink = ({ url, title }: GithubLinkProps) => {
  return (
    <Link href={url} target="_blank">
      <div className={styles.wrapper}>
        <GitHubIcon fontSize="small" color="success" />
        <span>{title}</span>
      </div>
    </Link>
  );
};

export default GithubLink;
