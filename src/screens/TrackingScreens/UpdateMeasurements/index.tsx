import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import { spacing } from "../../../theme";
import { toFirstLetterCapital } from "../../../utils/text";

const VALUE_LIST: MeasurementType[] = [
  "weight",
  "chest",
  "waist",
  "hips",
  "arm",
  "thigh",
];

type MeasurementType = "weight" | "chest" | "waist" | "hips" | "arm" | "thigh";

const UpdateMeasurements = () => {
  const { showSnackbar } = useSnackbarContext();
  const navigation = useNavigation();

  const [updateMeasurementData, setUpdateMeasurementData] = useState<{
    weight?: string;
    chest?: string;
    waist?: string;
    hips?: string;
    arm?: string;
    thigh?: string;
  }>({});

  const [images, setImages] = useState<
    Record<"front" | "side" | "back", ImagePicker.ImagePickerAsset | undefined>
  >({ front: undefined, side: undefined, back: undefined });

  const [isLoading, setIsLoading] = useState(false);

  const changeValues = (value: string, target: MeasurementType) => {
    setUpdateMeasurementData((prev) => {
      const newPrev = { ...prev };
      newPrev[target] = value;
      return newPrev;
    });
  };

  const pickPhoto = async (type: "front" | "side" | "back") => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      allowsMultipleSelection: false,
      base64: true,
    });

    if (!result.canceled) {
      setImages((prev) => {
        const newPrev = { ...prev };
        newPrev[type] = result.assets[0];
        return newPrev;
      });
    }
  };

  const updateProgressHandler = async () => {
    setIsLoading(true);

    setTimeout(() => {
      showSnackbar("Progress is updated", {
        variant: "success",
      });

      navigation.goBack();

      setIsLoading(false);
    }, 1000);
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="always">
      <View
        style={{
          paddingVertical: spacing.medium,
          paddingHorizontal: spacing.small,
          gap: spacing.large,
        }}
      >
        <View
          style={{
            gap: spacing.medium,
          }}
        >
          {VALUE_LIST.map((value) => (
            <TextInput
              key={value}
              placeholder={toFirstLetterCapital(value)}
              onChangeText={(text) => changeValues(text, value)}
              value={updateMeasurementData?.[value]}
              keyboardType="number-pad"
            />
          ))}
        </View>

        <View style={{ gap: spacing.medium }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
            }}
          >
            Progress Pictures
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            {(["front", "side", "back"] as const).map((type) => (
              <View
                key={type}
                style={{
                  flex: 0.3,
                  gap: spacing.small,
                }}
              >
                <Pressable
                  onPress={() => pickPhoto(type)}
                  style={{
                    height: 150,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#E5E4E2",
                      flex: 1,
                      borderRadius: spacing.medium,
                      overflow: "hidden",
                    }}
                  >
                    {images[type] && (
                      <Image
                        source={{ uri: images[type]?.uri }}
                        style={{
                          flex: 1,
                        }}
                      />
                    )}
                  </View>
                </Pressable>
                <Text style={{ textAlign: "center" }}>
                  {toFirstLetterCapital(type)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Button
          text="Update Progress"
          isLoading={isLoading}
          onPress={updateProgressHandler}
        />
      </View>
    </ScrollView>
  );
};

export default UpdateMeasurements;
