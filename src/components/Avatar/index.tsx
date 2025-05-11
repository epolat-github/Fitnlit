import Foundation from "@expo/vector-icons/Foundation";
import { Image } from "expo-image";
import { useCallback } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import useProfile from "../../hooks/useProfile";
import { colors } from "../../theme";
import { GENDER } from "../../types/auth.type";

interface AvatarProps {
  onPress?: () => void;
  size?: "small" | "medium" | "large";
  mode?: "default" | "picker";
  imageBase64?: string;
}

const Avatar: React.FC<AvatarProps> = (props) => {
  const { onPress, size = "small", mode = "default", imageBase64 } = props;

  const profile = useProfile();

  const width = size === "small" ? 60 : size === "medium" ? 100 : 120;
  const avatar = imageBase64 || profile.profilePicture;
  const gender = GENDER.MALE; // TODO get real gender from api

  const renderAvatar = useCallback(() => {
    if (avatar) {
      return (
        <Image
          source={{
            uri: imageBase64,
          }}
          contentFit="cover"
          style={{
            borderRadius: width / 2,
            width,
            height: width,
          }}
        />
      );
    } else {
      return (
        <Foundation
          name={gender === GENDER.MALE ? "torso" : "torso-female"}
          size={width + 15}
          color={colors.secondary}
          style={styles.icon}
        />
      );
    }
  }, [avatar, gender, imageBase64, width]);

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.pressable,
        {
          borderRadius: width / 2,
          width,
          height: width,
        },
      ]}
    >
      {renderAvatar()}
      {mode === "picker" && (
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerText}>Change</Text>
        </View>
      )}
    </Pressable>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  icon: { marginTop: 4, opacity: 0.8 },
  pressable: {
    backgroundColor: "lightgray",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    position: "relative",
  },
  pickerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
  },
  pickerText: {
    textAlign: "center",
    color: "#fff",
  },
});
