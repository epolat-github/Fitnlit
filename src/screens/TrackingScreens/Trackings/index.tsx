import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import moment from "moment";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Circle, Svg } from "react-native-svg";
import { LineChart, Grid, YAxis } from "react-native-svg-charts";

import Button from "../../../components/Button";
import ValuesSection from "../../../components/Trackings/ValuesSection";
import { TrackingStackNavigationType } from "../../../navigation/TrackingStackNavigator";
import { spacing } from "../../../theme";

const MY_STATS = [
  {
    name: "Start Weight",
    value: "90 KG",
  },
  {
    name: "Weight Difference",
    value: "0 KG",
  },
  {
    name: "Start Chest",
    value: "0 CM",
  },
  {
    name: "Chest Difference",
    value: "0 CM",
  },
  {
    name: "Start Waist",
    value: "0 CM",
  },
  {
    name: "Waist Difference",
    value: "0 CM",
  },
  {
    name: "Start Hips",
    value: "0 CM",
  },
  {
    name: "Hips Difference",
    value: "0 CM",
  },
  {
    name: "Start Arm",
    value: "0 CM",
  },
  {
    name: "Arm Difference",
    value: "0 CM",
  },
  {
    name: "Start Thigh",
    value: "0 CM",
  },
  {
    name: "Thigh Difference",
    value: "0 CM",
  },
];

const MY_ENTRIES = [
  {
    id: "052864e8-ac5a-4c28-8c51-76c42e62cccc",
    weight: "90 kg",
    date: moment("04/01/2024", "DD/MM/YYYY").format("Do MMM"),
  },
  {
    id: "052864e8-ac5a-4c28-8c51-76c42e62cdcc",
    weight: "85 kg",
    date: moment("08/01/2024", "DD/MM/YYYY").format("Do MMM"),
  },
  {
    id: "052864e8-ac5a-4c28-8c51-76d42e62cdcc",
    weight: "83 kg",
    date: moment("10/01/2024", "DD/MM/YYYY").format("Do MMM"),
  },
];

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
  const navigation = useNavigation<TrackingStackNavigationType<"Trackings">>();

  const [selectedTab, setSelectedTab] = useState<"MY_STATS" | "MY_ENTRIES">(
    "MY_STATS",
  );

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

  const navigateToEntryDetails = (entryId: string) => {
    navigation.navigate("EntryDetails", {
      entryId,
    });
  };

  const navigateToUpdateMeasurements = () => {
    navigation.navigate("UpdateMeasurements");
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="always">
      <StatusBar style="light" />
      <View
        style={{
          flex: 1,
          gap: spacing.large,
          paddingHorizontal: spacing.medium,
          paddingBottom: spacing.large,
          paddingTop: spacing.large,
        }}
      >
        {/* Chart Section */}
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

        {/* Values Section */}
        <ValuesSection />

        <Button
          text="Update my Measurements"
          onPress={navigateToUpdateMeasurements}
        />

        {/* Detailed stats section */}
        <View style={{ gap: spacing.large }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              padding: 2,
              backgroundColor: "lightgray",
              borderRadius: spacing.small,
              height: 30,
            }}
          >
            <Pressable
              onPress={() => setSelectedTab("MY_STATS")}
              style={{
                backgroundColor:
                  selectedTab === "MY_STATS" ? "#fff" : "transparent",
                flex: 1,
                borderRadius: spacing.small,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>My Stats</Text>
            </Pressable>
            <Pressable
              onPress={() => setSelectedTab("MY_ENTRIES")}
              style={{
                backgroundColor:
                  selectedTab === "MY_ENTRIES" ? "#fff" : "transparent",
                flex: 1,
                borderRadius: spacing.small,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>My Entries</Text>
            </Pressable>
          </View>

          {selectedTab === "MY_STATS" &&
            MY_STATS.map((stat) => (
              <View
                key={stat.name}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: spacing.small,
                }}
              >
                <Text>{stat.name}</Text>
                <Text>{stat.value}</Text>
              </View>
            ))}

          {selectedTab === "MY_ENTRIES" &&
            MY_ENTRIES.map((entry, index) => (
              <Pressable
                key={entry.id}
                onPress={() => navigateToEntryDetails(entry.id)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottomColor: "gray",
                  borderBottomWidth: StyleSheet.hairlineWidth,
                  paddingBottom: spacing.medium,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingHorizontal: spacing.small,
                    gap: spacing.tiny,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: spacing.medium,
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 16 }}>{entry.weight}</Text>
                    {index === 0 && (
                      <View
                        style={{
                          backgroundColor: "#C4D6B0",
                          padding: spacing.tiny,
                          borderRadius: spacing.medium,
                        }}
                      >
                        <Text style={{ fontSize: 10 }}>Onboarding</Text>
                      </View>
                    )}
                  </View>
                  <Text style={{ color: "gray" }}>{entry.date}</Text>
                </View>

                <AntDesign name="caretright" size={18} color="lightgray" />
              </Pressable>
            ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Trackings;
