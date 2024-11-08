import { useEffect, useState } from "react";
import styles from "./profileCompanies.module.css";
import { getCompanyListByUserId } from "@/services/axios-api-methods/axiosGet";
import { CompanyPropsInList } from "@/interface/interface";
import { AxiosError } from "axios";
import PageError from "../users-page-error/PageError";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { Button } from "@mui/material";

const ProfileCompanies = ({ userId }: { userId: number }) => {
  const [companies, setCompanies] = useState<CompanyPropsInList[]>([]);
  const [error, setError] = useState<null | AxiosError>(null);

  useEffect(() => {
    getCompanyListByUserId(userId)
      .then((data) => {
        setCompanies(data);
      })
      .catch((error) => {
        setError(error as AxiosError);
      });
  }, [userId]);

  if (error) return <PageError errorTitle={"Can't fetch companies."} />;

  return (
    <div>
      {companies.length ? (
        <div>Companies List</div>
      ) : (
        <p className={styles.emptyListNotice}>
          You don&apos;t have own companies.
        </p>
      )}
      <div className={styles.crateBtnWrapper}>
        <Button
          startIcon={<PlaylistAddIcon />}
          variant="outlined"
          color="success"
        >
          Add Company
        </Button>
      </div>
    </div>
  );
};

export default ProfileCompanies;
