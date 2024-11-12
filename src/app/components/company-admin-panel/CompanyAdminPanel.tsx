import {
  ActionProps,
  CompanyIdProps,
  PATHS,
  UserItem,
} from "@/interface/interface";
import {
  getCompanyMembersList,
  getMe,
} from "@/services/axios-api-methods/axiosGet";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const CompanyAdminPanel = ({
  companyData,
}: {
  companyData: CompanyIdProps;
}) => {
  const router = useRouter();
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [renderError, setRenderError] = useState<string>("");
  const [companyMembers, setCompanyMembers] = useState<
    Array<UserItem & ActionProps>
  >([]);

  const fetchCurrentUserAndCompanyMembers = useCallback(async () => {
    try {
      const user = await getMe();

      if (user.user_id === companyData.company_owner.user_id) {
        const members = await getCompanyMembersList(companyData.company_id);
        setCompanyMembers(members);
        setIsOwner(true);
      }
    } catch {
      setRenderError("Admin panel is Broken!");
    }
  }, [companyData.company_id, companyData.company_owner.user_id]);

  useEffect(() => {
    fetchCurrentUserAndCompanyMembers();
  }, [fetchCurrentUserAndCompanyMembers]);

  if (renderError) return <h3>{renderError}</h3>;
  if (!isOwner) return null;

  return (
    <div>
      <h3>Company Admin Panel</h3>
      <p>Members Total: {companyMembers.length}</p>
      <ul>
        {companyMembers.map((member) => {
          return (
            <li key={member.user_id}>
              <span>{member.user_email}</span>
              <span> ({member.action})</span>
              <IconButton
                onClick={() => router.push(`${PATHS.USERS}/${member.user_id}`)}
                size="small"
                color="primary"
              >
                <OpenInNewIcon />
              </IconButton>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CompanyAdminPanel;
