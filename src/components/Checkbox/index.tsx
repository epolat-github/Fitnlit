import AntDesign from "@expo/vector-icons/AntDesign";
import { ColorValue, Pressable, StyleSheet, View } from "react-native";
import Animated, { ZoomIn } from "react-native-reanimated";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CheckboxType {
  isChecked: boolean;
  color?: ColorValue;
  onPress: () => void;
}

const Checkbox: React.FC<CheckboxType> = (props) => {
  const { onPress, isChecked, color = "green" } = props;

  return (
    <AnimatedPressable
      key={String(isChecked)}
      entering={ZoomIn}
      onPress={onPress}
      style={{
        width: 25,
        height: 25,
        borderRadius: 13,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: color,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isChecked && <AntDesign name="checkcircle" size={25} color={color} />}
    </AnimatedPressable>
  );
};

export default Checkbox;
