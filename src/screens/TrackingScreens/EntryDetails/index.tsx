import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import moment from "moment";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";

import ValuesSection from "../../../components/Trackings/ValuesSection";
import { TrackingStackNavigationType } from "../../../navigation/TrackingStackNavigator";
import { spacing } from "../../../theme";
import { toFirstLetterCapital } from "../../../utils/text";

const ENTRY_DETAIL = {
  id: "052864e8-ac5a-4c28-8c51-76c42e62cdcc",
  date: "08/01/2024",
  weight: "85 kg",
  chest: "0 cm",
  waist: "0 cm",
  hips: "0 cm",
  arm: "0 cm",
  thigh: "0 cm",

  images: [
    {
      name: "front",
      image:
        "https://c8.alamy.com/comp/RHD4AD/young-girl-in-gym-sporty-lifestyle-concept-standing-in-half-squat-pose-looking-forward-breathing-concentrated-RHD4AD.jpg",
    },
    {
      name: "side",
      image: undefined,
    },
    {
      name: "back",
      image:
        "https://as1.ftcdn.net/v2/jpg/01/25/56/88/1000_F_125568811_X9twocjzcYG6poFpI4lrkRI3AqeW2w9Q.jpg",
    },
  ],
};

const EntryDetails = () => {
  const navigation =
    useNavigation<TrackingStackNavigationType<"EntryDetails">>();

  useEffect(() => {
    navigation.setOptions({
      title: moment(ENTRY_DETAIL.date, "DD/MM/YYYY").format("dddd Do MMM"),
    });
  }, [navigation]);

  return (
    <View
      style={{
        gap: spacing.large,
      }}
    >
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingVertical: spacing.medium,
        }}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        decelerationRate="fast"
        snapToAlignment="center"
        snapToInterval={300}
      >
        {ENTRY_DETAIL.images.map((image, index) => (
          <View
            key={`image-${index}`}
            style={{
              justifyContent: "center",
              gap: spacing.small,
              width: 300,
              height: 400,
              paddingHorizontal: spacing.medium,
            }}
          >
            {!image.image && (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#E5E4E2",
                  borderRadius: spacing.medium,
                }}
              >
                <Text>No image found</Text>
              </View>
            )}

            {image.image && (
              <Image
                source={image.image}
                contentFit="cover"
                style={{
                  flex: 1,
                  borderRadius: spacing.medium,
                }}
              />
            )}

            <Text style={{ textAlign: "center", color: "gray" }}>
              {toFirstLetterCapital(image.name)}
            </Text>
          </View>
        ))}
      </ScrollView>

      <ValuesSection />
    </View>
  );
};

export default EntryDetails;
