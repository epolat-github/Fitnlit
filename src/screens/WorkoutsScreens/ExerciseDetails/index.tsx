import Ionicons from "@expo/vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import { useVideoPlayer, VideoSource, VideoView } from "expo-video";
import { ScrollView, Text, View } from "react-native";

import FocusAwareStatusBar from "../../../components/FocusAwareStatusBar";
import EquipmentItem from "../../../components/Workouts/EquipmentItem";
import { WorkoutsStackNavigationRouteProp } from "../../../navigation/WorkoutsStackNavigator";
import { spacing } from "../../../theme";

const ExerciseDetails = () => {
  const {
    params: { exercise },
  } = useRoute<WorkoutsStackNavigationRouteProp<"ExerciseDetails">>();

  // const videoSource =
  //   "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

  const assetId = require("../../../../assets/videos/dumbell-curl-video.mp4");

  const videoSource: VideoSource = {
    assetId,
    metadata: {
      title: exercise.name,
      artist: "Fitnlit",
    },
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="always"
      style={{
        flex: 1,
      }}
    >
      <FocusAwareStatusBar style="dark" />

      <VideoView
        style={{
          width: "100%",
          alignSelf: "center",
          height: 250,
        }}
        contentFit="contain"
        player={player}
        allowsFullscreen
        allowsPictureInPicture
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
