import Ionicons from "@expo/vector-icons/Ionicons";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { spacing } from "../../theme";
import { Exercise } from "../../types/exercise.type";
import EquipmentItem from "../Workouts/EquipmentItem";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ExerciseCardType {
  onPress: () => void;
  exercise: Exercise;
}

const ExerciseCard: React.FC<ExerciseCardType> = (props) => {
  const { onPress, exercise } = props;

  const scale = useSharedValue(1);

  const onPressIn = () => {
    scale.value = withTiming(0.95);
  };

  const onPressOut = () => {
    scale.value = withTiming(1);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  return (
    <AnimatedPressable
      unstable_pressDelay={300}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={[
        {
          paddingHorizontal: spacing.medium,
          paddingVertical: spacing.medium,
          backgroundColor: "#fff",
          borderRadius: 10,
          width: "100%",
          gap: spacing.large,
          borderStyle: "solid",
          borderColor: "lightgray",
          borderWidth: 1,
        },
        animatedStyle,
      ]}
    >
      <Text
        style={{
          fontWeight: "600",
          fontSize: 18,
        }}
      >
        {exercise.name}
      </Text>
      <Text>{exercise.description}</Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          rowGap: spacing.small,
        }}
      >
        {exercise.equipments.map((equipment, index) => (
          <EquipmentItem
            key={`equipment-${index}`}
            text={equipment}
            icon={<Ionicons name="barbell-outline" size={24} />}
          />
        ))}
      </View>
    </AnimatedPressable>
  );
};

export default ExerciseCard;
