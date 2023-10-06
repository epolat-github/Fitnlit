import Feather from "@expo/vector-icons/Feather";
import moment from "moment";
import { useMemo } from "react";
import { LayoutChangeEvent, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { setDayItemsYPosition } from "../../../../slices/workoutsSlice";
import { spacing } from "../../../../theme";
import { toFirstLetterCapital } from "../../../../utils/text";

interface DayItemType {
  day: string;
  index: number;
  isRestDay?: boolean;
}

const EXERCISE_LIST = [
  {
    name: "Dumbell Curl",
    isCompleted: false,
  },
  {
    name: "Barbell Curl",
    isCompleted: true,
  },
  {
    name: "Barbell Chest Press",
    isCompleted: false,
  },
];

const DayItem: React.FC<DayItemType> = (props) => {
  const { day, index, isRestDay = false } = props;

  const dispatch = useAppDispatch();

  const isCurrentDay = useMemo(() => moment().day() - 1 === index, [index]); // moment starts from sunday

  const onLayout = (event: LayoutChangeEvent) => {
    dispatch(
      setDayItemsYPosition({
        index,
        yPosition: event.nativeEvent.layout.y,
      }),
    );
  };

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)}
      style={{
        paddingHorizontal: spacing.medium,
        paddingVertical: spacing.medium,
        backgroundColor: "#fff",
        borderRadius: 10,
        width: "100%",
        gap: spacing.large,
      }}
      onLayout={onLayout}
    >
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          color: isCurrentDay ? "#8B80F8" : "#000",
        }}
      >
        {`${toFirstLetterCapital(day)}${isCurrentDay ? " - current day" : ""}`}
      </Text>

      {isRestDay && (
        <View>
          <Text
            style={{
              color: "gray",
              fontWeight: "600",
              fontSize: 20,
            }}
          >
            Rest Day
          </Text>
        </View>
      )}

      {!isRestDay && (
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: spacing.medium,
          }}
        >
          {EXERCISE_LIST.map((exercise, index) => (
            <View
              key={`exercise-item-${index}`}
              style={{
                backgroundColor: "#f1f1f1",
                borderRadius: 8,
                paddingHorizontal: spacing.medium,
                paddingVertical: spacing.tiny,
                flexDirection: "row",
                alignItems: "center",
                gap: spacing.tiny,
              }}
            >
              {exercise.isCompleted && (
                <Feather name="check" size={16} color="black" />
              )}

              <Text>{exercise.name}</Text>
            </View>
          ))}
        </View>
      )}
    </Animated.View>
  );
};

export default DayItem;
