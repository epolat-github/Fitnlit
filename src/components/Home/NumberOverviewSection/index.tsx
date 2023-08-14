import { StyleSheet, Text, View, ViewStyle } from "react-native";

import { colors, spacing } from "../../../theme";

const DATA = [
  {
    number: 13,
    text: "days of workout",
  },
  {
    number: 38,
    text: "hrs spent on training",
  },
  {
    number: 16,
    text: "goals achieved until now",
  },
];

interface NumberOverviewSectionType {
  containerStyle?: ViewStyle;
}

const NumberOverviewSection: React.FC<NumberOverviewSectionType> = (props) => {
  const { containerStyle } = props;

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: spacing.large,
        },
        containerStyle,
      ]}
    >
      {DATA.map((data, index) => (
        <View
          key={`item-${index}`}
          style={{
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            height: "100%",
          }}
        >
          <View
            style={{
              alignItems: "center",
              flex: 1,
              justifyContent: "flex-start",
              height: "100%",
              gap: spacing.tiny,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: colors.primary,
                fontSize: 22,
              }}
            >
              {data.number}
            </Text>
            <Text
              style={{
                color: "#8E8797",
                fontWeight: "400",
                width: "90%",
                textAlign: "center",
                height: 40,
                textAlignVertical: "center",
              }}
            >
              {data.text}
            </Text>
          </View>

          {index !== DATA.length - 1 && (
            <View
              style={{
                marginHorizontal: spacing.tiny,
                backgroundColor: "#8E8797",
                height: 35,
                width: StyleSheet.hairlineWidth,
                opacity: 0.5,
              }}
            />
          )}
        </View>
      ))}
    </View>
  );
};

export default NumberOverviewSection;
