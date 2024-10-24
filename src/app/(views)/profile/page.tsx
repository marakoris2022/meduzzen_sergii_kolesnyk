import { Box, Container, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const ProfilePage = () => {
  const t = useTranslations("ProfilePage");

  return (
    <Container>
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
          {t("description")}
        </Typography>
      </Box>
    </Container>
  );
};

export default ProfilePage;
