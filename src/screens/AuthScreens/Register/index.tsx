import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";

import { useHaptics } from "../../../hooks/useHaptics";
import {
  AuthStackNavigationType,
  AuthStackParamList,
} from "../../../navigation/AuthNavigator";

const Register = () => {
  const navigation = useNavigation<AuthStackNavigationType<"Register">>();
  const haptics = useHaptics();

  const register = async () => {
    haptics.runNavigateHaptic();
    navigation.navigate("Login");
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Register</Text>
      <Button title="Register" onPress={register} />
    </View>
  );
};

export default Register;
