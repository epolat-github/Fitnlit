import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import moment from "moment";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { HomeStackNavigationType } from "../../navigation/HomeStackNavigator";
import { colors, spacing } from "../../theme";
import Avatar from "../Avatar";

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
            {moment().format("DD MMMM, dddd")}
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
      <Avatar onPress={navigateToPreferences} />
    </View>
  );
};

export default HomeHeader;
