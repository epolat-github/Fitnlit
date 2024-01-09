import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { PortalProvider } from "@gorhom/portal";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";

import { SnackbarContextProvider } from "./src/context/SnackbarContext";
import MainNavigationContainer from "./src/navigation";
import { store } from "./src/utils/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <BottomSheetModalProvider>
          <SnackbarContextProvider>
            <SafeAreaProvider>
              <ReduxProvider store={store}>
                <MainNavigationContainer />
              </ReduxProvider>
            </SafeAreaProvider>
          </SnackbarContextProvider>
        </BottomSheetModalProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  );
}
