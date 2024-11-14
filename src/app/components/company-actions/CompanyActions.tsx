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

const CompanyActions = ({ companyData }: { companyData: CompanyIdProps }) => {
  const t = useTranslations("CompanyActions");
  const [renderError, setRenderError] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalBodyData, setModalBodyData] =
    useState<null | CompanyActionsModalProps>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);

  const checkMemberStatus = async (owner_id: number) => {
    try {
      const user = await getMe();

      if (user.user_id === owner_id) {
        setIsOwner(true);
      }
    } catch {
      setRenderError(t("failedDataFetching"));
    }
  };

  useEffect(() => {
    checkMemberStatus(companyData.company_owner.user_id);
  }, [companyData]);

  if (renderError) return <h3>{renderError}</h3>;

  async function handleJoinToCompany(company_id: number) {
    setModalBodyData({
      callback: async () => await requestJoinToCompany(company_id),
      onClose: () => setIsModalOpen(false),
      actionName: t("joinCompany"),
      actionText: t("joinText"),
      triggerRenderUpdate: () =>
        checkMemberStatus(companyData.company_owner.user_id),
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

      {isOwner ? (
        <div className={styles.adminPanelWrapper}>
          <h3 className={styles.adminPanelTitle}>{t("adminPanel")}</h3>
          <CompanyMembersList companyData={companyData} />
          <CompanyInvitesList companyData={companyData} />
          <CompanyRequestsList companyData={companyData} />
          <CompanyBlockedList companyData={companyData} />
        </div>
      ) : (
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
