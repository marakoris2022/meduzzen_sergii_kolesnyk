import { useAppDispatch, useAppSelector } from "@/state/hooks";
import styles from "./inviteMemberForm.module.css";
import { useEffect, useState } from "react";
import { fetchUserCompanies } from "@/state/user-companies/userCompaniesSlice";
import AddBusinessIcon from "@mui/icons-material/AddBusiness";
import { IconButton } from "@mui/material";
import { UpdateStatusType } from "@/interface/interface";
import { inviteUserToCompany } from "@/services/axios-api-methods/axiosGet";

const InviteMemberForm = ({ memberId }: { memberId: number }) => {
  const userCompanies = useAppSelector(
    (state) => state.userCompanies.companies
  );
  const userId = useAppSelector((state) => state.user.data?.user_id);
  const dispatch = useAppDispatch();
  const [inviteStatus, setInviteStatus] = useState<UpdateStatusType>({
    text: "",
    color: "green",
  });

  useEffect(() => {
    if (userId && userCompanies.length === 0) {
      dispatch(fetchUserCompanies(userId));
    }
  }, [dispatch, userCompanies.length, userId]);

  async function handleCompanyInvite(companyId: number) {
    try {
      await inviteUserToCompany(companyId, memberId);
      setInviteStatus({ color: "green", text: "Successfully invited." });
    } catch {
      setInviteStatus({ color: "red", text: "You can't invite this user." });
    }
  }

  return (
    <div className={styles.wrapper}>
      {userCompanies.length > 0 ? (
        <>
          {inviteStatus.text && (
            <p
              className={styles.noticeMessage}
              style={{ color: inviteStatus.color }}
            >
              {inviteStatus.text}
            </p>
          )}
          {userCompanies.map((company) => (
            <div key={company.company_id} className={styles.companyWrapper}>
              <span>{company.company_name}</span>
              <IconButton
                onClick={() => handleCompanyInvite(company.company_id)}
                size="small"
                color="primary"
              >
                <AddBusinessIcon />
              </IconButton>
            </div>
          ))}
        </>
      ) : (
        <p>You dont have companies.</p>
      )}
    </div>
  );
};

export default InviteMemberForm;
