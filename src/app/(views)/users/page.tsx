"use client";

import { getUsers } from "@/services/axios-api-methods/axiosGet";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import styles from "./users.module.css";
import { UsersProps } from "@/interface/interface";
import RandomAvatar from "@/app/components/RandomAvatar/RandomAvatar";
import Image from "next/image";
import Loading from "@/app/components/Loading";

const UsersPage = () => {
  const t = useTranslations("UsersPage");
  const [page, setPage] = useState<number>(1);
  const [pagesCount, setPagesCount] = useState<number>(1);
  const [usersData, setUsersData] = useState<null | UsersProps>(null);

  const UserAccordion = (userData: UserAccordionProps) => {
    return (
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDownwardIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Stack className={styles.accordionHeadingWrapper} direction={"row"}>
            <Typography>{userData.user_email}</Typography>
            <Typography>{userData.user_id}</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction={"row"} gap={3}>
            <Box>
              {userData.user_avatar ? (
                <Image
                  src={userData.user_avatar}
                  alt={"Avatar"}
                  height={120}
                  width={100}
                />
              ) : (
                <RandomAvatar />
              )}
            </Box>
            <Stack>
              <Typography>{userData.user_firstname}</Typography>
              <Typography>{userData.user_lastname}</Typography>
            </Stack>
          </Stack>
        </AccordionDetails>
      </Accordion>
    );
  };

  function handleChange(currentPage: number) {
    setPage(currentPage);
  }

  type UserAccordionProps = {
    user_id: number;
    user_email: string;
    user_firstname: string;
    user_lastname: string;
    user_avatar: string | null;
  };

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
