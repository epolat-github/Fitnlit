import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  FadeIn,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import Button from "../../../components/Button";
import { useHaptics } from "../../../hooks/useHaptics";
import { AuthStackNavigationType } from "../../../navigation/AuthNavigator";
import { spacing } from "../../../theme";

const starData = [
  {
    x: 130,
    y: 150,
    size: 24,
  },
  {
    x: 80,
    y: 300,
    size: 36,
  },
  {
    x: 80,
    y: 200,
    size: 28,
  },
  {
    x: 40,
    y: 250,
    size: 24,
  },
  {
    x: 300,
    y: 200,
    size: 24,
  },
  {
    x: 350,
    y: 250,
    size: 16,
  },
  {
    x: 280,
    y: 280,
    size: 24,
  },
  {
    x: 330,
    y: 300,
    size: 36,
  },
];

interface StarType {
  size: number;
  x: number;
  y: number;
}

const Star: React.FC<StarType> = (props) => {
  const { size, x, y } = props;

  const progress = useSharedValue(-1);

  useEffect(() => {
    progress.value = withRepeat(withTiming(1, { duration: 6000 }), -1, true);
  }, [progress]);

  const translateY = useDerivedValue(() => progress.value * 5);

  return (
    <Animated.View
      entering={FadeIn.delay(600).randomDelay()}
      style={[
        {
          opacity: 0.7,
          position: "absolute",
          left: x,
          top: y,
          zIndex: -1,
          justifyContent: "center",
          alignItems: "center",
          transform: [
            {
              translateY,
            },
          ],
        },
      ]}
    >
      <MaterialCommunityIcons
        name="star-four-points"
        size={size}
        color="#fff"
      />
    </Animated.View>
  );
};

const SuccessfulRegistration = () => {
  const haptics = useHaptics();
  const navigation =
    useNavigation<AuthStackNavigationType<"SuccessfulRegistration">>();

  useEffect(() => {
    haptics.runNavigateHaptic();
  }, [haptics]);

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: spacing.large,
        gap: spacing.huge,
      }}
    >
      <StatusBar style="light" />
      <LinearGradient
        colors={["#9A85DA", "#5500FF"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: -2,
        }}
      />

      <MaterialCommunityIcons name="check-circle" size={144} color="#fff" />

      {starData.map((data, index) => (
        <Star key={`star-${index}`} {...data} />
      ))}

      {/* text section */}
      <View
        style={{
          gap: spacing.medium,
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontWeight: "bold",
            fontSize: 28,
          }}
        >
          You're all set!
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: 16,
          }}
        >
          Your account has been successfuly created.
        </Text>
      </View>

      <Button
        text="Go to Login page"
        textStyle={{
          color: "#5500FF",
        }}
        containerStyle={{
          backgroundColor: "#fff",
        }}
        onPress={navigateToLogin}
      />
    </View>
  );
};

export default SuccessfulRegistration;
