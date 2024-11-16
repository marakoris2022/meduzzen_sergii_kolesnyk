import {
  CompanyActionsModalProps,
  CompanyIdProps,
} from "@/interface/interface";
import {
  getMe,
  requestJoinToCompany,
} from "@/services/axios-api-methods/axiosGet";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

import styles from "./companyActions.module.css";
import UniversalModal from "../universal-modal/UniversalModal";
import ActionModalBody from "./ActionModalBody";
import { useTranslations } from "next-intl";
import CompanyMembersList from "./CompanyMembersList";
import CompanyInvitesList from "./CompanyInvitesList";
import CompanyRequestsList from "./CompanyRequestsList";
import CompanyBlockedList from "./CompanyBlockedList";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchUserCompanies } from "@/state/user-companies/userCompaniesSlice";
import AccordionCustom from "../accordion-custom/AccordionCustom";

const CompanyActions = ({ companyData }: { companyData: CompanyIdProps }) => {
  const t = useTranslations("CompanyActions");
  const dispatch = useAppDispatch();
  const [renderError, setRenderError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalBodyData, setModalBodyData] =
    useState<null | CompanyActionsModalProps>(null);
  const { companies, error: companyFetchError } = useAppSelector(
    (state) => state.userCompanies
  );
  const [memberStatus, setMemberStatus] = useState<string>("");

  const checkMemberStatus = async () => {
    try {
      const user = await getMe();

      if (companies.length) {
        companies.forEach((company) => {
          if (company.company_id === companyData.company_id)
            setMemberStatus(company.action);
        });
      } else {
        await dispatch(fetchUserCompanies(user.user_id));
      }
    } catch {
      setRenderError(t("failedDataFetching"));
    }
  };

  useEffect(() => {
    checkMemberStatus();
  }, [companies]);

  if (renderError || companyFetchError) return <h3>{renderError}</h3>;

  async function handleJoinToCompany(company_id: number) {
    setModalBodyData({
      callback: async () => await requestJoinToCompany(company_id),
      onClose: () => setIsModalOpen(false),
      actionName: t("joinCompany"),
      actionText: t("joinText"),
      triggerRenderUpdate: () => checkMemberStatus(),
    });
    setIsModalOpen(true);
  }

  return (
    <>
      <UniversalModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      >
        {modalBodyData && (
          <ActionModalBody
            callback={async () => await modalBodyData.callback()}
            onClose={() => modalBodyData.onClose()}
            actionName={modalBodyData.actionName}
            actionText={modalBodyData.actionText}
            triggerRenderUpdate={() => modalBodyData.triggerRenderUpdate()}
          />
        )}
      </UniversalModal>

      {memberStatus === "owner" && (
        <AccordionCustom title={t("ownerPanel")}>
          <div className={styles.adminPanelWrapper}>
            <CompanyMembersList
              companyData={companyData}
              myStatus={memberStatus}
            />
            <CompanyInvitesList companyData={companyData} />
            <CompanyRequestsList companyData={companyData} />
            <CompanyBlockedList companyData={companyData} />
          </div>
        </AccordionCustom>
      )}

      {(memberStatus === "admin" || memberStatus === "member") && (
        <AccordionCustom title={t("memberPanel")}>
          <div className={styles.adminPanelWrapper}>
            <CompanyMembersList
              companyData={companyData}
              myStatus={memberStatus}
            />
          </div>
        </AccordionCustom>
      )}

      {(memberStatus === "owner" || memberStatus === "admin") && (
        <AccordionCustom title="Quiz Admin Panel">
          <p>Quiz Admin Panel</p>
        </AccordionCustom>
      )}

      {(memberStatus === "member" ||
        memberStatus === "owner" ||
        memberStatus === "admin") && (
        <AccordionCustom title="Quizzes">
          <p>Quizzes</p>
        </AccordionCustom>
      )}

      {!memberStatus && (
        <div className={styles.joinBtnWrapper}>
          <Button
            onClick={async () =>
              await handleJoinToCompany(companyData.company_id)
            }
            color="success"
            variant="outlined"
          >
            {t("joinCompany")}
          </Button>
        </div>
      )}
    </>
  );
};

export default CompanyActions;
