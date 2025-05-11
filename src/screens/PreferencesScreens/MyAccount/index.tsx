import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as yup from "yup";

import Avatar from "../../../components/Avatar";
import Button from "../../../components/Button";
import TextInput from "../../../components/TextInput";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import useProfile from "../../../hooks/useProfile";
import useToken from "../../../hooks/useToken";
import { spacing } from "../../../theme";
import { decodeAccessToken } from "../../../utils/auth";

const schema = yup
  .object({
    userId: yup.string().required(),
    firstName: yup.string().max(50).required("İsim zorunlu bir alandır"),
    lastName: yup.string().max(30).required("Soyisim zorunlu bir alandır"),
    birthDate: yup.string().required().nullable(),
  })
  .required();

type Schema = yup.InferType<typeof schema>;

const MyAccount = () => {
  const { showSnackbar } = useSnackbarContext();

  const profile = useProfile();
  const token = useToken();

  const fullName = [profile.firstName, profile.lastName].join(" ");

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Schema>({
    resolver: yupResolver(schema),
    defaultValues: {
      firstName: profile.firstName,
      lastName: profile.lastName,
      birthDate: null,
      userId: decodeAccessToken(token || "").id,
    },
  });

  const [newProfilePicture, setNewProfilePicture] =
    useState<ImagePicker.ImagePickerAsset>();

  const [isLoading, setIsLoading] = useState(false);

  const changeProfilePicture = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
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

  const updateProfileHandler = (data: Schema) => {
    setIsLoading(true);

    setTimeout(() => {
      showSnackbar("Profile updated.", {
        variant: "success",
        duration: 5000,
      });

      setIsLoading(false);
    }, 1000);
  };

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        flex: 1,
      }}
      contentInsetAdjustmentBehavior="automatic"
    >
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
          <Avatar
            mode="picker"
            onPress={changeProfilePicture}
            size="medium"
            imageBase64={
              newProfilePicture
                ? `data:image/jpeg;base64,${newProfilePicture.base64}`
                : undefined
            }
          />

          <Text style={{ fontSize: 24 }}>{fullName}</Text>
        </View>

        {/* PROFILE EDIT FORM */}
        <View
          style={{
            paddingHorizontal: spacing.medium,
            gap: spacing.medium,
          }}
        >
          {/* first name */}
          <View style={{ gap: spacing.small }}>
            <Text style={{ color: "gray" }}>First Name</Text>
            <Controller
              name="firstName"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="First name is required"
                  autoComplete="given-name"
                  maxLength={50}
                  error={errors.firstName?.message}
                />
              )}
            />
          </View>

          {/* last name */}
          <View style={{ gap: spacing.small }}>
            <Text style={{ color: "gray" }}>Last name</Text>
            <Controller
              name="lastName"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Last name is required"
                  autoComplete="family-name"
                  maxLength={50}
                  error={errors.lastName?.message}
                />
              )}
            />
          </View>

          {/* Birth Date */}
          <View style={{ gap: spacing.small }}>
            <Text style={{ color: "gray" }}>Birth Date</Text>
            <Controller
              name="birthDate"
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value || ""}
                  // placeholder="Last name is required"
                  maxLength={50}
                  error={errors.birthDate?.message}
                />
              )}
            />
          </View>

          {/* Email */}
          <View style={{ gap: spacing.small }}>
            <Text style={{ color: "gray" }}>Email</Text>
            <TextInput value={profile.email} editable={false} />
          </View>

          <Button
            text="Update Account"
            onPress={handleSubmit(updateProfileHandler)}
            isLoading={isLoading}
            disabled={!isValid}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default MyAccount;
