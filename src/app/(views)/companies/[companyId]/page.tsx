"use client";

import { useParams, useRouter } from "next/navigation";
import styles from "./companyId.module.css";
import { useCallback, useEffect, useState } from "react";
import { getCompanyById } from "@/services/axios-api-methods/axiosGet";
import { CompanyIdProps, PATHS } from "@/interface/interface";
import { AxiosError } from "axios";
import PageError from "@/app/components/users-page-error/PageError";
import Loading from "@/app/components/loading/Loading";
import CompanyAvatar from "@/app/components/company-avatar/CompanyAvatar";
import UserAvatar from "@/app/components/user-avatar/UserAvatar";
import { Button, TextField } from "@mui/material";
import { useTranslations } from "next-intl";

const CompanyDetailsPage = () => {
  const t = useTranslations("CompanyDetailsPage");
  const router = useRouter();
  const { companyId } = useParams();
  const [error, setError] = useState<null | AxiosError>(null);
  const [companyIdData, setCompanyIdData] = useState<null | CompanyIdProps>(
    null
  );

  const fetchCompanyData = useCallback(async () => {
    try {
      const id = Number(companyId);
      const data = await getCompanyById(id);
      setCompanyIdData(data);
    } catch (error) {
      setError(error as AxiosError);
    }
  }, [companyId]);

  useEffect(() => {
    fetchCompanyData();
  }, [companyId, fetchCompanyData]);

  if (error) {
    return (
      <PageError
        errorTitle={t("fetchError")}
        actionTitle={t("backToCompanies")}
        errorAction={() => router.push(PATHS.COMPANIES)}
      />
    );
  }

  return !companyIdData ? (
    <Loading />
  ) : (
    <main className="container">
      <h1 className={styles.pageTitle}>{companyIdData.company_name}</h1>
      <div className={styles.pageWrapper}>
        <aside className={styles.asideWrapper}>
          <CompanyAvatar avatarSrc={companyIdData.company_avatar} />
          <div className={styles.authorWrapper}>
            <h3>{t("companyAuthor")}</h3>
            <UserAvatar avatarSrc={companyIdData.company_owner.user_avatar} />
            <div className={styles.authorNameWrapper}>
              <p>{companyIdData.company_owner.user_firstname}</p>
              <p>{companyIdData.company_owner.user_lastname}</p>
            </div>
            <p>{companyIdData.company_owner.user_email}</p>
          </div>
        </aside>
        <section className={styles.sectionWrapper}>
          <h4 className={styles.companyTitle}>{`${
            companyIdData.company_title || t("company")
          } ${t("info")}`}</h4>
          <TextField
            label={t("description")}
            multiline
            fullWidth
            disabled
            rows={4}
            defaultValue={companyIdData.company_description || t("notProvided")}
          />
          <ul className={styles.companyInfoWrapper}>
            <li>
              {t("city")}: {companyIdData.company_city || t("unknown")}
            </li>
            <li>
              {t("phone")}: {companyIdData.company_phone || t("unknown")}
            </li>
            {companyIdData.company_links &&
              companyIdData.company_links.map((link) => {
                return (
                  <li key={link}>
                    {t("link")}: {link}
                  </li>
                );
              })}
          </ul>
        </section>
      </div>
      <div className={styles.backBtnWrapper}>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => router.back()}
        >
          {t("back")}
        </Button>
      </div>
    </main>
  );
};

export default CompanyDetailsPage;
