import { Container, Typography, Box } from "@mui/material";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <Link href={"/about"}>About</Link>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "60px",
        }}
      >
        <Typography color="primary" variant="h1">
          Welcome!
        </Typography>
        <Typography color="secondary" variant="h3">
          Meduzzen Intern project
        </Typography>
      </Box>
    </Container>
  );
}
