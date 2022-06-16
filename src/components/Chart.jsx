import React from "react";
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
// import Slider from "./Slider";
import {
  Heading,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  Box,
} from "@chakra-ui/react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ data: chartData, setLimit, limit }) => {
  const data = {
    labels: chartData.map((item) => item.lowLimit),
    datasets: [
      {
        label: "My Real Time Data",
        data: chartData.map((item) => item.value),
        fill: false,
        borderColor: "#742774",
      },
    ],
  };

  const options = {
    maintainAspectRation: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  // chartData.map((item) => console.info(item.value));
  console.log(chartData?.forEach(item => console.info(typeof (item?.value))));
  console.info(chartData)
  return (
    <div>
      <Heading>Moving Average : </Heading>
      <Heading>
        {chartData?.length > 0
          ? chartData?.reduce(
              (prev, next) => prev?.value + next?.value,
              0
            )
          : 0}

        {/* {chartData[0]?.value} */}
      </Heading>
      <Line height={400} width={1000} data={data} options={options} />
      <Heading>High Limit</Heading>
      <Slider
        defaultValue={500}
        min={0}
        max={10000}
        onChange={(val) =>
          setLimit({ lowLimit: limit ? limit.lowLimit : 500, highLimit: val })
        }
      >
        <SliderMark
          value={limit?.highLimit}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          {limit?.highLimit}
        </SliderMark>
        <SliderTrack bg="red.100">
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>

      <Heading>Low Limit</Heading>
      <Slider
        defaultValue={500}
        min={0}
        max={10000}
        onChange={(val) =>
          setLimit({
            lowLimit: val,
            highLimit: limit ? limit.hightLimit : 1000,
          })
        }
      >
        <SliderMark
          value={limit?.lowLimit}
          textAlign="center"
          bg="blue.500"
          color="white"
          mt="-10"
          ml="-5"
          w="12"
        >
          {limit?.lowLimt}
        </SliderMark>
        <SliderTrack bg="red.100">
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="tomato" />
        </SliderTrack>
        <SliderThumb boxSize={6} />
      </Slider>
    </div>
  );
};

export default Chart;
