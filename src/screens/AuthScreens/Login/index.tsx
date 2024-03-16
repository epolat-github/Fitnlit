import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import base64 from "react-native-base64";

import Button from "../../../components/Button";
import TextInput, { TextInputRef } from "../../../components/TextInput";
import { useSnackbarContext } from "../../../context/SnackbarContext";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useHaptics } from "../../../hooks/useHaptics";
import { AuthStackNavigationType } from "../../../navigation/AuthNavigator";
import { loginAction } from "../../../slices/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const haptics = useHaptics();
  const navigation = useNavigation<AuthStackNavigationType<"Login">>();
  const { showSnackbar } = useSnackbarContext();

  const emailRef = useRef<TextInputRef>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("transitionEnd", () => {
      if (emailRef.current) {
        emailRef.current.focus();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const login = async () => {
    if (email === "") {
      showSnackbar("Please enter your email first.", {
        variant: "error",
      });
      return;
    }

    if (password === "") {
      showSnackbar("Please enter your password first.", {
        variant: "error",
      });
      return;
    }

    setIsLoading(true);
    await dispatch(
      loginAction({
        userNameOrEmail: email,
        password: base64.encode(password),
        rememberMe: true,
      }),
    ).unwrap();

    haptics.runNavigateHaptic();

    setIsLoading(false);
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
          gap: 20,
        }}
      >
        <TextInput
          ref={emailRef}
          onChangeText={setEmail}
          value={email}
          placeholder="Enter email address"
          autoComplete="email"
          keyboardType="email-address"
          maxLength={50}
        />

        <TextInput
          onChangeText={setPassword}
          value={password}
          placeholder="Enter password"
          autoComplete="password"
          secureTextEntry
          maxLength={50}
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
        <Button text="Login" onPress={login} isLoading={isLoading} />

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
