import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { AVPlaybackStatus, ResizeMode, Video } from "expo-av";
import { useRef, useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";

import Button from "../../../components/Button";
import { WORKOUT } from "../../../mockupData";
import { WorkoutsStackNavigationType } from "../../../navigation/WorkoutsStackNavigator";
import { colors, spacing } from "../../../theme";

const WorkoutHelper = () => {
  const navigation =
    useNavigation<WorkoutsStackNavigationType<"WorkoutHelper">>();

  const videoRef = useRef<Video | null>(null);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [videoStatus, setVideoStatus] = useState<AVPlaybackStatus | null>(null);

  const currentMove = WORKOUT[currentMoveIndex];
  const nextMove = WORKOUT[currentMoveIndex + 1];

  const isPreviousMoveAvailable = currentMoveIndex !== 0;
  const isNextMoveAvailable = currentMoveIndex !== WORKOUT.length - 1;

  const toggleVideo = async () => {
    if (!videoRef?.current || !videoStatus) return;

    if (!videoStatus.isLoaded) return;

    if (videoStatus.isPlaying) {
      videoRef.current.pauseAsync();
    } else {
      videoRef.current.playAsync();
    }
  };

  const renderCentralButton = () => {
    if (!videoStatus?.isLoaded) {
      return <Text>Loading</Text>;
    }

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
          {videoStatus.isPlaying ? (
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

      <Video
        ref={videoRef}
        style={{
          alignSelf: "center",
          width: "100%",
          height: 220,
        }}
        source={require("../../../../assets/videos/dumbell-curl-video.mp4")}
        shouldPlay={false}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        onPlaybackStatusUpdate={(status) => setVideoStatus(status)}
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
