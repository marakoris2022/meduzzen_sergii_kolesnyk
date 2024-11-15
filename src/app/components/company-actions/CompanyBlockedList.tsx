import {
  ActionProps,
  ButtonColor,
  CompanyActionsModalProps,
  CompanyIdProps,
  PATHS,
  UserItem,
} from "@/interface/interface";
import {
  getCompanyBlockedList,
  unblockUser,
} from "@/services/axios-api-methods/axiosGet";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ReplyIcon from "@mui/icons-material/Reply";
import styles from "./companyActions.module.css";
import UniversalModal from "../universal-modal/UniversalModal";
import ActionModalBody from "./ActionModalBody";
import { useTranslations } from "next-intl";
import ActionsMemberBadge from "./ActionsMemberBadge";

const CompanyBlockedList = ({
  companyData,
}: {
  companyData: CompanyIdProps;
}) => {
  const t = useTranslations("CompanyActions");
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [renderError, setRenderError] = useState<string>("");
  const [blockedList, setBlockedList] = useState<Array<UserItem & ActionProps>>(
    []
  );

  const [modalBodyData, setModalBodyData] =
    useState<null | CompanyActionsModalProps>(null);

  const fetchCompanyMembers = async (company_id: number) => {
    try {
      const blocked = await getCompanyBlockedList(company_id);
      setBlockedList(blocked);
    } catch {
      setRenderError(t("failedDataFetching"));
    }
  };

  useEffect(() => {
    fetchCompanyMembers(companyData.company_id);
  }, [companyData.company_id]);

  if (renderError) return <h3>{renderError}</h3>;

  async function handleCancelBlockMember(action_id: number) {
    setModalBodyData({
      callback: () => unblockUser(action_id),
      onClose: () => setIsModalOpen(false),
      actionName: t("unblock"),
      actionText: t("unblockText"),
      triggerRenderUpdate: () => fetchCompanyMembers(companyData.company_id),
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
        {t("blockedTotal")}: {blockedList.length}
      </p>
      <ul>
        {blockedList.map((member) => (
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
