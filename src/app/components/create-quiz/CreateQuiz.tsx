import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchQuizzesData } from "@/state/quizzes/quizzesSlice";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import PageError from "../users-page-error/PageError";
import UniversalModal from "../universal-modal/UniversalModal";
import CreateQuizForm from "./CreateQuizForm";
import styles from "./createQuiz.module.css";
import DeleteQuizModal from "./DeleteQuizModal";
import { QuizItem } from "@/interface/interface";

const CreateQuiz = ({ companyId }: { companyId: number }) => {
  const dispatch = useAppDispatch();
  const { quizList, loading, error } = useAppSelector((state) => state.quizzes);
  const [isCreateQuizModal, setIsCreateQuizModal] = useState<boolean>(false);
  const [isDeleteQuizModal, setIsDeleteQuizModal] = useState<boolean>(false);
  const [isUpdateQuizModal, setIsUpdateQuizModal] = useState<boolean>(false);
  const [isAddQuestionModal, setIsAddQuestionModal] = useState<boolean>(false);
  const [activeQuizData, setActiveQuizData] = useState<QuizItem | null>(null);

  useEffect(() => {
    if (!quizList.length) {
      dispatch(fetchQuizzesData(companyId));
    }
  }, [companyId, dispatch, quizList.length]);

  if (loading) return <Loading />;

  if (error) return <PageError errorTitle={"Failed to get Quiz List"} />;

  return (
    <>
      <UniversalModal
        open={isCreateQuizModal}
        handleClose={() => setIsCreateQuizModal(false)}
      >
        <CreateQuizForm
          handleCloseModal={() => setIsCreateQuizModal(false)}
          companyId={companyId}
        />
      </UniversalModal>

      <UniversalModal
        open={isDeleteQuizModal}
        handleClose={() => setIsDeleteQuizModal(false)}
      >
        <DeleteQuizModal
          handleClose={() => setIsDeleteQuizModal(false)}
          quizData={activeQuizData}
          companyId={companyId}
        />
      </UniversalModal>

      <UniversalModal
        open={isUpdateQuizModal}
        handleClose={() => setIsUpdateQuizModal(false)}
      >
        <>Update Quiz</>
      </UniversalModal>

      <UniversalModal
        open={isAddQuestionModal}
        handleClose={() => setIsAddQuestionModal(false)}
      >
        <>Add Quiz</>
      </UniversalModal>

      <div className={styles.createQuizWrapper}>
        <p className={styles.quizQuantity}>
          You have already {quizList.length} quizzes.
        </p>
        {Boolean(quizList.length) && (
          <div>
            {quizList.map((quizItem) => {
              return (
                <div key={quizItem.quiz_id} className={styles.quizItemWrapper}>
                  <p>{quizItem.quiz_name}</p>
                  <div className={styles.quizBtnsWrapper}>
                    <Button
                      onClick={() => {
                        setIsAddQuestionModal(true);
                        setActiveQuizData(quizItem);
                      }}
                      color="success"
                      size="small"
                    >
                      Add Question
                    </Button>
                    <Button
                      onClick={() => {
                        setActiveQuizData(quizItem);
                        setIsUpdateQuizModal(true);
                      }}
                      color="warning"
                      size="small"
                    >
                      Update Quiz
                    </Button>
                    <Button
                      onClick={() => {
                        setActiveQuizData(quizItem);
                        setIsDeleteQuizModal(true);
                      }}
                      color="error"
                      size="small"
                    >
                      Delete Quiz
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <Button variant="outlined" onClick={() => setIsCreateQuizModal(true)}>
          Create Quiz
        </Button>
      </div>
    </>
  );
};

export default CreateQuiz;
