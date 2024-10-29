import { ReactNode } from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { useTranslations } from "next-intl";
import styles from "./universalModal.module.css";

type UniversalModalProps = {
  open: boolean;
  handleClose: () => void;
  title?: string;
  description?: string;
  children?: ReactNode;
  footerActions?: ReactNode;
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
      <Box className={styles.wrapper}>
        {title && (
          <Typography id="modal-title" variant="h6" component="h2" mb={2}>
            {title}
          </Typography>
        )}

        {description && (
          <Typography id="modal-description" variant="body2" mb={2}>
            {description}
          </Typography>
        )}

        {children}

        {footerActions ? (
          footerActions
        ) : (
          <Box mt={3}>
            <Button variant="contained" color="primary" onClick={handleClose}>
              {t("close")}
            </Button>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default UniversalModal;
