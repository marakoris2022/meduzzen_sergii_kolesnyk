"use client";

import { useParams, useRouter } from "next/navigation";
import styles from "./companyId.module.css";
import { useEffect } from "react";
import { PATHS } from "@/interface/interface";
import PageError from "@/app/components/users-page-error/PageError";
import Loading from "@/app/components/loading/Loading";
import CompanyAvatar from "@/app/components/company-avatar/CompanyAvatar";
import UserAvatar from "@/app/components/user-avatar/UserAvatar";
import { Button, IconButton, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CompanyActions from "@/app/components/company-actions/CompanyActions";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchCompanyById } from "@/state/company-by-id/companyByIdSlice";
import AccordionCustom from "@/app/components/accordion-custom/AccordionCustom";

const CompanyDetailsPage = () => {
  const t = useTranslations("CompanyDetailsPage");
  const router = useRouter();
  const { companyId } = useParams();

  const dispatch = useAppDispatch();
  const { company: companyIdData, companyError } = useAppSelector(
    (state) => state.companyById
  );

  useEffect(() => {
    const id = Number(companyId);
    dispatch(fetchCompanyById(id));
  }, [companyId]);

  if (companyError) {
    return (
      <PageError
        errorTitle={t("fetchError")}
        actionTitle={t("backToCompanies")}
        errorAction={() => router.push(`${PATHS.COMPANIES}?page=1`)}
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
              <IconButton
                onClick={() =>
                  router.push(
                    `${PATHS.USERS}/${companyIdData.company_owner.user_id}`
                  )
                }
                size="small"
                color="primary"
              >
                <OpenInNewIcon />
              </IconButton>
            </div>
            <p>{companyIdData.company_owner.user_email}</p>
          </div>
        </aside>
        <section className={styles.sectionWrapper}>
          <AccordionCustom title={t("info")} expanded={true}>
            <>
              <h4 className={styles.companyTitle}>
                {companyIdData.company_title || t("company")}
              </h4>
              <TextField
                label={t("description")}
                multiline
                fullWidth
                disabled
                rows={4}
                defaultValue={
                  companyIdData.company_description || t("notProvided")
                }
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
            </>
          </AccordionCustom>

          <CompanyActions companyData={companyIdData} />
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
