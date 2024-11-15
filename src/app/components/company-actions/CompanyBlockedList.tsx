import {
  ButtonColor,
  CompanyActionsModalProps,
  CompanyIdProps,
  PATHS,
} from "@/interface/interface";
import { unblockUser } from "@/services/axios-api-methods/axiosGet";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ReplyIcon from "@mui/icons-material/Reply";
import styles from "./companyActions.module.css";
import UniversalModal from "../universal-modal/UniversalModal";
import ActionModalBody from "./ActionModalBody";
import { useTranslations } from "next-intl";
import ActionsMemberBadge from "./ActionsMemberBadge";
import { useAppDispatch, useAppSelector } from "@/state/hooks";
import {
  fetchCompanyBlockedList,
  fetchCompanyMembers,
} from "@/state/company-by-id/companyByIdSlice";

const CompanyBlockedList = ({
  companyData,
}: {
  companyData: CompanyIdProps;
}) => {
  const t = useTranslations("CompanyActions");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { companyBlockedList, companyBlockedListError } = useAppSelector(
    (state) => state.companyById
  );

  const [modalBodyData, setModalBodyData] =
    useState<null | CompanyActionsModalProps>(null);

  useEffect(() => {
    dispatch(fetchCompanyBlockedList(companyData.company_id));
  }, [companyData.company_id]);

  if (companyBlockedListError) return <h3>{t("failedDataFetching")}</h3>;

  async function handleCancelBlockMember(action_id: number) {
    setModalBodyData({
      callback: () => unblockUser(action_id),
      onClose: () => setIsModalOpen(false),
      actionName: t("unblock"),
      actionText: t("unblockText"),
      triggerRenderUpdate: async () => {
        await dispatch(fetchCompanyBlockedList(companyData.company_id));
        await dispatch(fetchCompanyMembers(companyData.company_id));
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
        {t("blockedTotal")}: {companyBlockedList.length}
      </p>
      <ul>
        {companyBlockedList.map((member) => (
          <>
            <ActionsMemberBadge
              key={member.user_id}
              member={member}
              actions={[
                {
                  callback: () =>
                    router.push(`${PATHS.USERS}/${member.user_id}`),
                  color: ButtonColor.Primary,
                  icon: <OpenInNewIcon />,
                },
                {
                  callback: async () =>
                    await handleCancelBlockMember(member.action_id),
                  color: ButtonColor.Success,
                  icon: <ReplyIcon />,
                },
              ]}
            />
          </>
        ))}
      </ul>
    </>
  );
};

export default CompanyBlockedList;
