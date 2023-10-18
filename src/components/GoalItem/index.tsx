import { ImageBackground } from "expo-image";
import {
  ImageSourcePropType,
  Pressable,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { spacing } from "../../theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface GoalItemType {
  value?: number | string;
  title: string;
  image: ImageSourcePropType;
  containerStyle?: ViewStyle;
  index: number;
  onPress?: () => void;
  titleStyle?: TextStyle;
  valueStyle?: TextStyle;
}

const GoalItem: React.FC<GoalItemType> = (props) => {
  const {
    title,
    image,
    value,
    containerStyle,
    index,
    onPress,
    titleStyle,
    valueStyle,
  } = props;

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
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={!onPress}
      entering={FadeInDown.delay(index * 100)}
      onPress={onPress}
      style={[
        {
          flex: 0.3,
        },
        animatedStyle,
      ]}
    >
      <ImageBackground
        source={image}
        contentFit="cover"
        style={[
          {
            height: 120,
            borderRadius: spacing.medium,
            overflow: "hidden",
          },
          containerStyle,
        ]}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: "rgba(0,0,0, 0.4)",
          }}
        >
          <Text
            style={[
              {
                color: "#fff",
              },
              valueStyle,
            ]}
          >
            {value}
          </Text>
          <Text
            style={[
              {
                color: "#fff",
              },
              titleStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      </ImageBackground>
    </AnimatedPressable>
  );
};

export default GoalItem;
