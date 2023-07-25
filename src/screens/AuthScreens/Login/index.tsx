import { useNavigation } from "@react-navigation/native";
import { Button, Text, View } from "react-native";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useHaptics } from "../../../hooks/useHaptics";
import { AuthStackNavigationType } from "../../../navigation/AuthNavigator";
import { loginAction } from "../../../slices/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();
  const haptics = useHaptics();
  const navigation = useNavigation<AuthStackNavigationType<"Login">>();

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
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login</Text>
      <Button title="Login" onPress={login} />
      <Button title="Register" onPress={navigateToRegister} />
    </View>
  );
};

export default Login;
