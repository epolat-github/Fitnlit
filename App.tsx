import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import * as SplashScreen from "expo-splash-screen";
import moment from "moment";
import "moment/locale/tr";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReduxProvider } from "react-redux";

import { SnackbarContextProvider } from "./src/context/SnackbarContext";
import MainNavigationContainer from "./src/navigation";
import { store } from "./src/utils/store";

moment.locale("tr");

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <SnackbarContextProvider>
          <SafeAreaProvider>
            <ReduxProvider store={store}>
              <MainNavigationContainer />
            </ReduxProvider>
          </SafeAreaProvider>
        </SnackbarContextProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
