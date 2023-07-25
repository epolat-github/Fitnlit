import * as Haptics from "expo-haptics";
import { useCallback } from "react";

export const useHaptics = () => {
  const runNavigateHaptic = useCallback(() => Haptics.selectionAsync(), []);
  const runSuccessHaptic = useCallback(
    () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
    [],
  );

  return {
    runNavigateHaptic,
    runSuccessHaptic,
  };
};
