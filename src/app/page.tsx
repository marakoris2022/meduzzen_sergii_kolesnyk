import { Container, Box, Typography, Button } from "@mui/material";
import styles from "./page.module.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <Container component="main">
      <Box className={styles.mainWrapper}>
        <Typography>Welcome to the Quiz Application!</Typography>
        <Typography>Have you an account?</Typography>
        <Link href={"/signin"}>
          <Button>Sign In</Button>
        </Link>
        <Link href={"/signup"}>
          <Button>Sign Up</Button>
        </Link>
      </Box>
    </Container>
  );
}
