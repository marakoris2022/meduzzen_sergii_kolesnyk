import { getSummaryRatingAnalyticForUser } from "@/services/axios-api-methods/axiosGet";
import { useEffect, useState } from "react";
import LineChart, { LineChartData, DatasetsProp } from "../charts/LineChart";
import { getRandomColor } from "@/utils/getRandomColor";
import { useAppSelector } from "@/state/hooks";
import { QuizItem } from "@/interface/interface";
import styles from "./analyticsChart.module.css";

type Props = {
  companyId: number;
  userId: number;
  userEmail: string;
};

const last10Labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

function getQuizNameById(quizId: number, quizzes: QuizItem[]) {
  return (
    quizzes.find((quiz) => quiz.quiz_id === quizId)?.quiz_name ||
    `Quiz ID: ${quizId}`
  );
}

const UserQuizChart = ({ companyId, userId, userEmail }: Props) => {
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
      setError("Failed to fetch user analytics data.");
    }
  }

  useEffect(() => {
    fetchUserAnalytics(companyId, userId, quizList);
  }, [companyId, userId, quizList]);

  if (error) return <p>{error}</p>;

  return chartData.datasets.length > 0 ? (
    <div className={styles.memberChartTitle}>
      <h3>Member: {userEmail}</h3>
      <LineChart chartData={chartData} />
    </div>
  ) : (
    <p>No data available for this user.</p>
  );
};

export default UserQuizChart;
