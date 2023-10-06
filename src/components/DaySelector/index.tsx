import moment, { Moment } from "moment";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { spacing } from "../../theme";
import { DAYS_SHORT_EN } from "../../utils/date";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface DayButtonType {
  day: string;
  date: number;
  isActiveDay?: boolean;
  isSelected?: boolean;
  onPress: () => unknown;
}

const DayButton: React.FC<DayButtonType> = (props) => {
  const { onPress, date, day, isActiveDay = false, isSelected = false } = props;

  const containerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isSelected ? "#7165E3" : "transparent", {
        duration: 300,
      }),
    };
  });

  const textStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(isSelected ? "#7165E3" : "#fff", {
        duration: 300,
      }),
    };
  });

  const innerContainerStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: withTiming(isSelected ? "#fff" : "transparent", {
        duration: 300,
      }),
    };
  });

  return (
    <AnimatedPressable
      onPress={onPress}
      style={[
        {
          alignItems: "center",
          gap: spacing.small,
          paddingHorizontal: spacing.tiny,
          paddingVertical: spacing.small,
          paddingTop: spacing.medium,
          minWidth: 50,
          //   backgroundColor: isSelected ? "#7165E3" : "transparent",
          borderRadius: 30,
        },
        containerStyle,
      ]}
    >
      <Text style={{ color: "#fff" }}>{day}</Text>
      <Animated.View
        style={[
          {
            alignItems: "center",
            borderRadius: 50,
            // backgroundColor: isSelected ? "#fff" : "transparent",
            padding: spacing.small,
          },
          innerContainerStyle,
        ]}
      >
        <Animated.Text style={[{ fontWeight: "bold" }, textStyle]}>
          {date}
        </Animated.Text>
      </Animated.View>

      {/* active day indicator */}
      {/* {isActiveDay && !isSelected && (
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 5,
            backgroundColor: "#fff",
          }}
        />
      )} */}
    </AnimatedPressable>
  );
};

interface DaySelectorType {
  startDate?: Moment;
  selectedDayIndex: number;
  changeSelectedDayIndex: (index: number) => unknown;
}

const DaySelector: React.FC<DaySelectorType> = (props) => {
  const {
    startDate = moment(),
    selectedDayIndex,
    changeSelectedDayIndex,
  } = props;

  const mondayDate = moment().startOf("isoWeek");

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: spacing.medium,
      }}
    >
      {DAYS_SHORT_EN.map((day, index) => (
        <DayButton
          key={`day-${index}`}
          day={day}
          date={mondayDate.clone().add(index, "day").get("date")}
          isActiveDay={index === 2 || index === 5}
          isSelected={selectedDayIndex === index}
          onPress={() => changeSelectedDayIndex(index)}
        />
      ))}
    </View>
  );
};

export default DaySelector;
