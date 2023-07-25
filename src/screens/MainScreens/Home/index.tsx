import { Button, View } from "react-native";

import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { logoutAction } from "../../../slices/authSlice";

const Home = () => {
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default Home;
