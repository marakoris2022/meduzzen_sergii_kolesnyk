import { Container, Box } from "@mui/material";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <Container component="main">
      <Box className={styles.mainWrapper}></Box>
    </Container>
  );
}
