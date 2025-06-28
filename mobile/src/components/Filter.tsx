import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";

import { 
  BottomSheetView, 
  BottomSheetModal, 
  BottomSheetBackdrop,
  BottomSheetModalProvider
} from "@gorhom/bottom-sheet";

import { PaymentMethods } from '@dtos/Product';

import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Box } from '@/components/ui/box';
import { Switch } from '@/components/ui/switch';
import { CheckboxGroup } from '@/components/ui/checkbox';

import CustomCheckbox from './CustomCheckbox';
import CustomButton from './CustomButton';

import { X, XCircle } from "phosphor-react-native";


export type CustomBottomSheetModalRef = {
  present: () => void;
  dismiss: () => void;
};

type Props = {
  hiddenModal: () => void
  condition: {
    new: boolean,
    used: boolean,
  };
  setCondition: React.Dispatch<React.SetStateAction<{
    new: boolean;
    used: boolean;
  }>>;
  trade: boolean;
  setTrade: React.Dispatch<React.SetStateAction<boolean>>;
  paymentMethods: PaymentMethods[]; 
  setPaymentMethods: React.Dispatch<React.SetStateAction<PaymentMethods[]>>;
  setQueryParams: React.Dispatch<React.SetStateAction<string>>;
}

const Filter = forwardRef<CustomBottomSheetModalRef, Props>(({ 
  hiddenModal, 
  condition, 
  setCondition,
  trade, 
  setTrade,
  paymentMethods, 
  setPaymentMethods,
  setQueryParams
}, ref) => {

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['80%'], []);

  useImperativeHandle(ref, () => ({
    present: () => bottomSheetModalRef.current?.present(),
    dismiss: () => bottomSheetModalRef.current?.dismiss(),
  }));

  function handleCondition(state: { new: boolean, used: boolean }) {
    setCondition(() => ({ new: state.new, used: state.used }));
  }
  
  function handleTrade() {
    setTrade((prevTrade) => !prevTrade);
  }

  function handlePayment(values: PaymentMethods[]) {
    setPaymentMethods(values);
  }

  function handleResetFilter(){
    setCondition({ new: false, used: false });
    setTrade(false);
    setPaymentMethods([]);
    setQueryParams("");
  }

  function handleSetFilter(){
    let url = "";
    url += `&is_new=${condition.new}&accept_trade=${trade}`;
    paymentMethods.forEach((payment) => {
      url += `&payment_methods=${payment}`
    });

    setQueryParams(url);
    hiddenModal();
  }

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
                    className={`py-[6px] pl-[16px] rounded-full ${condition.new ? 'pr-[6px] bg-product-secundary' : 'pr-[16px] bg-base-500'}`}
                    onPress={() => handleCondition({ new: true, used: false })}
                  >
                    <HStack space="sm" className="items-center">
                      <Heading className={`text-sm uppercase ${condition.new ? 'text-white' : 'text-base-300'}`}>
                        Novo
                      </Heading>
                      
                      <TouchableOpacity onPress={() => handleCondition({ new: false, used: false })}>
                        { condition.new && <XCircle color="#FFF" size={18} weight='fill' /> }
                      </TouchableOpacity>
                    </HStack>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    className={`py-[6px] pl-[16px] rounded-full ${condition.used ? 'pr-[6px] bg-product-secundary' : 'pr-[16px] bg-base-500'}`} 
                    onPress={() => handleCondition({ new: false, used: true })}
                  >
                    <HStack space="sm" className="items-center">
                      <Heading className={`text-sm uppercase ${condition.used ? 'text-white' : 'text-base-300'}`}>
                        Usado
                      </Heading>
                      
                      <TouchableOpacity onPress={() => handleCondition({ new: false, used: false })}>
                        { condition.used && <XCircle color="#FFF" size={18} weight='fill' /> }
                      </TouchableOpacity>
                    </HStack>
                  </TouchableOpacity>
                </HStack>
              </Box>

              <Box>
                <Heading className="text-base text-base-200">Aceita troca?</Heading>

                <HStack className="justify-start">
                  <Switch 
                    value={trade}
                    onToggle={handleTrade}
                    size="lg"
                    trackColor={{ false: "#D9D8DA", true: "#647AC7" }}
                    thumbColor="#F7F7F8"
                    ios_backgroundColor="#D9D8DA"
                  />
                </HStack>
              </Box>

              <Box>
                <Heading className="mb-[12px] text-base text-base-200">Meios de pagamento aceitos</Heading>

                <CheckboxGroup value={paymentMethods} onChange={handlePayment}>
                  <VStack space="md" className="mt-2">
                    <CustomCheckbox label="Boleto" value="boleto" />
                    <CustomCheckbox label="Pix" value="pix" />
                    <CustomCheckbox label="Dinheiro" value="cash" />
                    <CustomCheckbox label="Cartão de Crédito" value="card" />
                    <CustomCheckbox label="Depósito Bancário" value="deposit" />
                  </VStack>
                </CheckboxGroup>
              </Box>
            </VStack>

            <HStack space="lg" className="w-full">
              <CustomButton text="Resetar filtros" variant="NEUTRAL" style={{flex: 1 }} onPress={handleResetFilter} />
              <CustomButton text="Aplicar filtros" variant="SECUNDARY" style={{flex: 1 }} onPress={handleSetFilter}  />
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