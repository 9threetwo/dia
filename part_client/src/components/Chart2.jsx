import { Line } from "react-chartjs-2";
import styled from "styled-components";
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  PointElement,
  Filler,
  TimeScale,
  TimeSeriesScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { useSelector } from "react-redux";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  Tooltip,
  Legend,
  PointElement,
  Filler,
  ChartDataLabels,
  TimeScale,
  TimeSeriesScale
);

function Chart2() {
  const { chartData, user } = useSelector((store) => store.user);

  const backgroundColorPlugin = {
    id: "backgroundColorPlugin",
    beforeDraw: (chart) => {
      const {
        ctx,
        chartArea: { left, top, width, height },
      } = chart;
      const yScale = chart.scales.y;

      const ranges = [
        { from: 0, to: user.min, color: "#FFD700" },
        { from: user.min, to: user.max, color: "#149409" },
        { from: user.max, to: 13, color: "#FF7514" },
        // { from: user.max, to: 13, color: "#F27348" },
        { from: 13, to: 100, color: "#f00" },
      ];

      ctx.save();

      ranges.forEach((range) => {
        const y1 = yScale.getPixelForValue(range.from);
        const y2 = yScale.getPixelForValue(range.to);
        ctx.fillStyle = range.color;
        ctx.fillRect(left, y2, width, y1 - y2);
      });

      ctx.restore();
    },
  };

  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  const last24HoursData = chartData
    .map((entry) => {
      const dateTime = new Date(
        `${entry.date.split("T")[0]}T${entry.time}:00.000Z`
      );
      return { time: dateTime, ck: entry.ck };
    })
    .filter((entry) => entry.time >= twentyFourHoursAgo && entry.time <= now)
    .sort((a, b) => new Date(a.time) - new Date(b.time));

  const timeData = last24HoursData.map((entry) => entry.time);
  const ckData = last24HoursData.map((entry) => entry.ck);

  const data = {
    labels: timeData,
    datasets: [
      {
        data: ckData,
        tension: 0.1,
        fill: false,
        borderColor: "#2f3192",
        borderWidth: 2,
        pointBackgroundColor: "white",
        pointBorderColor: "#2f3192",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        enabled: false,
      },
      filler: {
        propagate: true,
      },
      backgroundColorPlugin,
      datalabels: {
        display: true,
        align: "top",
        anchor: "end",
        formatter: (value) => value,
        color: "black",
        font: {
          size: 15,
          weight: "bold",
        },
      },
    },
    elements: {
      point: {
        radius: 5,
        hoverRadius: 7,
        backgroundColor: "white",
        borderColor: "#2f3192",
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    },
    scales: {
      x: {
        type: "time",
        time: {
          unit: "hour",
          stepSize: 3,
          displayFormats: {
            hour: "HH:mm",
          },
          tooltipFormat: "HH:mm",
        },
        grid: {
          display: false,
        },
        title: {
          display: true,
          font: {
            size: 12,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
          callback: function (value, index, values) {
            const date = new Date(value);
            const hours = date.getHours();
            return hours % 3 === 0
              ? date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "";
          },
        },
      },
      y: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          font: {
            size: 14,
          },
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <Wrapper>
      <div className="chart-header">
        <p>Суточный график</p>
      </div>

      <Line data={data} options={options} plugins={[backgroundColorPlugin]} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 350px;

  .chart-header {
    display: flex;
    justify-content: center;
    margin: 20px;
    font-size: 20px;
    p {
      text-align: center;
      font-weight: 700;
    }
  }
  .input-block {
    display: flex;
    justify-content: space-around;
  }

  @media (min-width: 576px) {
    width: 600px;
    height: 400px;
  }
  @media (min-width: 768px) {
  }
  @media (min-width: 992px) {
    width: 700px;
    height: 400px;
  }
  @media (min-width: 1200px) {
  }
  @media (min-width: 1400px) {
  }
`;

export default Chart2;
