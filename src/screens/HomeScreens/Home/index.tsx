import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ScrollView, Text, View, useWindowDimensions } from "react-native";

import DonutChart from "../../../components/DonutChart";
import ActiveWorkoutCard from "../../../components/Home/ActiveWorkoutCard";
import NumberOverviewSection from "../../../components/Home/NumberOverviewSection";
import ProgressBar from "../../../components/ProgressBar";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { HomeStackNavigationType } from "../../../navigation/HomeStackNavigator";
import { selectUser } from "../../../slices/authSlice";
import { colors, spacing } from "../../../theme";

const DATA = [
  {
    title: "Carbohydrates",
    color: "tomato",
    value: 66,
    target: 150,
  },
  {
    title: "Fat",
    color: "#7EE3EF",
    value: 32,
    target: 100,
  },
  {
    title: "Protein",
    color: "#1F87FE",
    value: 120,
    target: 360,
  },
  {
    title: "Fibre",
    color: colors.primary,
    value: 400,
    target: 430,
  },
];

const Home = () => {
  const user = useAppSelector(selectUser);
  const navigation = useNavigation<HomeStackNavigationType<"Home">>();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (!user) return;

    const { firstName } = user;

    navigation.setOptions({ title: `Hello, ${firstName}` });
  }, [navigation, user]);

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: spacing.medium,
      }}
    >
      <StatusBar style="dark" />
      <NumberOverviewSection />
      <ActiveWorkoutCard />

      <View
        style={{
          marginVertical: spacing.large,
          gap: spacing.large,
        }}
      >
        <Text
          style={{
            color: "#2E3342",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Nutrition Goals
        </Text>

        <ProgressBar
          value={70}
          maxValue={100}
          containerStyle={{
            width: "100%",
          }}
          title="Calorie Goal"
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            rowGap: spacing.large,
          }}
        >
          {DATA.map((data, index) => (
            <View
              key={`nutrition-data-${index}`}
              style={{
                alignItems: "center",
                gap: spacing.medium,
              }}
            >
              <Text style={{ color: data.color }}>{data.title}</Text>
              <DonutChart
                radius={width * 0.1}
                value={data.value}
                maxValue={data.target}
                color={data.color}
                strokeWidth={6}
              >
                <View style={{ gap: spacing.tiny, alignItems: "center" }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontWeight: "bold",
                      fontSize: 14,
                    }}
                  >
                    {data.value}
                  </Text>
                  <View
                    style={{
                      width: 35,
                      height: 1,
                      opacity: 0.5,
                      backgroundColor: data.color,
                    }}
                  />
                  <Text
                    style={{ textAlign: "center", color: "gray", fontSize: 14 }}
                  >
                    {`${data.target}g`}
                  </Text>
                </View>
              </DonutChart>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
