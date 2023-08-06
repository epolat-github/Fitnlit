import { Text, View, ViewStyle } from "react-native";

import { colors } from "../../theme";

interface AcknowledgementType {
  containerStyle?: ViewStyle;
}

const Acknowledgement: React.FC<AcknowledgementType> = (props) => {
  const { containerStyle } = props;
  return (
    <View style={containerStyle}>
      <Text
        style={{
          lineHeight: 20,
          textAlign: "center",
        }}
      >
        By continuing, you agree our{" "}
        <Text
          onPress={() => console.log("pressed")}
          style={{
            color: colors.primary,
            textDecorationLine: "underline",
          }}
          suppressHighlighting
        >
          Terms of Service
        </Text>{" "}
        and confirm that you have read our{" "}
        <Text
          onPress={() => console.log("pressed")}
          style={{
            color: colors.primary,
            textDecorationLine: "underline",
          }}
          suppressHighlighting
        >
          Privacy Policy
        </Text>
        .
      </Text>
    </View>
  );
};

export default Acknowledgement;
