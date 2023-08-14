import { Ionicons } from "@expo/vector-icons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, spacing } from "../../theme";

const HomeHeader = (props: NativeStackHeaderProps) => {
  const { options } = props;

  const { top } = useSafeAreaInsets();

  return (
    <View
      style={{
        height: 150,
        backgroundColor: "#fff",
        paddingTop: top + spacing.small,
        paddingHorizontal: spacing.large,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          gap: spacing.small,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: spacing.small,
          }}
        >
          <Ionicons name="today-outline" size={14} color={colors.primary} />
          <Text
            style={{
              fontWeight: "400",
              fontSize: 14,
              color: colors.primary,
            }}
          >
            08 Aug, Tuesday
          </Text>
        </View>

        <Text
          style={{
            fontWeight: "bold",
            fontSize: 28,
            color: "#2E3342",
          }}
        >
          {options.title}
        </Text>
      </View>

      {/* AVATAR */}
      <Image
        source={require("../../../assets/images/profile-pictures/profile-picture.png")}
        contentFit="cover"
        style={{
          borderRadius: 30,
          width: 60,
          height: 60,
        }}
      />
    </View>
  );
};

export default HomeHeader;
