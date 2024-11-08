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
import Image from "next/image";

const companiesNoAvatarImgPath = "/companiesNoImg300.webp";

const CompaniesPage = () => {
  const t = useTranslations("CompaniesPage");
  const { companiesData, pageCount, pageNumber, loading, error } =
    useAppSelector((state) => state.companies);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCompaniesData(pageNumber));
  }, [dispatch, pageNumber]);

  function handleChange(chosenPage: number) {
    dispatch(setCompaniesPageNumber(chosenPage));
  }

  if (error) {
    return <PageError errorTitle={t("error")} />;
  }

  if (loading) {
    return <Loading />;
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
                  <div className={styles.imgWrapper}>
                    <Image
                      fill
                      sizes="100%"
                      src={company.company_avatar || companiesNoAvatarImgPath}
                      alt={t("avatarAlt")}
                    ></Image>
                  </div>
                  <div className={styles.contentWrapper}>
                    <div className={styles.textWrapper}>
                      <h2 className={styles.companyName}>
                        {company.company_name}
                      </h2>
                      <p className={styles.companyTitle}>
                        {company.company_title}
                      </p>
                    </div>
                    <Button variant="outlined" onClick={() => {}}>
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
