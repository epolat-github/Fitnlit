import Entypo from "@expo/vector-icons/Entypo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import * as yup from "yup";

import Button from "../../../components/Button";
import TextInput, { TextInputRef } from "../../../components/TextInput";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useHaptics } from "../../../hooks/useHaptics";
import { AuthStackNavigationType } from "../../../navigation/AuthNavigator";
import { loginAction } from "../../../slices/authSlice";
import { spacing } from "../../../theme";

const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email first"),
    password: yup.string().required("Please enter your password first"),
  })
  .required();

type Schema = yup.InferType<typeof schema>;

const Login = () => {
  const dispatch = useAppDispatch();
  const haptics = useHaptics();
  const navigation = useNavigation<AuthStackNavigationType<"Login">>();
  const { showSnackbar } = useSnackbarContext();

  const emailRef = useRef<TextInputRef>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Schema>({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("transitionEnd", () => {
      if (emailRef.current) {
        emailRef.current.focus();
      }
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setTimeout(() => {
        reset();
      }, 1000);
    });

    return unsubscribe;
  }, [navigation, reset]);

  const login = async (data: Schema) => {
    const { email, password } = data;

    setIsLoading(true);

    try {
      await dispatch(
        loginAction({
          userNameOrEmail: email,
          password,
          rememberMe: true,
        }),
      ).unwrap();

      haptics.runNavigateHaptic();

      setIsLoading(false);
    } catch (err: any) {
      showSnackbar(err?.message, {
        variant: "error",
      });
      setIsLoading(false);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  const navigateToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
      }}
    >
      <StatusBar style="dark" />

      {/* HEADER */}
      <View style={{ flex: 0.2, gap: 15 }}>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: "#1E232C",
            textAlign: "center",
          }}
        >
          Login
        </Text>
        <Text
          style={{
            textAlign: "center",
            color: "#1E232C",
          }}
        >
          Login to your account to get Fit&Lit!
        </Text>
      </View>

      {/* LOGIN FORM */}
      <View
        style={{
          flex: 0.3,
          paddingHorizontal: 20,
          paddingVertical: 20,
          gap: spacing.medium,
        }}
      >
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              ref={emailRef}
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              placeholder="Enter email address"
              autoComplete="email"
              keyboardType="email-address"
              maxLength={320}
              error={errors.email?.message}
              autoCapitalize="none"
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onChangeText={onChange}
              value={value}
              onBlur={onBlur}
              placeholder="Enter password"
              autoComplete="password"
              maxLength={50}
              error={errors.password?.message}
              secureTextEntry={!isPasswordVisible}
              rightIcon={() => (
                <TouchableOpacity
                  onPress={() => setIsPasswordVisible((prev) => !prev)}
                >
                  <Entypo
                    name={isPasswordVisible ? "eye" : "eye-with-line"}
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              )}
            />
          )}
        />

        <Pressable
          style={{ alignSelf: "flex-start" }}
          onPress={navigateToForgotPassword}
        >
          <Text style={{ color: "blue" }}>Forgot password?</Text>
        </Pressable>
      </View>

      {/* BUTTONS */}
      <View
        style={{
          flex: 0.5,
          padding: 20,
          gap: 10,
          alignItems: "center",
        }}
      >
        <Button
          text="Login"
          onPress={handleSubmit(login)}
          isLoading={isLoading}
        />

        <View style={{ flexDirection: "row", gap: 4 }}>
          <Text>No account?</Text>
          <Pressable onPress={navigateToRegister}>
            <Text style={{ color: "blue" }}>Join us!</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;
