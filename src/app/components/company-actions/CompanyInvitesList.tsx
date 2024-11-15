import {
  ActionProps,
  ButtonColor,
  CompanyActionsModalProps,
  CompanyIdProps,
  PATHS,
  UserItem,
} from "@/interface/interface";
import { declineAction } from "@/services/axios-api-methods/axiosGet";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import ClearIcon from "@mui/icons-material/Clear";

import styles from "./companyActions.module.css";
import UniversalModal from "../universal-modal/UniversalModal";
import ActionModalBody from "./ActionModalBody";
import { useTranslations } from "next-intl";
import ActionsMemberBadge from "./ActionsMemberBadge";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchCompanyInvites } from "@/state/company-by-id/companyByIdSlice";

const CompanyInvitesList = ({
  companyData,
}: {
  companyData: CompanyIdProps;
}) => {
  const t = useTranslations("CompanyActions");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalBodyData, setModalBodyData] =
    useState<null | CompanyActionsModalProps>(null);

  const dispatch = useAppDispatch();
  const { companyInvites, companyInvitesError } = useAppSelector(
    (selector) => selector.companyById
  );

  useEffect(() => {
    dispatch(fetchCompanyInvites(companyData.company_id));
  }, [companyData.company_id]);

  if (companyInvitesError) return <h3>{t("failedDataFetching")}</h3>;

  async function handleDecline(action_id: number) {
    setModalBodyData({
      callback: () => declineAction(action_id),
      onClose: () => setIsModalOpen(false),
      actionName: t("decline"),
      actionText: t("declineText"),
      triggerRenderUpdate: async () => {
        await dispatch(fetchCompanyInvites(companyData.company_id));
      },
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
      <p className={styles.infoText}>
        {t("invitesTotal")}: {companyInvites.length}
      </p>
      <ul>
        {companyInvites.map((member: UserItem & ActionProps) => (
          <ActionsMemberBadge
            key={member.user_id}
            member={member}
            actions={[
              {
                callback: () => router.push(`${PATHS.USERS}/${member.user_id}`),
                color: ButtonColor.Primary,
                icon: <OpenInNewIcon />,
              },
              {
                callback: async () => await handleDecline(member.action_id),
                color: ButtonColor.Warning,
                icon: <ClearIcon />,
              },
            ]}
          />
        ))}
      </ul>
    </>
  );
};

export default CompanyInvitesList;
