"use client";

import { getUsers } from "@/services/axios-api-methods/axiosGet";
import { Box, Container, Pagination, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styles from "./users.module.css";
import { UsersProps } from "@/interface/interface";
import Loading from "@/app/components/Loading";
import UserAccordion from "@/app/components/user-accordion/UserAccordion";

const UsersPage = () => {
  const t = useTranslations("UsersPage");
  const [page, setPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [usersData, setUsersData] = useState<null | UsersProps>(null);

  function handleChange(currentPage: number) {
    setPage(currentPage);
  }

  useEffect(() => {
    getUsers(page).then((data) => {
      console.log(data);

      setPagesCount(data.result.pagination.total_page);
      setUsersData(data);
    });
  }, [page]);

  if (!usersData) {
    return <Loading />;
  }

  return (
    <Container>
      <Stack alignItems={"center"}>
        <Typography className={styles.title} component={"h1"}>
          {t("title")}
          {usersData && ` : ( ${usersData.result.pagination.total_results} )`}
        </Typography>
        <Stack direction={"column"} gap={2} width={"80%"}>
          {usersData &&
            usersData.result.users.map((user) => {
              return (
                <UserAccordion
                  key={user.user_id}
                  user_id={user.user_id}
                  user_email={user.user_email}
                  user_firstname={user.user_firstname}
                  user_lastname={user.user_lastname}
                  user_avatar={user.user_avatar}
                />
              );
            })}
        </Stack>
        <Box className={styles.paginationWrapper}>
          <Pagination
            count={pagesCount}
            page={page}
            variant="outlined"
            color="secondary"
            onChange={(_, b) => handleChange(b)}
          />
        </Box>
      </Stack>
    </Container>
  );
};

export default UsersPage;
