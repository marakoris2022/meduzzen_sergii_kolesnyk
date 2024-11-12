"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import styles from "./users.module.css";
import Loading from "@/app/components/loading/Loading";
import UserAccordion from "@/app/components/user-accordion/UserAccordion";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchUsersData, setPageNumber } from "@/state/users/usersSlice";
import PageError from "@/app/components/users-page-error/PageError";
import PaginationCustom from "@/app/components/pagination-custom/PaginationCustom";

const UsersPage = () => {
  const t = useTranslations("UsersPage");

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

  if (!usersData) <Loading />;

  return (
    <main className="container">
      {error ? (
        <PageError
          errorTitle={t(error)}
          errorAction={() => dispatch(fetchUsersData(pageNumber))}
        />
      ) : (
        <div className={styles.pageWrapper}>
          <h1 className={styles.title}>{t("title")}</h1>
          <div className={styles.cardsWrapper}>
            {usersData &&
              usersData.map((user) => {
                return <UserAccordion key={user.user_id} user={user} />;
              })}
          </div>
          <PaginationCustom
            pageCount={pageCount}
            currentPage={pageNumber}
            onChange={handleChange}
          />
        </div>
      )}
    </main>
  );
};

export default UsersPage;
