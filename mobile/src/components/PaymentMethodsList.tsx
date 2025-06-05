import React from "react";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";

import { Barcode, Bank, Money, QrCode, CreditCard } from "phosphor-react-native";
import { PaymentMethods } from "@dtos/Product";

type Props = {
  paymentsMethods: PaymentMethods[]
}

export default function PaymentMethodsList({ paymentsMethods }: Props) {
  return (
    <VStack space="md">
      { 
        paymentsMethods?.map((methods, index) => (
          <HStack space="sm" className="items-center" key={index}>
            { 
              methods === "boleto" 
              ? <Barcode size={20} color="#1A181B" /> 
              : methods === "pix" 
              ? <QrCode size={20} color="#1A181B" /> 
              : methods === "cash"
              ? <Money size={20} color="#1A181B" />
              : methods === "card"
              ? <CreditCard size={20} color="#1A181B" />
              : <Bank size={20} color="#1A181B" />
            }
            <Text className="text-base-200 text-base">
              { 
                methods === "boleto" 
                ? "Boleto"
                : methods === "pix" 
                ? "Pix" 
                : methods === "cash"
                ? "Dinheiro"
                : methods === "card"
                ? "Cartão de Crédito"
                : "Depósito Bancário"
              }
            </Text>
          </HStack>
        ))
      }
    </VStack>
  );
}
