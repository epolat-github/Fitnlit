import { Entypo } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import { Pressable } from "react-native";

import DeleteAccount from "../screens/PreferencesScreens/DeleteAccount";
import HelpAndSupport from "../screens/PreferencesScreens/HelpAndSupport";
import MyAccount from "../screens/PreferencesScreens/MyAccount";
import PreferencesModal from "../screens/PreferencesScreens/PreferencesModal";
import PrivacyPolicy from "../screens/PreferencesScreens/PrivacyPolicy";
import TermsAndConditions from "../screens/PreferencesScreens/TermsAndConditions";

export type PreferencesStackParamList = {
  PreferencesModal: undefined;
  MyAccount: undefined;
  HelpAndSupport: undefined;
  TermsAndConditions: undefined;
  PrivacyPolicy: undefined;
  DeleteAccount: undefined;
};

export type PreferencesStackNavigationType<
  T extends keyof PreferencesStackParamList,
> = NativeStackNavigationProp<PreferencesStackParamList, T>;

export type PreferencesStackNavigationRouteProp<
  T extends keyof PreferencesStackParamList,
> = RouteProp<PreferencesStackParamList, T>;

const PreferencesStack =
  createNativeStackNavigator<PreferencesStackParamList>();

const PreferencesStackNavigator = () => {
  return (
    <PreferencesStack.Navigator
      initialRouteName="PreferencesModal"
      screenOptions={{
        contentStyle: {
          backgroundColor: "#fff",
        },
        headerShadowVisible: false,
        // headerShown: false,
      }}
    >
      <PreferencesStack.Screen
        name="PreferencesModal"
        component={PreferencesModal}
        options={({
          navigation,
        }: {
          navigation: PreferencesStackNavigationType<"PreferencesModal">;
        }) => ({
          presentation: "fullScreenModal",
          title: "",
          headerTransparent: true,
          headerBlurEffect: "light",
          header: undefined,
          headerRight: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <Entypo name="cross" size={24} color="black" />
            </Pressable>
          ),
        })}
      />
      <PreferencesStack.Screen
        name="MyAccount"
        component={MyAccount}
        options={{
          title: "My Account",
        }}
      />
      <PreferencesStack.Screen
        name="HelpAndSupport"
        component={HelpAndSupport}
        options={{
          title: "Help & Support",
        }}
      />
      <PreferencesStack.Screen
        name="TermsAndConditions"
        component={TermsAndConditions}
        options={{
          title: "Terms & Conditions",
        }}
      />
      <PreferencesStack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{
          title: "Privacy Policy",
        }}
      />
      <PreferencesStack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={{
          title: "Delete Account",
        }}
      />
    </PreferencesStack.Navigator>
  );
};

export default PreferencesStackNavigator;
