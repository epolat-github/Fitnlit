/* eslint-disable @typescript-eslint/ban-types */
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useEffect } from "react";

/**
 * Navigator imports
 */
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { selectIsLoading } from "../slices/appStateSlice";
import { restoreUserAction, selectUser } from "../slices/authSlice";
// import { BASE_WEBSITE_URL } from "../config";
// import type { IRootState } from "../reducers";
// import { Profile } from "../services/authService.types";
// import { MyTheme } from "../theme/navigationTheme";

// const linking: LinkingOptions<{}> = {
//   prefixes: [prefix, BASE_WEBSITE_URL, "actio://"],
//   config,
// };

const MainNavigationContainer = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectIsLoading);

  const [fontsLoaded, error] = useFonts({
    PlayfairDisplayMedium: require("../../assets/fonts/PlayfairDisplay-Medium.ttf"),
    PlayfairDisplaySemiBold: require("../../assets/fonts/PlayfairDisplay-SemiBold.ttf"),
  });

  const initApp = useCallback(async () => {
    // first, wait for the fonts to be loaded
    if (fontsLoaded) {
      await dispatch(restoreUserAction()).unwrap();

      // TODO find better way
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 0);
    }
  }, [dispatch, fontsLoaded]);

  useEffect(() => {
    initApp();
  }, [fontsLoaded, initApp]);

  if (!fontsLoaded && isLoading) {
    return null;
  }

  /**
   * Set user for Sentry
   */
  //   useEffect(() => {
  //     if (loggedIn) {
  //       const { EMail } = user as Profile;
  //       Sentry.Native.setUser({
  //         email: EMail,
  //         username: EMail,
  //       });
  //     } else {
  //       Sentry.Native.setUser(null);
  //     }

  //     return () => Sentry.Native.setUser(null);
  //   }, [loggedIn, user]);

  return (
    <NavigationContainer
    //   theme={MyTheme}
    //   linking={linking}
    // fallback={<Text>Loading...</Text>}
    >
      {!user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigationContainer;
