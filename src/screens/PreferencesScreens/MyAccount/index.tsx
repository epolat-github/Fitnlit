import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import { HomeStackNavigationType } from "../../../navigation/HomeStackNavigator";
import { spacing } from "../../../theme";

const ORIGINAL_NAME = "John Doe";

const MyAccount = () => {
  const navigation =
    useNavigation<HomeStackNavigationType<"PreferencesStack">>();
  const { showSnackbar } = useSnackbarContext();

  const [profile, setProfile] = useState({
    name: "John Doe",
    birthDate: "1998-01-04",
    height: "178",
    email: "test@fitnlit.com",
  });

  const [newProfilePicture, setNewProfilePicture] =
    useState<ImagePicker.ImagePickerAsset>();

  const [isLoading, setIsLoading] = useState(false);

  const changeProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      allowsMultipleSelection: false,
      base64: true,
    });

    if (!result.canceled) {
      setNewProfilePicture(result.assets[0]);
    }
  };

  const changeProfileData = (
    value: string,
    type: "name" | "birthDate" | "height" | "email",
  ) => {
    setProfile((prev) => {
      const newPrev = { ...prev };

      newPrev[type] = value;

      return newPrev;
    });
  };

  const updateAccountHandler = () => {
    setIsLoading(true);

    setTimeout(() => {
      showSnackbar("Account updated.", {
        variant: "success",
        duration: 5000,
      });

      navigation.navigate("Home");

      setIsLoading(false);
    }, 1000);
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View
        style={{
          paddingTop: spacing.large,
          paddingBottom: spacing.huge * 5,
        }}
      >
        {/* PROFILE PICTURE */}
        <View
          style={{
            alignItems: "center",
            gap: spacing.medium,
          }}
        >
          <Pressable
            onPress={changeProfilePicture}
            style={{
              borderRadius: 50,
              width: 100,
              height: 100,
              overflow: "hidden",
              position: "relative",
            }}
          >
            <Image
              source={
                newProfilePicture
                  ? { uri: newProfilePicture.uri }
                  : require("../../../../assets/images/profile-pictures/profile-picture.png")
              }
              contentFit="cover"
              style={{
                flex: 1,
              }}
            />

            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                backgroundColor: "rgba(0,0,0,0.5)",
                height: "25%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ textAlign: "center", color: "#fff" }}>Change</Text>
            </View>
          </Pressable>

          <Text style={{ fontSize: 24 }}>{ORIGINAL_NAME}</Text>
        </View>

        {/* PROFILE EDIT FORM */}
        <View
          style={{
            paddingHorizontal: spacing.medium,
            gap: spacing.medium,
          }}
        >
          {/* NAME */}
          <View style={{ gap: spacing.small }}>
            <Text style={{ color: "gray" }}>Full name</Text>
            <TextInput
              value={profile.name}
              onChangeText={(text) => changeProfileData(text, "name")}
            />
          </View>

          {/* Birth Date */}
          <View style={{ gap: spacing.small }}>
            <Text style={{ color: "gray" }}>Birth Date</Text>
            <TextInput
              value={profile.birthDate}
              onChangeText={(text) => changeProfileData(text, "birthDate")}
            />
          </View>

          {/* Height */}
          <View style={{ gap: spacing.small }}>
            <Text style={{ color: "gray" }}>Height (cm)</Text>
            <TextInput
              value={profile.height}
              onChangeText={(text) => changeProfileData(text, "height")}
              keyboardType="number-pad"
            />
          </View>

          {/* Height */}
          <View style={{ gap: spacing.small }}>
            <Text style={{ color: "gray" }}>Email</Text>
            <TextInput
              value={profile.email}
              onChangeText={(text) => changeProfileData(text, "email")}
              keyboardType="email-address"
            />
          </View>

          <Button
            text="Update Account"
            onPress={updateAccountHandler}
            isLoading={isLoading}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default MyAccount;
