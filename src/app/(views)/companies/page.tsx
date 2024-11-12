"use client";

import { useTranslations } from "next-intl";
import styles from "./companies.module.css";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useEffect } from "react";
import {
  fetchCompaniesData,
  setCompaniesPageNumber,
} from "@/state/companies/companiesSlice";
import Loading from "@/app/components/loading/Loading";
import PageError from "@/app/components/users-page-error/PageError";
import CompanyListCard from "@/app/components/company-list-card/CompanyListCard";
import classNames from "classnames";
import PaginationCustom from "@/app/components/pagination-custom/PaginationCustom";

const CompaniesPage = () => {
  const t = useTranslations("CompaniesPage");
  const { companiesData, pageCount, pageNumber, loading, error } =
    useAppSelector((state) => state.companies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCompaniesData(pageNumber));
  }, [dispatch, pageNumber]);

  if (error) return <PageError errorTitle={t("error")} />;

  if (loading) return <Loading />;

  function handleChange(chosenPage: number) {
    dispatch(setCompaniesPageNumber(chosenPage));
  }

  return (
    <main className={classNames("container", styles.pageWrapper)}>
      <h1>{t("companiesList")}</h1>

      <div className={styles.cardsListWrapper}>
        {companiesData &&
          companiesData.map((company) => {
            return (
              <CompanyListCard key={company.company_id} company={company} />
            );
          })}
      </div>

      <PaginationCustom
        pageCount={pageCount}
        currentPage={pageNumber}
        onChange={handleChange}
      />
    </main>
  );
};

export default CompaniesPage;
