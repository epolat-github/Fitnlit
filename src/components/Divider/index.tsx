import { StyleSheet, View, ViewProps } from "react-native";

const Divider = (props: ViewProps) => {
  return (
    <View
      style={{
        height: StyleSheet.hairlineWidth,
        backgroundColor: "lightgray",
      }}
      {...props}
    />
  );
};

export default Divider;
