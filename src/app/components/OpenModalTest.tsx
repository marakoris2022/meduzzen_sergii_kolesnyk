"use client";

import { Button } from "@mui/material";
import { useState } from "react";
import UniversalModal from "./universal-modal/UniversalModal";

type OpenModalTestProps = {
  title: string;
  description: string;
};

const OpenModalTest = ({ title, description }: OpenModalTestProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      <Button onClick={() => setIsModalOpen((state) => !state)}>
        Open Modal
      </Button>
      <UniversalModal
        title={title}
        description={description}
        open={isModalOpen}
        handleClose={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default OpenModalTest;
