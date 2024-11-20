import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export type LineChartData = {
  labels: string[];
  datasets: DatasetsProp[];
};

export type DatasetsProp = {
  label: string;
  data: number[];
  borderColor: string;
};

const LineChart = ({ chartData }: { chartData: LineChartData }) => {
  const options = {};

  return <Line options={options} data={chartData} />;
};

export default LineChart;
