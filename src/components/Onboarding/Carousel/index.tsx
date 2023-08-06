import { useNavigation } from "@react-navigation/native";
import { View, useWindowDimensions } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import CarouselPage from "./CarouselPage";
import CarouselPagination from "./CarouselPagination";
import { useHaptics } from "../../../hooks/useHaptics";
import { AuthStackNavigationType } from "../../../navigation/AuthNavigator";
import Button from "../../Button";

interface CarouselType {
  data: {
    header: string;
    text: string;
    image: any;
  }[];
}

const Carousel: React.FC<CarouselType> = (props) => {
  const { data } = props;

  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const haptics = useHaptics();
  const navigation = useNavigation<AuthStackNavigationType<"Onboarding">>();

  const translationX = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(
    (event) => (translationX.value = event.contentOffset.x),
  );

  const navigateToLogin = () => {
    haptics.runNavigateHaptic();

    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.ScrollView
        style={{
          width,
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        bounces={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        decelerationRate="fast"
      >
        {data.map((pageData, index) => (
          <CarouselPage
            key={`page-${index}`}
            index={index}
            translationX={translationX}
            {...pageData}
          />
        ))}
      </Animated.ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          paddingBottom: insets.bottom,
          paddingRight: 15,
          paddingLeft: 15,
          gap: 20,
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CarouselPagination
          translationX={translationX}
          pageCount={data.length}
        />

        <Button text="Login" onPress={navigateToLogin} />
      </View>
    </View>
  );
};

export default Carousel;
