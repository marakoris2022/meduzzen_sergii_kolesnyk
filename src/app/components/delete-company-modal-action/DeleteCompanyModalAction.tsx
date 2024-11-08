import { Button } from "@mui/material";
import styles from "./deleteCompanyModalAction.module.css";
import { deleteCompany } from "@/services/axios-api-methods/axiosDelete";
import { useAppDispatch } from "@/state/hooks";
import { fetchUserCompanies } from "@/state/user-companies/userCompaniesSlice";
import { useState } from "react";

type DeleteCompanyModalActionProps = {
  companyId: number | null;
  userId: number;
  closeModal: () => {};
};

function DeleteCompanyModalAction({
  companyId,
  userId,
  closeModal,
}: DeleteCompanyModalActionProps) {
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();

  async function handleDeleteCompany() {
    if (companyId) {
      try {
        await deleteCompany(companyId);
        dispatch(fetchUserCompanies(userId));
        closeModal();
      } catch {
        setError("Deletion is failed.");
      }
    }
  }

  return (
    <div className={styles.btnWrapper}>
      <p className={styles.errorText}>{error}</p>
      <Button variant="outlined" color="error" onClick={handleDeleteCompany}>
        Delete
      </Button>
    </div>
  );
}

export default DeleteCompanyModalAction;
