import { useMemo } from "react";
import { View, useWindowDimensions } from "react-native";
import Animated, {
  Extrapolate,
  SharedValue,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from "react-native-reanimated";

const THUMB_SIZE = 8;

interface ThumbType {
  index: number;
  translationX: SharedValue<number>;
}

const Thumb: React.FC<ThumbType> = (props) => {
  const { index, translationX } = props;

  const { width, height } = useWindowDimensions();

  const inputRange = useMemo(
    () => [(index - 1) * width, index * width, (index + 1) * width],
    [index, width],
  );

  const thumbStyle = useAnimatedStyle(() => {
    const thumbWidth = interpolate(
      translationX.value,
      inputRange,
      [THUMB_SIZE, THUMB_SIZE * 2, THUMB_SIZE],
      Extrapolate.CLAMP,
    );

    const color = interpolateColor(translationX.value, inputRange, [
      "lightgray",
      "#fff",
      "lightgray",
    ]);

    return {
      width: thumbWidth,
      backgroundColor: color,
    };
  });

  return (
    <Animated.View
      style={[
        {
          // width: 10,
          height: THUMB_SIZE,
          borderRadius: 5,
          backgroundColor: "#fff",
        },
        thumbStyle,
      ]}
    />
  );
};

interface CarouselPaginationType {
  translationX: SharedValue<number>;
  pageCount: number;
}

const CarouselPagination: React.FC<CarouselPaginationType> = (props) => {
  const { translationX, pageCount } = props;

  const { width, height } = useWindowDimensions();

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 5,
        // position: "absolute",
        // bottom: "30%",
        width,
        justifyContent: "center",
      }}
    >
      {new Array(pageCount).fill(0).map((_, index) => (
        <Thumb
          key={`thumb-${index}`}
          index={index}
          translationX={translationX}
        />
      ))}
    </View>
  );
};

export default CarouselPagination;
