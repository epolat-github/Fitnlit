import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useEventListener } from "expo";
import {
  useVideoPlayer,
  VideoPlayerStatus,
  VideoSource,
  VideoView,
} from "expo-video";
import { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

import Button from "../../../components/Button";
import { WORKOUT } from "../../../mockupData";
import { WorkoutsStackNavigationType } from "../../../navigation/WorkoutsStackNavigator";
import { colors, spacing } from "../../../theme";

const assetId = require("../../../../assets/videos/dumbell-curl-video.mp4");

const WorkoutHelper = () => {
  const navigation =
    useNavigation<WorkoutsStackNavigationType<"WorkoutHelper">>();

  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [playerStatus, setPlayerStatus] = useState<VideoPlayerStatus | null>(
    null,
  );
  const [isPlaying, setIsPlaying] = useState(false);

  const currentMove = WORKOUT[currentMoveIndex];
  const nextMove = WORKOUT[currentMoveIndex + 1];

  const isPreviousMoveAvailable = currentMoveIndex !== 0;
  const isNextMoveAvailable = currentMoveIndex !== WORKOUT.length - 1;

  const videoSource: VideoSource = {
    assetId,
    metadata: {
      title: currentMove.name,
      artist: "Fitnlit",
    },
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  useEventListener(player, "statusChange", ({ status, error }) => {
    setPlayerStatus(status);
  });

  useEventListener(player, "playingChange", ({ isPlaying }) => {
    setIsPlaying(isPlaying);
  });

  const toggleVideo = async () => {
    if (!playerStatus) return;

    if (isPlaying) {
      player.pause();
    } else {
      player.play();
    }
  };

  const renderCentralButton = () => {
    // console.log(playerStatus);
    // if (playerStatus === "loading") {
    //   return <Text>Loading</Text>;
    // }

    return (
      <Pressable onPress={toggleVideo}>
        <View
          style={{
            padding: spacing.medium,
            backgroundColor: colors.secondary,
            borderRadius: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isPlaying ? (
            <Feather name="pause" size={22} color="#fff" />
          ) : (
            <Feather name="play" size={22} color="#fff" />
          )}
        </View>
      </Pressable>
    );
  };

  const skipToNextMove = () => {
    setCurrentMoveIndex((prev) =>
      prev === WORKOUT.length - 1 ? prev : prev + 1,
    );
  };

  const skipToPreviousMove = () => {
    setCurrentMoveIndex((prev) => (prev === 0 ? prev : prev - 1));
  };

  const endWorkout = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView
      style={{
        justifyContent: "space-between",
        flex: 1,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "500",
          textAlign: "center",
        }}
      >
        {currentMove.name}
      </Text>

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
          alignItems: "center",
          gap: spacing.large,
          flex: 0.4,
          paddingVertical: spacing.large,
          paddingHorizontal: spacing.large,
        }}
      >
        {/* Control Buttons */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.large,
          }}
        >
          <Pressable
            disabled={!isPreviousMoveAvailable}
            onPress={skipToPreviousMove}
          >
            <View
              style={{
                backgroundColor: "#000",
                padding: spacing.small,
                borderRadius: 50,
              }}
            >
              <Feather
                name="skip-back"
                size={24}
                color={isPreviousMoveAvailable ? "#fff" : "gray"}
              />
            </View>
          </Pressable>
          {renderCentralButton()}
          <Pressable disabled={!isNextMoveAvailable} onPress={skipToNextMove}>
            <View
              style={{
                backgroundColor: "#000",
                padding: spacing.small,
                borderRadius: 50,
              }}
            >
              <Feather
                name="skip-forward"
                size={24}
                color={isNextMoveAvailable ? "#fff" : "gray"}
              />
            </View>
          </Pressable>
        </View>

        <View
          style={{
            backgroundColor: "#f6f6f6",
            paddingHorizontal: spacing.medium,
            paddingVertical: spacing.small,
            width: "100%",
            borderRadius: spacing.medium,
          }}
        >
          {nextMove ? (
            <Text>Next move: {nextMove.name}</Text>
          ) : (
            <Text>End of exercise</Text>
          )}
        </View>

        <Button text="End Workout" onPress={endWorkout} />
      </View>
    </SafeAreaView>
  );
};

export default WorkoutHelper;
