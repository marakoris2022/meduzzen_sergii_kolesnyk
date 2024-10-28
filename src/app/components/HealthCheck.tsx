"use client";

import { axiosInstance } from "@/services/axiosInstance";
import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";

const HealthCheck = () => {
  const [status, setStatus] = useState("");

  async function handleRequest() {
    try {
      const res = await axiosInstance.get("/");
      setStatus(JSON.stringify(res.data, null, 2));
    } catch (error) {
      setStatus((error as Error).message);
    }
  }

  return (
    <Stack>
      <Button onClick={handleRequest}>Health Check</Button>
      <Typography alignSelf={"center"}>{status}</Typography>
    </Stack>
  );
};

export default HealthCheck;
