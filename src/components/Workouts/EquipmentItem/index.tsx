import { Text, View } from "react-native";

import { spacing } from "../../../theme";

interface EquipmentItemType {
  text: string;
  icon: JSX.Element;
}

const EquipmentItem: React.FC<EquipmentItemType> = ({ text, icon }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.small,
        flexBasis: "50%",
        flex: 0.5,
      }}
    >
      {icon}
      <Text>{text}</Text>
    </View>
  );
};

export default EquipmentItem;
