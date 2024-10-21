import { Container, Typography, Box } from "@mui/material";

export default function Home() {
  return (
    <Box sx={{ height: "100vh", background: "black" }}>
      <Container
        sx={{
          height: "100vh",
        }}
      >
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
          <Typography variant="h1" sx={{ color: "white" }}>
            Welcome!
          </Typography>
          <Typography variant="h3" sx={{ color: "aqua" }}>
            Meduzzen Intern project
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
