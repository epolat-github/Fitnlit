/* eslint-disable @typescript-eslint/ban-types */
import {
  LinkingOptions,
  NavigationContainer,
  PathConfigMap,
} from "@react-navigation/native";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * Navigator imports
 */
import AuthNavigator from "./AuthNavigator";
import TabNavigator from "./TabNavigator";
import { useAppSelector } from "../hooks/useAppSelector";
import { selectUser } from "../slices/authSlice";
// import { BASE_WEBSITE_URL } from "../config";
// import type { IRootState } from "../reducers";
// import { Profile } from "../services/authService.types";
// import { MyTheme } from "../theme/navigationTheme";

// const linking: LinkingOptions<{}> = {
//   prefixes: [prefix, BASE_WEBSITE_URL, "actio://"],
//   config,
// };

const MainNavigationContainer = () => {
  const user = useAppSelector(selectUser);

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
      {/* CRUCIAL!!! root status bar. Overried it in the inner components, if necessary */}
      {/* <FocusAwareStatusBar style="dark" /> */}

      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default MainNavigationContainer;
