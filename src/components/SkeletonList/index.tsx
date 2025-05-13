import { ScrollView, StyleProp, ViewStyle } from "react-native";

import { spacing } from "../../theme";
import SkeletonLoader from "../SkeletonLoader";

interface SkeletonListProps {
  style?: ViewStyle;
  count: number;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const SkeletonList: React.FC<SkeletonListProps> = ({
  style,
  count,
  contentContainerStyle,
}) => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={[
        {
          gap: spacing.large,
          paddingHorizontal: spacing.medium,
        },
        contentContainerStyle,
      ]}
    >
      {new Array(count).fill(0).map((_, index) => (
        <SkeletonLoader
          key={`skeleton-${index}`}
          style={{
            width: "100%",
            height: 200,
            borderRadius: spacing.medium,
            ...style,
          }}
        />
      ))}
    </ScrollView>
  );
};

export default SkeletonList;
