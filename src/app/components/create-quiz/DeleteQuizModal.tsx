import { ButtonColor, QuizItem } from "@/interface/interface";
import { Button } from "@mui/material";
import styles from "./deleteQuizModal.module.css";
import { useState } from "react";
import { deleteQuiz } from "@/services/axios-api-methods/axiosDelete";
import { useAppDispatch } from "@/state/hooks";
import { fetchQuizzesData } from "@/state/quizzes/quizzesSlice";
import { useTranslations } from "next-intl";
import UniversalModal from "../universal-modal/UniversalModal";

type Props = {
  quizData: QuizItem | null;
  companyId: number;
  isOpen: boolean;
  handleCloseModal: () => void;
};

const DeleteQuizModal = ({
  quizData,
  handleCloseModal,
  companyId,
  isOpen,
}: Props) => {
  const t = useTranslations("DeleteQuizModal");
  const [errorText, setErrorText] = useState<string>("");
  const dispatch = useAppDispatch();

  async function handleDeleteQuiz(quiz_id: number, companyId: number) {
    try {
      await deleteQuiz(quiz_id);
      dispatch(fetchQuizzesData(companyId));
      setErrorText("");
      handleCloseModal();
    } catch {
      setErrorText(t("deleteError"));
    }
  }

  if (!quizData) return null;

  return (
    <UniversalModal open={isOpen} handleClose={handleCloseModal}>
      <div className={styles.deleteModalWrapper}>
        <h3>{t("confirmationTitle")}</h3>
        <p>{quizData.quiz_name}</p>
        {errorText && <p className={styles.deleteError}>{errorText}</p>}
        <Button
          className={styles.deleteBtn}
          variant="outlined"
          color={ButtonColor.Error}
          onClick={() => handleDeleteQuiz(quizData.quiz_id, companyId)}
        >
          {t("deleteButton")}
        </Button>
      </div>
    </UniversalModal>
  );
};

export default DeleteQuizModal;
