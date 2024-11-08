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
import { Button, Pagination } from "@mui/material";
import { PATHS } from "@/interface/interface";
import { useRouter } from "next/navigation";
import CompanyAvatar from "@/app/components/company-avatar/CompanyAvatar";

const CompaniesPage = () => {
  const t = useTranslations("CompaniesPage");
  const { companiesData, pageCount, pageNumber, loading, error } =
    useAppSelector((state) => state.companies);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCompaniesData(pageNumber));
  }, [dispatch, pageNumber]);

  if (error) {
    return <PageError errorTitle={t("error")} />;
  }

  if (loading) {
    return <Loading />;
  }

  function handleChange(chosenPage: number) {
    dispatch(setCompaniesPageNumber(chosenPage));
  }

  function handleClick(id: number) {
    router.push(`${PATHS.COMPANIES}/${id}`);
  }

  return (
    <main className="container">
      <div className={styles.pageWrapper}>
        <h1>{t("companiesList")}</h1>

        <div className={styles.cardsListWrapper}>
          {companiesData &&
            companiesData.map((company) => {
              return (
                <div
                  className={styles.companyCardWrapper}
                  key={company.company_id}
                >
                  <CompanyAvatar avatarSrc={company.company_avatar} />
                  <div className={styles.contentWrapper}>
                    <div className={styles.textWrapper}>
                      <h2 className={styles.companyName}>
                        {company.company_name}
                      </h2>
                      <p className={styles.companyTitle}>
                        {company.company_title}
                      </p>
                    </div>
                    <Button
                      variant="outlined"
                      onClick={() => handleClick(company.company_id)}
                    >
                      {t("open")}
                    </Button>
                  </div>
                </div>
              );
            })}
        </div>

        <div className={styles.paginationWrapper}>
          <Pagination
            count={pageCount}
            page={pageNumber}
            variant="outlined"
            color="secondary"
            onChange={(_, b) => handleChange(b)}
          />
        </div>
      </div>
    </main>
  );
};

export default CompaniesPage;
