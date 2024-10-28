import { Container, Typography, Box } from "@mui/material";
import { useTranslations } from "next-intl";
import TestInput from "./components/TestInput";

export default function HomePage() {
  const t = useTranslations("HomePage");

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
        <Typography sx={{ textAlign: "center" }} color="primary" variant="h1">
          {t("title")}
        </Typography>
        <Typography sx={{ textAlign: "center" }} color="secondary" variant="h3">
          {t("sub-title")}
        </Typography>
        <TestInput />
      </Box>
    </Container>
  );
}
