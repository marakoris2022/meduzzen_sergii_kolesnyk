import { Box, Container, Typography } from "@mui/material";
import GithubLink from "./GithubLink";
import { themeConstants } from "../../constants/themeConstants";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <Box component="footer">
      <Container>
        <Box
          sx={{
            height: themeConstants.headerHeight,
            backgroundColor: "menuGray.main",
            border: "1px solid",
            borderColor: "menuGray.light",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <Typography
            sx={{ display: { xs: "none", md: "block", lg: "block" } }}
          >
            {t("title")}
          </Typography>
          <Typography sx={{ display: { xs: "block", md: "none", lg: "none" } }}>
            Meduzzen
          </Typography>
          <GithubLink url="https://github.com/marakoris2022" title="SergiiK" />
          <Typography>2024 {t("month")}</Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
