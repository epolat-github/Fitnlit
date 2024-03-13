import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Carousel from "../../../components/Onboarding/Carousel";

const Onboarding = () => {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();

  const data = [
    {
      header: "Become fit with us",
      text: "With Fit&Lit, you can achieve the body that you have always wanted",
      image: require("../../../../assets/images/onboarding/image-1.jpeg"),
    },
    {
      header: "Train with a tailored workout",
      text: "We will prepare a workout plan just for you to work on yourself in your own preferences",
      image: require("../../../../assets/images/onboarding/image-2.jpeg"),
    },
    {
      header: "Eat well, feel well",
      text: "We will prepare a mealing program just for you needs and meal preferences.",
      image: require("../../../../assets/images/onboarding/image-3.jpeg"),
    },
    {
      header: "Exercitation laborum velit",
      text: "Non ex ullamco elit veniam incididunt quis. Irure anim do amet fugiat amet aute laboris sint anim labore officia.",
      image: require("../../../../assets/images/onboarding/image-4.jpeg"),
    },
    {
      header: "Exercitation laborum velit",
      text: "Non ex ullamco elit veniam incididunt quis. Irure anim do amet fugiat amet aute laboris sint anim labore officia.",
      image: require("../../../../assets/images/onboarding/image-5.jpeg"),
    },
    {
      header: "Exercitation laborum velit",
      text: "Non ex ullamco elit veniam incididunt quis. Irure anim do amet fugiat amet aute laboris sint anim labore officia.",
      image: require("../../../../assets/images/onboarding/image-6.jpeg"),
    },
  ];

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <StatusBar style="light" backgroundColor="#ecf0f1" />

      {/* LOGO */}
      <Image
        source={require("../../../../assets/images/logo/logo.png")}
        style={{
          position: "absolute",
          top: insets.top,
          zIndex: 2,
          width,
          height: 40,
        }}
        contentFit="contain"
      />

      <Carousel data={data} />
    </View>
  );
};

export default Onboarding;
