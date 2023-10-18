import { View } from "react-native";
import { Circle, Svg } from "react-native-svg";
import { LineChart, Grid, YAxis } from "react-native-svg-charts";

import { spacing } from "../../../theme";

interface DecoratorProps {
  x: any;
  y: any;
  combinedData: {
    data: number[];
    svg: {
      stroke: string;
      strokeWidth: number;
    };
  }[];
}

const min = 1;
const max = 10000000;

const uniqueKey = (index: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min + index;
};

export const MultipleLinesChartDecorator = (props: Partial<DecoratorProps>) => {
  const { x, y, combinedData } = props as DecoratorProps;

  return (
    <>
      {combinedData?.map((item, index) => {
        return (
          <Svg key={uniqueKey(index)}>
            {item.data.map((value, index) => (
              <Circle
                key={uniqueKey(index)}
                cx={x(index)}
                cy={y(value)}
                r={4}
                stroke={item.svg.stroke}
                strokeWidth={2}
                fill="white"
              />
            ))}
          </Svg>
        );
      })}
    </>
  );
};

const Trackings = () => {
  // const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80];

  const contentInset = { top: 20, bottom: 20, left: 20, right: 20 };

  const data = [
    {
      data: [10, 20, 30, 25],
      svg: {
        stroke: "red",
        strokeWidth: 3,
      },
    },
    {
      data: [15, 25, 35, 10],
      svg: {
        stroke: "blue",
        strokeWidth: 3,
      },
    },
  ];

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          height: 250,
          flexDirection: "row",
          paddingHorizontal: spacing.small,
        }}
      >
        <YAxis
          data={[10, 15, 20, 25, 30, 35]}
          contentInset={contentInset}
          svg={{
            fill: "grey",
            fontSize: 10,
            fontWeight: "bold",
          }}
          numberOfTicks={7}
          // formatLabel={(value) => `${value}ºC`}
        />
        <LineChart
          style={{ flex: 1, marginLeft: 16 }}
          data={data}
          svg={{ stroke: "rgb(134, 65, 244)" }}
          contentInset={contentInset}
          numberOfTicks={7}
        >
          <Grid />
          <MultipleLinesChartDecorator combinedData={data} />
        </LineChart>
      </View>
    </View>
  );
};

export default Trackings;
