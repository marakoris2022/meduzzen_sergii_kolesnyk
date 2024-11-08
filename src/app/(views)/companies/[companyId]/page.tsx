"use client";

import { useParams, useRouter } from "next/navigation";
import styles from "./companyId.module.css";
import { useEffect, useState } from "react";
import { getCompanyById } from "@/services/axios-api-methods/axiosGet";
import { CompanyIdProps, PATHS } from "@/interface/interface";
import { AxiosError } from "axios";
import PageError from "@/app/components/users-page-error/PageError";
import Loading from "@/app/components/loading/Loading";

const CompanyIdPage = () => {
  const router = useRouter();
  const { companyId } = useParams();
  const [error, setError] = useState<null | AxiosError>(null);
  const [companyIdData, setCompanyIdData] = useState<null | CompanyIdProps>(
    null
  );

  useEffect(() => {
    const id = Number(companyId);
    getCompanyById(id)
      .then((data) => {
        setCompanyIdData(data);
      })
      .catch((error) => {
        setError(error as AxiosError);
      });
  }, [companyId]);

  if (error) {
    return (
      <PageError
        errorTitle="Can't fetch Data by Company Id"
        actionTitle="Back to Companies"
        errorAction={() => router.push(PATHS.COMPANIES)}
      />
    );
  }

  return !companyIdData ? (
    <Loading />
  ) : (
    <main className="container">
      <h1>Company ID: {companyId}</h1>
      <div className={styles.contentWrapper}>
        <aside className="">{companyIdData.company_name}</aside>
        <section className="">
          {companyIdData.company_owner.user_firstname}
        </section>
      </div>
    </main>
  );
};

export default CompanyIdPage;
