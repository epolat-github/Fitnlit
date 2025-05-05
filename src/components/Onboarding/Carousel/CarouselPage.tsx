import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { View, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolation,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(Image);
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

interface CarouselPageType {
  header: string;
  text: string;
  image: any;
  index: number;
  translationX: SharedValue<number>;
}

const CarouselPage: React.FC<CarouselPageType> = (props) => {
  const { header, image, text, index, translationX } = props;

  const { width, height } = useWindowDimensions();

  const inputRange = useMemo(
    () => [(index - 1) * width, index * width, (index + 1) * width],
    [index, width],
  );

  const backgroundStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translationX.value,
      inputRange,
      [1.05, 1, 1.05],
      Extrapolation.CLAMP,
    );

    const translateX = interpolate(
      translationX.value,
      inputRange,
      [-width * 0.7, 0, width * 0.7],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        {
          scale,
        },
        {
          translateX,
        },
      ],
    };
  });

  const headerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );

    const translateX = interpolate(
      translationX.value,
      inputRange,
      [-width * 0.7 * 2, 0, width * 0.7 * 2],

      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [
        {
          translateX,
        },
      ],
    };
  });

  const textStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translationX.value,
      inputRange,
      [0, 1, 0],
      Extrapolation.CLAMP,
    );

    const translateX = interpolate(
      translationX.value,
      inputRange,
      [-width * 0.7 * 1.9, 0, width * 0.7 * 1.9],
      Extrapolation.CLAMP,
    );

    return {
      opacity,
      transform: [
        {
          translateX,
        },
      ],
    };
  });

  return (
    <View
      style={{
        width,
        justifyContent: "flex-end",
        overflow: "hidden",
      }}
    >
      {/* bacground absolute image  */}
      <AnimatedImage
        style={[
          {
            position: "absolute",
            height,
            width,
          },
          backgroundStyle,
        ]}
        source={image}
        contentFit="cover"
      />
      <AnimatedLinearGradient
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.3)"]}
      />

      {/* bottom section */}
      <View
        style={{
          flex: 0.6,
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Animated.Text
          style={[
            {
              fontWeight: "bold",
              fontSize: 24,
              textAlign: "center",
              color: "#fff",
              fontFamily: "PlayfairDisplaySemiBold",
            },
            headerStyle,
          ]}
        >
          {header}
        </Animated.Text>
        <Animated.Text
          style={[
            {
              fontWeight: "500",
              fontSize: 16,
              width: "80%",
              textAlign: "center",
              color: "#fff",
            },
            textStyle,
          ]}
        >
          {text}
        </Animated.Text>
      </View>
    </View>
  );
};

export default CarouselPage;
