import { Container, Typography, Box } from "@mui/material";
import OpenModalTest from "./components/OpenModalTest";

export default function Home() {
  return (
    <Container component="main">
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
        <OpenModalTest
          title={"Main"}
          description={"modal is opened from main"}
        />
      </Box>
    </Container>
  );
}