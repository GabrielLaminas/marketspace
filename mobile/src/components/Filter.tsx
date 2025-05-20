import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";

import { 
  BottomSheetView, 
  BottomSheetModal, 
  BottomSheetBackdrop,
  BottomSheetModalProvider
} from "@gorhom/bottom-sheet";

import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Switch } from '@/components/ui/switch';

import CustomCheckbox from './CustomCheckbox';
import CustomButton from './CustomButton';

import { X, XCircle } from "phosphor-react-native";

export type CustomBottomSheetModalRef = {
  present: () => void;
  dismiss: () => void;
};

type Props = {
  hiddenModal: () => void
}

const Filter = forwardRef<CustomBottomSheetModalRef, Props>(({ hiddenModal }, ref) => {
  const [conditionState, setConditionState] = useState({
    newS: false,
    usedS: false,
  });

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['80%'], []);

  useImperativeHandle(ref, () => ({
    present: () => bottomSheetModalRef.current?.present(),
    dismiss: () => bottomSheetModalRef.current?.dismiss(),
  }));

  function handleSetCondition() {}

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
          <VStack className="flex-1 pt-[48px] pb-[64px] px-[24px] justify-between" space="4xl">
            <VStack className="" space="3xl">
              <HStack className="w-full justify-between items-center">
                <Heading className="text-base-100 text-xl">
                  Filtrar anúncios
                </Heading>

                <TouchableOpacity onPress={hiddenModal}>
                  <X size={24} color="#9F9BA1" />
                </TouchableOpacity>
              </HStack>

              <Box>
                <Heading className="mb-[12px] text-base text-base-200">Condição</Heading>

                <HStack space="md">
                  <TouchableOpacity 
                    className={`py-[6px] pl-[16px] rounded-full ${conditionState.newS ? 'pr-[6px] bg-product-secundary' : 'pr-[16px] bg-base-500'}`}
                    // onPress={}
                  >
                    <HStack space="sm" className="items-center">
                      <Heading className={`text-sm uppercase ${conditionState.newS ? 'text-white' : 'text-base-300'}`}>
                        Novo
                      </Heading>
                      { conditionState.newS && <XCircle color="#FFF" size={18} weight='fill' /> }
                    </HStack>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    className={`py-[6px] pl-[16px] rounded-full ${conditionState.usedS ? 'pr-[6px] bg-product-secundary' : 'pr-[16px] bg-base-500'}`} 
                    // onPress={}
                  >
                    <HStack space="sm" className="items-center">
                      <Heading className={`text-sm uppercase ${conditionState.newS ? 'text-white' : 'text-base-300'}`}>
                        Usado
                      </Heading>
                      { conditionState.usedS && <XCircle color="#FFF" size={18} weight='fill' /> }
                    </HStack>
                  </TouchableOpacity>
                </HStack>
              </Box>

              <Box>
                <Heading className="text-base text-base-200">Aceita troca?</Heading>

                <HStack className="justify-start">
                  <Switch 
                    size="lg"
                    trackColor={{ false: "#D9D8DA", true: "#647AC7" }}
                    thumbColor="#F7F7F8"
                    ios_backgroundColor="#D9D8DA"
                  />
                </HStack>
              </Box>

              <Box>
                <Heading className="mb-[12px] text-base text-base-200">Meios de pagamento aceitos</Heading>

                <VStack space="md" className="mt-2">
                  <CustomCheckbox value="Boleto" />
                  <CustomCheckbox value="Pix" />
                  <CustomCheckbox value="Dinheiro" />
                  <CustomCheckbox value="Cartão de Crédito" />
                  <CustomCheckbox value="Depósito Bancário" />
                </VStack>
              </Box>
            </VStack>

            <HStack space="lg" className="w-full">
              <CustomButton text="Resetar filtros" variant="NEUTRAL" style={{flex: 1 }}  />
              <CustomButton text="Aplicar filtros" variant="SECUNDARY" style={{flex: 1 }}  />
            </HStack>
          </VStack>
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