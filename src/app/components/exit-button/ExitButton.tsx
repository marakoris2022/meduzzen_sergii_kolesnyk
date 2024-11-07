"use client";

import React, { useState } from "react";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { Button } from "@mui/material";
import UniversalModal from "../universal-modal/UniversalModal";
import { useTranslations } from "next-intl";
import { useLogout } from "../../hooks/useLogout";
import styles from "./exitButton.module.css";

const ExitButton = () => {
  const [isModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations("ExitButton");
  const logout = useLogout();

  const handleLogout = () => {
    logout();
    setIsModal(false);
  };

  function LeaveApplicationAction() {
    return (
      <div className={styles.actionWrapper}>
        <Button onClick={handleLogout} color="error" variant="outlined">
          {t("leave")}
        </Button>
        <Button
          onClick={() => setIsModal(false)}
          color="success"
          variant="outlined"
        >
          {t("cancel")}
        </Button>
      </div>
    );
  }

  return (
    <>
      <UniversalModal
        open={isModal}
        handleClose={() => setIsModal(false)}
        title={t("leaveApp")}
        description={t("sureExit")}
        footerActions={<LeaveApplicationAction />}
      />
      <Button onClick={() => setIsModal(true)}>
        <MeetingRoomIcon />
      </Button>
    </>
  );
};

export default ExitButton;
