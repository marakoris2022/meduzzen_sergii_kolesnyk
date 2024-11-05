"use client";

import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import styles from "./users.module.css";
import Loading from "@/app/components/loading/Loading";
import UserAccordion from "@/app/components/user-accordion/UserAccordion";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchUsersData, setPageNumber } from "@/state/users/usersSlice";
import { useRouter } from "next/navigation";
import { PATHS } from "@/interface/interface";

const UsersPage = () => {
  const t = useTranslations("UsersPage");
  const router = useRouter();

  const { usersData, pageCount, pageNumber, error } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();

  function handleChange(currentPage: number) {
    dispatch(setPageNumber(currentPage));
  }

  useEffect(() => {
    dispatch(fetchUsersData(pageNumber));
  }, [pageNumber]);

  if (error) {
    return (
      <main className="container">
        <div className={styles.errorWrapper}>
          <h6>{t("errorOccurred")}</h6>
          <p>{t("tryAgain")}</p>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => dispatch(fetchUsersData(pageNumber))}
          >
            {t("retry")}
          </Button>
          <Button
            variant="outlined"
            color="warning"
            onClick={() => router.push(PATHS.MAIN)}
          >
            {t("toMain")}
          </Button>
        </div>
      </main>
    );
  }

  if (!usersData) <Loading />;

  return (
    <main className="container">
      <Stack alignItems={"center"}>
        <Typography className={styles.title} component={"h1"}>
          {t("title")}
        </Typography>
        <Stack direction={"column"} gap={2} width={"80%"}>
          {usersData &&
            usersData.map((user) => {
              return <UserAccordion key={user.user_id} user={user} />;
            })}
        </Stack>
        <Box className={styles.paginationWrapper}>
          <Pagination
            count={pageCount}
            page={pageNumber}
            variant="outlined"
            color="secondary"
            onChange={(_, b) => handleChange(b)}
          />
        </Box>
      </Stack>
    </main>
  );
};

export default UsersPage;
