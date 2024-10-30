"use client";

import React, { useState } from "react";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { Button, Stack } from "@mui/material";
import UniversalModal from "./universal-modal/UniversalModal";
import { useTranslations } from "next-intl";
import { useLogout } from "../hooks/useLogout";

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
      <Stack direction={"row"} gap={3}>
        <Button onClick={handleLogout} color="error" variant="outlined">
          {t("Leave")}
        </Button>
        <Button
          onClick={() => setIsModal(false)}
          color="success"
          variant="outlined"
        >
          {t("Cancel")}
        </Button>
      </Stack>
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
