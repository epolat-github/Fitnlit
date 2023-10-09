import Ionicons from "@expo/vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import { ResizeMode, Video, VideoFullscreenUpdateEvent } from "expo-av";
import * as ScreenOrientation from "expo-screen-orientation";
import { ScrollView, Text, View } from "react-native";

import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import EquipmentItem from "../../../components/Workouts/EquipmentItem";
import { WorkoutsStackNavigationRouteProp } from "../../../navigation/WorkoutsStackNavigator";
import { spacing } from "../../../theme";

const ExerciseDetails = () => {
  const {
    params: { exercise },
  } = useRoute<WorkoutsStackNavigationRouteProp<"ExerciseDetails">>();

  const onFullscreenUpdate = async (e: VideoFullscreenUpdateEvent) => {
    if (e.fullscreenUpdate === 1) {
      console.log("fullscreen opened");

      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT,
      );
    } else if (e.fullscreenUpdate === 3) {
      console.log("fullscreen dismissed");

      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP,
      );
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="always">
      <FocusAwareStatusBar style="dark" />

      <Video
        // ref={video}
        style={{
          alignSelf: "center",
          width: "100%",
          height: 220,
        }}
        source={require("../../../../assets/videos/dumbell-curl-video.mp4")}
        shouldPlay
        // onFullscreenUpdate={onFullscreenUpdate}
        // source={{
        //   uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
        // }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        // isLooping
        // onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />

      <View
        style={{
          paddingHorizontal: spacing.medium,
          paddingVertical: spacing.medium,
          gap: spacing.medium,
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {exercise.name}
        </Text>

        <Text
          style={{
            lineHeight: 18,
          }}
        >
          {exercise.description}
        </Text>

        <View
          style={{
            gap: spacing.medium,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Equipments
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              rowGap: spacing.small,
            }}
          >
            {exercise.equipments.map((equipment, index) => (
              <EquipmentItem
                key={`equipment-${index}`}
                text={equipment}
                icon={<Ionicons name="barbell-outline" size={24} />}
              />
            ))}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ExerciseDetails;
