import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image } from "expo-image";
import { useCallback, useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "../../../components/Button";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import useToken from "../../../hooks/useToken";
import {
  ProgramsStackNavigationRouteProp,
  ProgramsStackNavigationType,
} from "../../../navigation/ProgramsStackNavigator";
import { getProgramDetails } from "../../../services/programs.service";
import { spacing } from "../../../theme";
import { type ProgramDetails as ProgramDetailsType } from "../../../types/programs.type";

const IMAGE_HEIGHT = 300;

const ProgramDetails = () => {
  const token = useToken();
  const navigation =
    useNavigation<ProgramsStackNavigationType<"ProgramDetails">>();
  const route = useRoute<ProgramsStackNavigationRouteProp<"ProgramDetails">>();

  const { programId } = route.params;

  const { showSnackbar } = useSnackbarContext();
  const { bottom } = useSafeAreaInsets();

  const [programDetails, setProgramDetails] = useState<ProgramDetailsType>();

  const getProgramListHandler = useCallback(async () => {
    try {
      if (!token) return;

      const result = await getProgramDetails(token, programId);

      setProgramDetails(result);
    } catch (err: any) {
      showSnackbar(err?.message, {
        variant: "error",
      });
    }
  }, [programId, showSnackbar, token]);

  useEffect(() => {
    getProgramListHandler();
  }, [getProgramListHandler]);

  if (!programDetails) return null;

  return (
    <View>
      <Pressable
        onPress={navigation.goBack}
        style={[
          {
            position: "absolute",
            top: 10,
            left: 10,
            zIndex: 9,
            backgroundColor: "#fff",
            borderRadius: 18,
            width: 36,
            height: 36,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <AntDesign name="left" size={22} color="#000" />
      </Pressable>
      <Image
        source={{
          uri: programDetails.image,
        }}
        style={[
          {
            position: "absolute",
            height: IMAGE_HEIGHT,
            width: "100%",
          },
        ]}
        contentFit="cover"
      />

      <ScrollView
        contentContainerStyle={{
          paddingTop: IMAGE_HEIGHT - 30,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View
          style={{
            backgroundColor: "#fff",
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: spacing.medium,
            paddingTop: spacing.large,
            gap: spacing.large,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 11,
            },
            shadowOpacity: 0.57,
            shadowRadius: 15.19,

            elevation: 23,

            paddingBottom: bottom || 20,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
            }}
          >
            {programDetails.name}
          </Text>

          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
            }}
          >
            {programDetails.description}
          </Text>

          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              fontWeight: "bold",
            }}
          >
            {programDetails.week} haftalık bir program
          </Text>

          <Text
            style={{
              fontSize: 16,
              lineHeight: 24,
              fontWeight: "bold",
            }}
          >
            {programDetails.price}₺ karşılığında hemen yazılın!
          </Text>

          <Button
            text="Aramıza Hemen Katıl!"
            textStyle={{
              fontSize: 18,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProgramDetails;
