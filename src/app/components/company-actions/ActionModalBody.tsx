import { useState } from "react";
import styles from "./companyActions.module.css";
import { Button } from "@mui/material";

function ActionModalBody({
  callback,
  onClose,
  actionName,
  actionText,
  triggerRenderUpdate,
}: {
  callback: () => Promise<void>;
  onClose: () => void;
  actionName: string;
  actionText: string;
  triggerRenderUpdate: () => Promise<void>;
}) {
  const [modalError, setModalError] = useState<string>("");

  async function handleClick() {
    try {
      await callback();
      await triggerRenderUpdate();
      setModalError("");
      onClose();
    } catch {
      setModalError("Operation failed.");
    }
  }

  return (
    <div className={styles.modalWrapper}>
      <p className={styles.modalText}>{actionText}</p>
      <Button
        variant="outlined"
        color="secondary"
        onClick={async () => await handleClick()}
      >
        {actionName}
      </Button>
      {modalError && <p className={styles.modalError}>{modalError}</p>}
    </div>
  );
}

export default ActionModalBody;
