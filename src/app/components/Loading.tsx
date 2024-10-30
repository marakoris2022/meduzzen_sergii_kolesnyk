import { CircularProgress, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

const Loading = () => {
  const t = useTranslations("Loading");

  return (
    <Stack direction={"column"} gap={3} alignItems={"center"} padding={"60px"}>
      <CircularProgress color="secondary" />
      <Typography color="warning">{t("loading")}</Typography>
    </Stack>
  );
};

export default Loading;
