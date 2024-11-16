import { useAppDispatch, useAppSelector } from "@/state/hooks";
import { fetchQuizzesData } from "@/state/quizzes/quizzesSlice";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import Loading from "../loading/Loading";
import PageError from "../users-page-error/PageError";
import UniversalModal from "../universal-modal/UniversalModal";
import CreateQuizForm from "./CreateQuizForm";

const CreateQuiz = ({ companyId }: { companyId: number }) => {
  const dispatch = useAppDispatch();
  const { quizList, loading, error } = useAppSelector((state) => state.quizzes);
  const [isModal, setIsModal] = useState<boolean>(false);

  useEffect(() => {
    if (!quizList.length) {
      dispatch(fetchQuizzesData(companyId));
    }
  }, [companyId, dispatch, quizList.length]);

  if (loading) return <Loading />;

  if (error) return <PageError errorTitle={"Failed to get Quiz List"} />;

  return (
    <>
      <UniversalModal open={isModal} handleClose={() => setIsModal(false)}>
        <CreateQuizForm />
      </UniversalModal>

      <div>
        <p>You have already {quizList.length} quizzes.</p>
        {Boolean(quizList.length) && (
          <div>
            {quizList.map((quizItem) => {
              return (
                <div key={quizItem.quiz_id}>
                  {quizItem.quiz_name}
                  <Button>Edit Quiz</Button>
                </div>
              );
            })}
          </div>
        )}
        <Button onClick={() => setIsModal(true)}>Create Quiz</Button>
      </div>
    </>
  );
};

export default CreateQuiz;
