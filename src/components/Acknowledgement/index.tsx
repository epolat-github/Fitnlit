import { Pressable, Text, View, ViewStyle } from "react-native";

interface AcknowledgementType {
  containerStyle?: ViewStyle;
}

const Acknowledgement: React.FC<AcknowledgementType> = (props) => {
  const { containerStyle } = props;
  return (
    <View style={containerStyle}>
      <Text style={{}}>
        By continuing, you agree to our{" "}
        <Pressable style={{ justifyContent: "center", alignItems: "center" }}>
          <Text
            style={{
              color: "red",
              textAlign: "center",
              textAlignVertical: "center",
            }}
          >
            Terms of Service
          </Text>
        </Pressable>{" "}
        and confirm that you have read our Privacy Policy.
      </Text>
    </View>
  );
};

export default Acknowledgement;
