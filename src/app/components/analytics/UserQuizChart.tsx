import { getSummaryRatingAnalyticForUser } from "@/services/axios-api-methods/axiosGet";
import { useEffect, useState } from "react";
import LineChart, { LineChartData, DatasetsProp } from "../charts/LineChart";
import { getRandomColor } from "@/utils/getRandomColor";
import { useAppSelector } from "@/state/hooks";
import { QuizItem } from "@/interface/interface";
import styles from "./analyticsChart.module.css";
import { last10Labels } from "@/constants/analyticsConstants";
import { useTranslations } from "next-intl";

type Props = {
  companyId: number;
  userId: number;
  userEmail: string;
};

function getQuizNameById(quizId: number, quizzes: QuizItem[]) {
  return (
    quizzes.find((quiz) => quiz.quiz_id === quizId)?.quiz_name ||
    `Quiz ID: ${quizId}`
  );
}

const UserQuizChart = ({ companyId, userId, userEmail }: Props) => {
  const t = useTranslations("UserQuizChart");
  const [chartData, setChartData] = useState<LineChartData>({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState<string>("");
  const { quizList } = useAppSelector((state) => state.quizzes);

  async function fetchUserAnalytics(
    companyId: number,
    userId: number,
    quizList: QuizItem[]
  ) {
    try {
      const summary = await getSummaryRatingAnalyticForUser(companyId, userId);

      const dataForChart: LineChartData = {
        labels: last10Labels,
        datasets: summary.rating.map((quiz) => {
          const dataset: DatasetsProp = {
            label: getQuizNameById(quiz.quiz_id, quizList),
            data: quiz.rating.map((rating) => rating.average_rating),
            borderColor: getRandomColor(),
          };
          return dataset;
        }),
      };

      setChartData(dataForChart);
    } catch {
      setError(t("fetchError"));
    }
  }

  useEffect(() => {
    fetchUserAnalytics(companyId, userId, quizList);
  }, [companyId, userId, quizList]);

  if (error) return <p>{error}</p>;

  return chartData.datasets.length > 0 ? (
    <div>
      <h3 className={styles.memberChartTitle}>
        {t("memberTitle", { email: userEmail })}
      </h3>
      <LineChart chartData={chartData} />
    </div>
  ) : (
    <p className={styles.memberChartTitle}>{t("noData")}</p>
  );
};

export default UserQuizChart;
