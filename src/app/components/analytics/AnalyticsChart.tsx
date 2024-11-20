import { getSummaryRatingAnalytic } from "@/services/axios-api-methods/axiosGet";
import { useEffect, useState } from "react";
import LineChart, { LineChartData } from "../charts/LineChart";
import { getRandomColor } from "@/utils/getRandomColor";
import { useAppSelector } from "@/state/hooks";
import PageError from "../users-page-error/PageError";
import { resolveMemberLabel } from "@/utils/resolveMemberLabel";
import { ActionProps, UserItem } from "@/interface/interface";

const last10Labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const AnalyticsChart = ({ companyId }: { companyId: number }) => {
  const { companyMembers } = useAppSelector((state) => state.companyById);
  const [chartData, setChartData] = useState<LineChartData>({
    labels: [],
    datasets: [],
  });
  const [error, setError] = useState<string>("");

  async function fetchAnalyticsData(
    companyId: number,
    companyMembers: (UserItem & ActionProps)[]
  ) {
    try {
      const summary = await getSummaryRatingAnalytic(companyId);

      const dataForChart: LineChartData = {
        labels: last10Labels,
        datasets: summary.rating.map((memberRating) => {
          return {
            label: resolveMemberLabel(memberRating.user_id, companyMembers),
            data: memberRating.rating.map((rating) => rating.average_rating),
            borderColor: getRandomColor(),
          };
        }),
      };

      setChartData(dataForChart);
    } catch {
      setError("Failed to fetch analytics data.");
    }
  }

  useEffect(() => {
    fetchAnalyticsData(companyId, companyMembers);
  }, [companyId, companyMembers]);

  if (error) return <PageError errorTitle={error} />;

  return (
    <div>
      {chartData.datasets.length > 0 ? (
        <LineChart chartData={chartData} />
      ) : (
        <p>No data to show Analytics</p>
      )}
    </div>
  );
};

export default AnalyticsChart;
