"use client";

import { Button } from "@mui/material";
import React, { useState } from "react";
import UniversalModal from "./UniversalModal";

const OpenModalTest = (props: { title: string; description: string }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen((state) => !state)}>
        Open Modal
      </Button>
      <UniversalModal
        {...props}
        open={isModalOpen}
        handleClose={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default OpenModalTest;
