import { useEffect, useMemo } from "react";
import { ColorValue, StyleSheet, Text, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import Svg, { G, Circle, Rect } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface DonutChartType {
  radius?: number;
  strokeWidth?: number;
  color?: ColorValue;
  maxValue?: number;
  value: number;
  children?: JSX.Element;
}

const DonutChart: React.FC<DonutChartType> = (props) => {
  const {
    radius = 40,
    strokeWidth = 10,
    color = "tomato",
    maxValue = 100,
    value,
    children,
  } = props;

  const animationProgress = useSharedValue(0);

  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const halfCircle = useMemo(() => radius + strokeWidth, [radius, strokeWidth]);

  useEffect(() => {
    animationProgress.value = withDelay(
      150,
      withTiming(1, {
        duration: 600,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      }),
    );
  }, [animationProgress]);

  const animatedProps = useAnimatedProps(() => {
    const percentage = value / maxValue;

    const targetStrokeDashoffset = circumference * (1 - percentage);

    const strokeDashoffset = interpolate(
      animationProgress.value,
      [0, 1],
      [circumference, targetStrokeDashoffset],
    );

    return {
      strokeDashoffset,
    };
  });

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
    >
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </View>
      <Svg
        height={radius * 2}
        width={radius * 2}
        viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}
      >
        <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
          <AnimatedCircle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
          />
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>
    </View>
  );
};

export default DonutChart;
