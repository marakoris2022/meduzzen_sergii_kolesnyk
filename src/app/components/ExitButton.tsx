"use client";

import React, { useState } from "react";
import Cookies from "js-cookie";
import { clearToken } from "../../state/auth/authSlice";
import { useAppDispatch } from "@/state/hooks";
import { PATHS, TOKEN } from "@/interface/interface";
import { useRouter } from "next/navigation";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import { Box, Button, Stack } from "@mui/material";
import UniversalModal from "./universal-modal/UniversalModal";
import { useTranslations } from "next-intl";

const ExitButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const [isModal, setIsModal] = useState<boolean>(false);
  const t = useTranslations("ExitButton");

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem(TOKEN.NAME);
    Cookies.remove(TOKEN.NAME);
    navigate.push(PATHS.MAIN);
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
