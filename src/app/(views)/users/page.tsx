"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import styles from "./users.module.css";
import Loading from "@/app/components/loading/Loading";
import UserAccordion from "@/app/components/user-accordion/UserAccordion";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchUsersData } from "@/state/users/usersSlice";
import PageError from "@/app/components/users-page-error/PageError";
import PaginationCustom from "@/app/components/pagination-custom/PaginationCustom";
import { useRouter, useSearchParams } from "next/navigation";
import { PATHS } from "@/interface/interface";

const UsersPage = () => {
  const t = useTranslations("UsersPage");
  const { usersData, pageCount, error } = useAppSelector(
    (state) => state.users
  );
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageNumber = searchParams.get("page");

  function handleChange(currentPage: number) {
    router.push(`${PATHS.USERS}?page=${currentPage}`);
  }

  useEffect(() => {
    if (pageNumber) dispatch(fetchUsersData(+pageNumber));
  }, [dispatch, pageNumber]);

  if (!usersData) <Loading />;

  return (
    <main className="container">
      {error || !pageNumber ? (
        <PageError
          errorTitle={t(error)}
          errorAction={() => router.push(`${PATHS.USERS}?page=1`)}
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
            currentPage={+pageNumber}
            onChange={handleChange}
          />
        </div>
      )}
    </main>
  );
};

export default UsersPage;
