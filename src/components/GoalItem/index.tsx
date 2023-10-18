import { ImageBackground } from "expo-image";
import { ImageSourcePropType, Pressable, Text, ViewStyle } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import { spacing } from "../../theme";

const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground);

interface GoalItemType {
  value?: number | string;
  title: string;
  image: ImageSourcePropType;
  containerStyle?: ViewStyle;
  index: number;
  onPress?: () => void;
}

const GoalItem: React.FC<GoalItemType> = (props) => {
  const { title, image, value, containerStyle, index, onPress } = props;

  return (
    <AnimatedImageBackground
      entering={FadeInDown.delay(index * 100)}
      source={image}
      contentFit="cover"
      style={[
        {
          height: 120,
          flex: 0.3,
          borderRadius: spacing.medium,
          overflow: "hidden",
        },
        containerStyle,
      ]}
    >
      <Pressable
        onPress={onPress}
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "rgba(0,0,0, 0.4)",
        }}
      >
        <Text
          style={{
            color: "#fff",
          }}
        >
          {value}
        </Text>
        <Text
          style={{
            color: "#fff",
          }}
        >
          {title}
        </Text>
      </Pressable>
    </AnimatedImageBackground>
  );
};

export default GoalItem;
