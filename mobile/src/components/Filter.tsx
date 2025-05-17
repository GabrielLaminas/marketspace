import { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";

import { 
  BottomSheetView, 
  BottomSheetModal, 
  BottomSheetBackdrop,
  BottomSheetModalProvider
} from "@gorhom/bottom-sheet";

import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';

import { X } from "phosphor-react-native";

export type CustomBottomSheetModalRef = {
  present: () => void;
  dismiss: () => void;
};

type Props = {
  hiddenModal: () => void
}

const Filter = forwardRef<CustomBottomSheetModalRef, Props>(({ hiddenModal }, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ['75%'], []);

  useImperativeHandle(ref, () => ({
    present: () => bottomSheetModalRef.current?.present(),
    dismiss: () => bottomSheetModalRef.current?.dismiss(),
  }));

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop 
            {...props}
            pressBehavior="close"
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
          />
        )}
      >
        <BottomSheetView style={{flex: 1}}>
          <Box className="flex-1 pt-[48px] px-[24px]">
            <HStack className="w-full justify-between items-center">
              <Heading className="text-base-100 text-xl">
                Filtrar anúncios
              </Heading>

              <TouchableOpacity onPress={hiddenModal}>
                <X size={24} color="#9F9BA1" />
              </TouchableOpacity>
            </HStack>
          </Box>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
});

export default Filter;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  contentContainer: {
    flex: 1,
    paddingTop: 48,
    paddingHorizontal: 24,
  },
})