import { Pagination } from "@mui/material";
import styles from "./paginationCustom.module.css";

type Props = {
  pageCount: number;
  currentPage: number;
  onChange: (chosenPage: number) => void;
};

const PaginationCustom = ({
  pageCount,
  currentPage: pageNumber,
  onChange,
}: Props) => {
  return (
    <div className={styles.paginationWrapper}>
      <Pagination
        count={pageCount}
        page={pageNumber}
        variant="outlined"
        color="secondary"
        onChange={(_, chosenPage) => onChange(chosenPage)}
      />
    </div>
  );
};

export default PaginationCustom;
