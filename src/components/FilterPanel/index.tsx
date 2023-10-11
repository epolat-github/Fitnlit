import Entypo from "@expo/vector-icons/Entypo";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import React, { Dispatch, SetStateAction, useState } from "react";
import { StyleSheet, TextInput, ViewStyle, Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

import { colors, spacing } from "../../theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

interface FilterPanelTypes {
  style?: ViewStyle;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  onClear: () => void;
  placeholder: string;
}

const FilterPanel: React.FC<FilterPanelTypes> = ({
  value,
  setValue,
  onClear,
  style,
  placeholder,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const onFocus = () => {
    setIsFocused(true);
  };
  const onBlur = () => {
    setIsFocused(false);
  };

  const containerStyle = useAnimatedStyle(() => ({
    paddingHorizontal: withTiming(isFocused ? 0 : spacing.medium),
  }));

  const textInputStyle = useAnimatedStyle(() => ({
    borderRadius: withTiming(isFocused ? 0 : 10),
    height: withTiming(isFocused ? 50 : 40),
    paddingHorizontal: withTiming(isFocused ? spacing.large : spacing.small),
    width: withTiming(isFocused ? "100%" : "100%"),
  }));

  const clearIconStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: withTiming(isFocused || value ? 0 : 20 + spacing.large),
        },
      ],
    }),
    [value, isFocused],
  );

  return (
    <Animated.View
      style={[
        {
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        },
        containerStyle,
      ]}
    >
      <Animated.View style={[styles.container, style, textInputStyle]}>
        <EvilIcons name="search" size={25} color="#8E8D92" />
        <AnimatedTextInput
          returnKeyType="search"
          onFocus={onFocus}
          onBlur={onBlur}
          autoCorrect={false}
          value={value}
          onChangeText={setValue}
          style={{
            flex: 1,
            marginLeft: spacing.tiny,
          }}
          placeholder={placeholder}
          placeholderTextColor="#8E8D92"
          selectionColor={colors.primary}
        />
        <AnimatedPressable onPress={onClear} style={clearIconStyle}>
          <Entypo name="circle-with-cross" size={20} color="#8e8d9289" />
        </AnimatedPressable>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f6f6f6",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

export default FilterPanel;
