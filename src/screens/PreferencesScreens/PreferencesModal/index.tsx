import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import Divider from "../../../components/Divider";
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
          <Image
            source={require("../../../../assets/images/profile-pictures/profile-picture.png")}
            contentFit="cover"
            style={{
              borderRadius: 60,
              width: 120,
              height: 120,
            }}
          />
          <Text style={{ fontSize: 24 }}>John Doe</Text>
        </View>

        {/* list */}
        <View style={{ gap: spacing.medium }}>
          {/* My Account */}
          <MenuItem
            title="My Account"
            subtitle="Update your personal information"
            onPress={() => alert("My Account")}
            icon={<Ionicons name="person-outline" size={24} color="black" />}
          />

          <Divider />

          {/* Help & Support */}
          <MenuItem
            title="Help and Support"
            subtitle="Contact us to get help"
            onPress={() => alert("Help and Support")}
            icon={
              <Ionicons name="help-circle-outline" size={24} color="black" />
            }
          />

          <Divider />

          {/* Terms & Conditions */}
          <MenuItem
            title="Terms and Conditions"
            subtitle="Look into our terms and conditions"
            onPress={() => alert("Terms & Conditions")}
            icon={<Ionicons name="document-outline" size={24} color="black" />}
          />

          <Divider />

          {/* Privacy Policy */}
          <MenuItem
            title="Privacy Policy"
            subtitle="Look into our privacy policy"
            onPress={() => alert("Privacy Policy")}
            icon={
              <Ionicons name="document-text-outline" size={24} color="black" />
            }
          />

          <Divider />

          {/* Delete Account */}
          <MenuItem
            title="Delete Account"
            subtitle="Delete your data and records"
            onPress={() => alert("Delete account")}
            icon={<Ionicons name="trash-outline" size={24} color="black" />}
          />

          <Divider />

          {/* Sign Out */}
          <MenuItem
            title="Log out"
            subtitle="Log out from the application"
            onPress={() => alert("Sign out")}
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
