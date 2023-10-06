import { ImageBackground, ImageSourcePropType, Text, View } from "react-native";

import { spacing } from "../../../theme";

const WATER_USAGE = 1500;
const STEP_COUNT = 13000;
const SLEEP_HOURS = 8;

interface ItemType {
  value: number | string;
  title: string;
  image: ImageSourcePropType;
}

const Item: React.FC<ItemType> = (props) => {
  const { title, image, value } = props;

  return (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={{
        height: 120,
        flex: 0.3,
        borderRadius: spacing.medium,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          backgroundColor: "rgba(0,0,0, 0.4)",
        }}
      >
        <Text
          style={{
            color: "#fff",
          }}
        >
          {value}
        </Text>
        <Text
          style={{
            color: "#fff",
          }}
        >
          {title}
        </Text>
      </View>
    </ImageBackground>
  );
};

const GoalTrackingSection = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Item
        title="Water"
        value={`${WATER_USAGE} ml`}
        image={require("../../../../assets/images/shared/water-with-lemon.png")}
      />
      <Item
        title="Steps"
        value={STEP_COUNT}
        image={require("../../../../assets/images/shared/step-count.png")}
      />
      <Item
        title="Sleep"
        value={`${SLEEP_HOURS} hours`}
        image={require("../../../../assets/images/shared/bed.png")}
      />
    </View>
  );
};

export default GoalTrackingSection;
