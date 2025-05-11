import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import React from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

import Avatar from "../../../components/Avatar";
import Divider from "../../../components/Divider";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { PreferencesStackNavigationType } from "../../../navigation/PreferencesStackNavigator";
import { logoutAction } from "../../../slices/authSlice";
import { spacing } from "../../../theme";

interface MenuItemType {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => unknown;
}

const MenuItem: React.FC<MenuItemType> = (props) => {
  const { icon, onPress, subtitle, title } = props;

  return (
    <Pressable
      onPress={onPress}
      style={{
        flexDirection: "row",
        paddingHorizontal: spacing.large,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: spacing.large,
          alignItems: "center",
        }}
      >
        {/* <Ionicons name="person-outline" size={24} color="black" /> */}
        {icon}
        <View style={{ gap: spacing.tiny }}>
          <Text>{title}</Text>
          <Text style={{ color: "gray" }}>{subtitle}</Text>
        </View>
      </View>

      <FontAwesome5 name="chevron-right" size={16} color="black" />
    </Pressable>
  );
};

const PreferencesModal = () => {
  const dispatch = useAppDispatch();

  const navigation =
    useNavigation<PreferencesStackNavigationType<"PreferencesModal">>();

  const logoutHandler = () => {
    Alert.alert("Log out", "You will log out from the Fit&Lit", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Log out",
        style: "destructive",
        onPress: () => dispatch(logoutAction({})),
      },
    ]);
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View
        style={{
          gap: spacing.huge,
        }}
      >
        <View
          style={{
            alignItems: "center",
            gap: spacing.medium,
          }}
        >
          {/* <Image
            source={require("../../../../assets/images/profile-pictures/profile-picture.png")}
            contentFit="cover"
            style={{
              borderRadius: 60,
              width: 120,
              height: 120,
            }}
          /> */}
          <Avatar size="large" />
          <Text style={{ fontSize: 24 }}>John Doe</Text>
        </View>

        {/* list */}
        <View style={{ gap: spacing.medium }}>
          {/* My Account */}
          <MenuItem
            title="My Account"
            subtitle="Update your personal information"
            onPress={() => navigation.navigate("MyAccount")}
            icon={<Ionicons name="person-outline" size={24} color="black" />}
          />

          <Divider />

          {/* Help & Support */}
          <MenuItem
            title="Help and Support"
            subtitle="Contact us to get help"
            onPress={() => navigation.navigate("HelpAndSupport")}
            icon={
              <Ionicons name="help-circle-outline" size={24} color="black" />
            }
          />

          <Divider />

          {/* Terms & Conditions */}
          <MenuItem
            title="Terms and Conditions"
            subtitle="Look into our terms and conditions"
            onPress={() => navigation.navigate("TermsAndConditions")}
            icon={<Ionicons name="document-outline" size={24} color="black" />}
          />

          <Divider />

          {/* Privacy Policy */}
          <MenuItem
            title="Privacy Policy"
            subtitle="Look into our privacy policy"
            onPress={() => navigation.navigate("PrivacyPolicy")}
            icon={
              <Ionicons name="document-text-outline" size={24} color="black" />
            }
          />

          <Divider />

          {/* Delete Account */}
          <MenuItem
            title="Delete Account"
            subtitle="Delete your data and records"
            onPress={() => navigation.navigate("DeleteAccount")}
            icon={<Ionicons name="trash-outline" size={24} color="black" />}
          />

          <Divider />

          {/* Sign Out */}
          <MenuItem
            title="Log out"
            subtitle="Log out from the application"
            onPress={logoutHandler}
            icon={<Ionicons name="log-out-outline" size={24} color="black" />}
          />

          <Divider />
        </View>

        <View>
          <Text style={{ color: "gray", textAlign: "center" }}>
            FitnLit v1.0.0
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default PreferencesModal;
