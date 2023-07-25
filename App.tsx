import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";

import MainNavigationContainer from "./src/navigation";
import { store } from "./src/utils/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    PlayfairDisplayMedium: require("./assets/fonts/PlayfairDisplay-Medium.ttf"),
    PlayfairDisplaySemiBold: require("./assets/fonts/PlayfairDisplay-SemiBold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      // TODO find better way
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 300);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ReduxProvider store={store}>
          <MainNavigationContainer />
        </ReduxProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
