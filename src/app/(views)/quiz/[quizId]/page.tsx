"use client";

import { useParams } from "next/navigation";
import { useEffect } from "react";
import styles from "./quizGame.module.css";
import classNames from "classnames";

const QuizGamePage = () => {
  const { quizId } = useParams();

  useEffect(() => {
    console.log("quizId", quizId);
  }, []);

  return (
    <div className={classNames("container", styles.pageWrapper)}>
      QuizGamePage
    </div>
  );
};

export default QuizGamePage;
