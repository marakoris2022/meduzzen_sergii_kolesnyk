import { ReactNode } from "react";
import { Modal, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import styles from "./universalModal.module.css";

type UniversalModalProps = {
  open: boolean;
  handleClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode | JSX.Element;
  footerActions?: ReactNode | JSX.Element;
};

const UniversalModal = ({
  open,
  handleClose,
  title,
  description,
  children,
  footerActions,
}: UniversalModalProps) => {
  const t = useTranslations("UniversalModal");

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className={styles.wrapper}>
        {Boolean(title) && <h2 id="modal-title">{title}</h2>}

        {Boolean(description) && <p id="modal-description">{description}</p>}

        {children}

        {footerActions ? (
          footerActions
        ) : (
          <div className={styles.btnWrapper}>
            <Button variant="contained" color="primary" onClick={handleClose}>
              {t("close")}
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default UniversalModal;
