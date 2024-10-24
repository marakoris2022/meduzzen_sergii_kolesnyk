import { Container, Typography, Box } from "@mui/material";
import { useTranslations } from "next-intl";

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
        <Typography color="primary" variant="h1">
          {t("title")}
        </Typography>
        <Typography color="secondary" variant="h3">
          {t("sub-title")}
        </Typography>
      </Box>
    </Container>
  );
}
