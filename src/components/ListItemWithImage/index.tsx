import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Pressable, Text, View } from "react-native";

import { spacing } from "../../theme";

interface ListItemWithImageProps {
  onPress: () => void;
  image: string; // base64
  title: string;
}

const ListItemWithImage: React.FC<ListItemWithImageProps> = ({
  title,
  image,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={{
        gap: spacing.medium,
      }}
    >
      <View
        style={{
          height: 200,
          width: "100%",
          overflow: "hidden",
          borderRadius: spacing.medium,
          position: "relative",
        }}
      >
        <Image
          style={{
            flex: 1,
          }}
          source={{
            uri: image,
          }}
          contentFit="cover"
          contentPosition="top"
        />
        <LinearGradient
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          }}
          colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.3)"]}
        />
        <Text
          style={{
            fontSize: 24,
            position: "absolute",
            color: "#fff",
            bottom: spacing.medium,
            left: spacing.medium,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
};

export default ListItemWithImage;
