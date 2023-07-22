import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";
import { StackActions, useNavigation } from "@react-navigation/core";
import { useRootNavigationState, useRouter, useSegments } from "expo-router";
import React, { ReactNode } from "react";

import { User } from "@/src/types/user";

type AuthContextType = {
  user?: User;
  signIn: (user: User) => unknown;
  signOut: () => unknown;
};

const AuthContext = React.createContext<AuthContextType>({
  user: undefined,
  signIn: (user: User) => {},
  signOut: () => {},
});

export function useAuth() {
  return React.useContext(AuthContext);
}

function useProtectedRoute(user?: User) {
  const rootSegment = useSegments()[0];
  const router = useRouter();
  const nav = useNavigation();
  const navigationState = useRootNavigationState();

  React.useEffect(() => {
    console.log("test");
    console.log(rootSegment);
    console.log("user: ", user);

    if (!navigationState?.key) return;

    // if (user === undefined) {
    //   return;
    // }

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !user &&
      rootSegment !== "(auth)"
    ) {
      // nav.dispatch(
      //   StackActions.replace("(auth)/sign-in", {
      //     // user: 'jane',
      //   })
      // );
      // Redirect to the sign-in page.
      // router.replace("/(auth)/login");
    } else if (user && rootSegment !== "(app)") {
      // Redirect away from the sign-in page.
      // router.replace("/(tabs)/one");
      // router.replace("/compose");
      // nav.dispatch(
      //   StackActions.replace("(app)", {
      //     // user: 'jane',
      //   })
      // );
    }
  }, [user, rootSegment, navigationState?.key]);
}

interface ProviderType {
  children: ReactNode;
}

export const AuthProvider: React.FunctionComponent<ProviderType> = (props) => {
  const { getItem, setItem, removeItem } = useAsyncStorage("USER");
  const [user, setAuth] = React.useState<User>();

  React.useEffect(() => {
    console.log("test 2");

    (async () => {
      const userJson = await AsyncStorage.getItem("USER");
      if (userJson) setAuth(JSON.parse(userJson));
    })();
  }, []);

  useProtectedRoute(user);

  return (
    <AuthContext.Provider
      value={{
        signIn: async (user: User) => {
          setAuth(user);
          await AsyncStorage.setItem("USER", JSON.stringify(user));
        },
        signOut: async () => {
          setAuth(undefined);
          await AsyncStorage.removeItem("USER");
        },
        user,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
