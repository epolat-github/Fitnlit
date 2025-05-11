import { AntDesign, Entypo } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { FullWindowOverlay } from "react-native-screens";

import { spacing } from "../theme";

type snackbarContextType = {
  showSnackbar: (textInput: string, options?: SnackbarOptions) => void;
};

const SnackbarContext = createContext<snackbarContextType | undefined>(
  undefined,
);

export function useSnackbarContext() {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error(
      "useSnackbarContext must be used within a SnackbarContextProvider",
    );
  }
  return context;
}

type SnackbarContextProviderProps = {
  children: ReactNode;
};

type SnackbarVariants = "default" | "error" | "success" | "info" | "warning";

interface SnackbarOptions {
  variant?: SnackbarVariants;
  duration?: number;
}

export const SnackbarContextProvider = ({
  children,
}: SnackbarContextProviderProps) => {
  const [text, setText] = useState<string>("");
  const [isShown, setIsShown] = useState<boolean>(false);
  const [variant, setVariant] = useState<SnackbarVariants>("default");

  const runHaptics = (variant: SnackbarVariants) => {
    switch (variant) {
      case "error":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
        break;
      case "success":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        break;
      case "warning":
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        break;

      default:
        break;
    }
  };

  const showSnackbar = useCallback(
    (textInput: string, options?: SnackbarOptions) => {
      const { duration = 3000, variant = "default" } = options || {};

      setVariant(variant);
      setIsShown(true);
      setText(textInput);

      runHaptics(variant);

      setTimeout(() => {
        setIsShown(false);
      }, duration);

      setTimeout(() => {
        setText("");
        setVariant("default");
      }, duration + 200);
    },
    [],
  );

  const icon = useMemo(() => {
    switch (variant) {
      case "default":
        return null;
      case "success":
        return <AntDesign name="checkcircle" size={18} color="#fff" />;
      case "error":
        return <Entypo name="circle-with-cross" size={18} color="#fff" />;
      case "info":
        return <Entypo name="info-with-circle" size={18} color="#fff" />;
      case "warning":
        return <Entypo name="warning" size={18} color="#fff" />;

      default:
        return null;
    }
  }, [variant]);

  const backgroundColor = useMemo(() => {
    switch (variant) {
      case "default":
        return "#313131";
      case "success":
        return "#44A047";
      case "error":
        return "#D3302F";
      case "info":
        return "#2196F3";
      case "warning":
        return "#FF9800";

      default:
        return "#313131";
    }
  }, [variant]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(isShown ? -50 : 60, {
            damping: 15, // Daha büyük → daha az zıplama
            stiffness: 120, // Daha küçük → daha yumuşak ve yavaş
          }),
        },
      ],
    };
  });

  return (
    <SnackbarContext.Provider
      value={{
        showSnackbar,
      }}
    >
      <FullWindowOverlay>
        <Animated.View
          style={[
            styles.container,
            {
              backgroundColor,
            },
            animatedStyle,
          ]}
        >
          <View style={styles.iconContainer}>
            {icon}
            <Text style={styles.text}>{text}</Text>
          </View>
        </Animated.View>
      </FullWindowOverlay>
      {children}
    </SnackbarContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingHorizontal: spacing.large,
    paddingVertical: spacing.medium,
    width: "90%",
    alignSelf: "center",
    minHeight: 50,
    position: "absolute",
    bottom: 0,
    left: "5%",
    right: "5%",
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: "row",
    gap: spacing.medium,
    alignItems: "center",
  },
  text: {
    textAlign: "left",
    color: "#fff",
    fontWeight: "400",
    flexShrink: 1,
  },
});
