import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { Image } from "expo-image";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HomeStackNavigationType } from "../../navigation/HomeStackNavigator";
import { colors, spacing } from "../../theme";

const HomeHeader = (props: NativeStackHeaderProps) => {
  const { options } = props;

  const navigation = useNavigation<HomeStackNavigationType<"Home">>();

  const { top } = useSafeAreaInsets();

  const navigateToPreferences = () => {
    navigation.navigate("PreferencesStack");
  };

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
      <Pressable onPress={navigateToPreferences}>
        <Image
          source={require("../../../assets/images/profile-pictures/profile-picture.png")}
          contentFit="cover"
          style={{
            borderRadius: 30,
            width: 60,
            height: 60,
          }}
        />
      </Pressable>
    </View>
  );
};

export default HomeHeader;
