import { Text, View } from "react-native";

import { spacing } from "../../../theme";

const ValuesSection = () => {
  return (
    <View
      style={{
        gap: spacing.medium,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", color: "#61AAB5" }}>CHEST</Text>
          <Text style={{ textAlign: "center" }}>0 cm</Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", color: "#691783" }}>WAIST</Text>
          <Text style={{ textAlign: "center" }}>0 cm</Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", color: "#066DA6" }}>HIP</Text>
          <Text style={{ textAlign: "center" }}>0 cm</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", color: "#BA6E83" }}>ARM</Text>
          <Text style={{ textAlign: "center" }}>0 cm</Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", color: "#C98B5D" }}>THIGH</Text>
          <Text style={{ textAlign: "center" }}>0 cm</Text>
        </View>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text style={{ textAlign: "center", color: "#83A26B" }}>WEIGHT</Text>
          <Text style={{ textAlign: "center" }}>90 kg</Text>
        </View>
      </View>
    </View>
  );
};

export default ValuesSection;
