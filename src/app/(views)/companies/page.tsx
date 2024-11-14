"use client";

import { useTranslations } from "next-intl";
import styles from "./companies.module.css";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { useEffect } from "react";
import { fetchCompaniesData } from "@/state/companies/companiesSlice";
import Loading from "@/app/components/loading/Loading";
import PageError from "@/app/components/users-page-error/PageError";
import CompanyListCard from "@/app/components/company-list-card/CompanyListCard";
import classNames from "classnames";
import PaginationCustom from "@/app/components/pagination-custom/PaginationCustom";
import { useRouter, useSearchParams } from "next/navigation";
import { PATHS } from "@/interface/interface";

const CompaniesPage = () => {
  const t = useTranslations("CompaniesPage");
  const { companiesData, pageCount, loading, error } = useAppSelector(
    (state) => state.companies
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const pageNumber = Number(searchParams.get("page"));

  useEffect(() => {
    if (pageNumber) dispatch(fetchCompaniesData(pageNumber));
  }, [dispatch, pageNumber]);

  if (error || !pageNumber) return <PageError errorTitle={t("errorPage")} />;

  if (loading) return <Loading />;

  function handleChange(chosenPage: number) {
    router.push(`${PATHS.COMPANIES}?page=${chosenPage}`);
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
