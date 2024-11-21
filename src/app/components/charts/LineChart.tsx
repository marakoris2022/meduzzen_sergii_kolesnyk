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
  ChartOptions,
} from "chart.js";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useState } from "react";
import styles from "./lineChart.module.css";
import { ButtonColor } from "@/interface/interface";
import { useTranslations } from "next-intl";

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
  datasets: DatasetsProp[];
};

export type DatasetsProp = {
  label: string;
  data: number[];
  borderColor: string;
};

const minLabelCount = 3;
const maxLabelCount = 20;

const LineChart = ({ chartData }: { chartData: LineChartData }) => {
  const [labelCount, setLabelCount] = useState<number>(10);
  const t = useTranslations("LineChart");

  function handleIncrease() {
    setLabelCount((prevCount) =>
      prevCount < maxLabelCount ? prevCount + 1 : prevCount
    );
  }

  function handleDecrease() {
    setLabelCount((prevCount) =>
      prevCount > minLabelCount ? prevCount - 1 : prevCount
    );
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: t("lastQuizTaken"),
          align: "center",
          color: "gold",
          font: {
            size: 14,
            weight: "bold",
          },
          padding: { top: 10, bottom: 5 },
        },
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: t("rating"),
          align: "center",
          color: "gold",
          font: {
            size: 14,
          },
          padding: { top: 10, bottom: 10 },
        },
      },
    },
  };

  const configuredChartData = {
    ...chartData,
    labels: Array.from(
      { length: labelCount },
      (_, index) => `${t("quiz")} ${index + 1}`
    ),
  };

  return (
    <div className={styles.lineChartWrapper}>
      <Line options={options} data={configuredChartData} />
      <div className={styles.chartBtnsWrapper}>
        <span>{t("quantityLabel")}: </span>
        <IconButton
          color={ButtonColor.Success}
          onClick={handleDecrease}
          disabled={labelCount <= minLabelCount}
        >
          <RemoveIcon />
        </IconButton>
        <IconButton
          color={ButtonColor.Success}
          onClick={handleIncrease}
          disabled={labelCount >= maxLabelCount}
        >
          <AddIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default LineChart;
