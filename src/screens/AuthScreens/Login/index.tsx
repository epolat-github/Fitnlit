import { Button, Text, View } from "react-native";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { loginAction } from "../../../slices/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();

  const login = async () => {
    await dispatch(
      loginAction({
        email: "email@email.com",
        password: "password",
      }),
    ).unwrap();
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Login</Text>
      <Button title="Login" onPress={login} />
    </View>
  );
};

export default Login;
