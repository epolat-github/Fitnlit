import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";

import TextInput, { TextInputRef } from "../../../components/TextInput";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useHaptics } from "../../../hooks/useHaptics";
import { AuthStackNavigationType } from "../../../navigation/AuthNavigator";
import { loginAction } from "../../../slices/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const haptics = useHaptics();
  const navigation = useNavigation<AuthStackNavigationType<"Login">>();

  const emailRef = useRef<TextInputRef>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = navigation.addListener("transitionEnd", () => {
      if (emailRef.current) {
        emailRef.current.focus();
      }
    });

    return unsubscribe;
  }, [navigation]);

  const login = async () => {
    await dispatch(
      loginAction({
        email: "email@email.com",
        password: "password",
      }),
    ).unwrap();

    haptics.runNavigateHaptic();
  };

  const navigateToRegister = () => {
    navigation.navigate("Register");
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

        <Pressable style={{ alignSelf: "flex-start" }}>
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
        <Pressable
          onPress={login}
          style={{
            backgroundColor: "#5500FF",
            height: 50,
            borderRadius: 10,
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "#fff",
            }}
          >
            Login
          </Text>
        </Pressable>

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
