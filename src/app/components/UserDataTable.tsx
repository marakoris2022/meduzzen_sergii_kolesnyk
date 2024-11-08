import { UserProps } from "@/interface/interface";
import { Grid2 } from "@mui/material";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

function UserDataTable({ userData }: { userData: UserProps }) {
  const t = useTranslations("ProfilePage");

  if (!userData) return null;

  const userStats = [
    { label: t("status"), value: userData.user_status || t("none") },
    { label: t("super"), value: userData.is_superuser ? t("yes") : t("no") },
    { label: t("id"), value: userData.user_id || t("none") },
    { label: t("city"), value: userData.user_city || t("none") },
    { label: t("phone"), value: userData.user_phone || t("none") },
  ];

  return (
    <Grid2 key={userData.user_id} container spacing={2} columns={12}>
      {userStats.map((item) => (
        <Fragment key={item.label}>
          <Grid2 size={6}>{item.label}</Grid2>
          <Grid2 size={6}>{item.value}</Grid2>
        </Fragment>
      ))}

      {Boolean(userData.user_links.length) ? (
        userData.user_links.map((link, index) => {
          return (
            <Fragment key={index}>
              <Grid2 size={6}>{t("link")}</Grid2>
              <Grid2 size={6}>{link}</Grid2>
            </Fragment>
          );
        })
      ) : (
        <>
          <Grid2 size={6}>{t("link")}</Grid2>
          <Grid2 size={6}>{t("none")}</Grid2>
        </>
      )}
    </Grid2>
  );
}

export default UserDataTable;
