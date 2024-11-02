"use client";

// import { getUsers } from "@/services/axios-api-methods/axiosGet";
import { Box, Container, Pagination, Stack, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import styles from "./users.module.css";
// import { UsersProps } from "@/interface/interface";
import Loading from "@/app/components/Loading";
import UserAccordion from "@/app/components/user-accordion/UserAccordion";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchUsersData, setPageNumber } from "@/state/users/usersSlice";

const UsersPage = () => {
  const t = useTranslations("UsersPage");
  // const [page, setPage] = useState<number>(1);
  // const [pagesCount, setPagesCount] = useState<number>(1);
  // const [usersData, setUsersData] = useState<null | UsersProps>(null);

  const { usersData, pageCount, pageNumber } = useAppSelector(
    (state) => state.users
  );
  const dispath = useAppDispatch();

  function handleChange(currentPage: number) {
    dispath(setPageNumber(currentPage));
  }

  useEffect(() => {
    dispath(fetchUsersData(pageNumber));
  }, [pageNumber]);

  if (!usersData) {
    return <Loading />;
  }

  return (
    <Container>
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
    </Container>
  );
};

export default UsersPage;
