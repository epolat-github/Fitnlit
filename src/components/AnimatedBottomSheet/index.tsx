import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useEffect, useCallback, useRef } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface AnimatedBottomSheetType {
  closeModal: () => void;
  open: boolean;
  children: React.ReactNode;
}

const AnimatedBottomSheet: React.FC<AnimatedBottomSheetType> = ({
  closeModal,
  children,
  open,
}) => {
  // ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    if (!bottomSheetRef.current) return;

    if (open) bottomSheetRef.current.present();
    else {
      bottomSheetRef.current.forceClose();
      // bottomSheetRef.current?.collapse();
    }
  }, [open]);

  // callbacks
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        closeModal();
      }
    },
    [closeModal],
  );

  // renders
  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      //   index={-1}
      //   snapPoints={["25%"]}
      enableDynamicSizing
      //   handleHeight={animatedHandleHeight}
      //   contentHeight={animatedContentHeight}
      onChange={handleSheetChanges}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      detached
      bottomInset={46}
      style={{
        marginHorizontal: 24,
      }}

      // onClose={closeModal}
    >
      <BottomSheetView
        style={
          {
            //   paddingBottom: bottom || spacing.small,
          }
        }
      >
        {children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default AnimatedBottomSheet;
