import { Image } from "expo-image";
import { memo } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { spacing } from "../../../theme";
import { MealOld } from "../../../types/meals.type";
import Checkbox from "../../Checkbox";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface MealItemType {
  meal: MealOld;
  index: number;
  showIsEatenCheckbox?: boolean;
  onPress: () => void;
}

const MealItem: React.FC<MealItemType> = (props) => {
  const { meal, index, showIsEatenCheckbox, onPress } = props;

  return (
    <AnimatedPressable
      onPress={onPress}
      entering={FadeInDown.delay(index * 100)}
      style={{
        backgroundColor: "#fff",
        borderRadius: 10,
        width: "100%",
        gap: spacing.large,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          overflow: "hidden",
          alignItems: "center",
        }}
      >
        {/* image */}
        <View
          style={{
            flex: 0.3,
            height: 110,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <Image
            source={meal.image}
            contentFit="cover"
            style={{
              flex: 1,
              width: "100%",
            }}
          />
        </View>

        {/* information */}
        <View
          style={{
            flex: 0.6,
            paddingHorizontal: spacing.small,
            gap: spacing.small,
          }}
        >
          <Text>{meal.name}</Text>

          <View
            style={{
              flexDirection: "row",
              gap: spacing.medium,
              flexWrap: "wrap",
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "gray" }}>CAL: </Text>
              <Text>{meal.calorie}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "gray" }}>P: </Text>
              <Text>{meal.protein}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "gray" }}>F: </Text>
              <Text>{meal.fat}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "gray" }}>C: </Text>
              <Text>{meal.carb}</Text>
            </View>
          </View>
        </View>

        {/* isEaten checkbox */}
        {showIsEatenCheckbox && (
          <View
            style={{
              flex: 0.1,
            }}
          >
            <Checkbox isChecked={meal.isEaten} onPress={() => alert("eaten")} />
          </View>
        )}
      </View>
    </AnimatedPressable>
  );
};

export default memo(MealItem);
