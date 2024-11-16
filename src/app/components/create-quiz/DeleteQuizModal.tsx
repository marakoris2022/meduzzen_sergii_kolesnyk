import { ButtonColor, QuizItem } from "@/interface/interface";
import { Button } from "@mui/material";
import styles from "./deleteQuizModal.module.css";
import { useState } from "react";
import { deleteQuiz } from "@/services/axios-api-methods/axiosDelete";
import { useAppDispatch } from "@/state/hooks";
import { fetchQuizzesData } from "@/state/quizzes/quizzesSlice";

type Props = {
  quizData: QuizItem | null;
  handleClose: () => void;
  companyId: number;
};

const DeleteQuizModal = ({ quizData, handleClose, companyId }: Props) => {
  const [errorText, setErrorText] = useState<string>("");
  const dispatch = useAppDispatch();

  async function handleDeleteQuiz(quiz_id: number, companyId: number) {
    try {
      await deleteQuiz(quiz_id);
      dispatch(fetchQuizzesData(companyId));
      setErrorText("");
      handleClose();
    } catch (error) {
      console.log(error);
      setErrorText("Failed to delete the Quiz");
    }
  }

  if (!quizData) return null;

  return (
    <div className={styles.deleteModalWrapper}>
      <h3>Are you sure, you want to delete</h3>
      <p>{quizData.quiz_name} ?</p>
      {errorText && <p className={styles.deleteError}>errorText</p>}
      <Button
        className={styles.deleteBtn}
        variant="outlined"
        color={ButtonColor.Error}
        onClick={() => handleDeleteQuiz(quizData.quiz_id, companyId)}
      >
        Delete Quiz
      </Button>
    </div>
  );
};

export default DeleteQuizModal;
