import { ImageBackground } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { View, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const AnimatedImage = Animated.createAnimatedComponent(ImageBackground);
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
      Extrapolate.CLAMP,
    );

    const translateX = interpolate(
      translationX.value,
      inputRange,
      [-width * 0.7, 0, width * 0.7],
      Extrapolate.CLAMP,
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
      Extrapolate.CLAMP,
    );

    const translateX = interpolate(
      translationX.value,
      inputRange,
      [-width * 0.7 * 2, 0, width * 0.7 * 2],

      Extrapolate.CLAMP,
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
      Extrapolate.CLAMP,
    );

    const translateX = interpolate(
      translationX.value,
      inputRange,
      [-width * 0.7 * 1.9, 0, width * 0.7 * 1.9],
      Extrapolate.CLAMP,
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
      >
        <AnimatedLinearGradient
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.9)"]}
        />
      </AnimatedImage>

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
