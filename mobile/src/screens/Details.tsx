import { TouchableOpacity, ScrollView } from "react-native";
import React from "react";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";

import CustomButton from "@components/CustomButton";

import { ArrowLeft } from "phosphor-react-native";

export default function Details() {
  return (
    <Box className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity className="mt-[64px]">
          <ArrowLeft size={24} color="#1A181B" />
        </TouchableOpacity>

        <Box className="w-full h-[280px] bg-base-500" />

        <VStack space="2xl" className="px-[24px] pt-[22px] pb-[26px]">
          <HStack space="sm">
            <Box className="size-6 bg-base-400 rounded-full"></Box>
            <Text>Makenna Baptista</Text>
          </HStack>

          <VStack>
            <Badge>
              <BadgeText>Novo</BadgeText>
            </Badge>

            <HStack className="justify-between items-center">
              <Heading>Bicicleta</Heading>

              <Heading>
                <Text>R$</Text>
                120,00
              </Heading>
            </HStack>

            <Text>
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis in aliquam.
            </Text>
          </VStack>

          <HStack space="md" className="items-center">
            <Heading>Aceita troca?</Heading>
            <Text>Sim</Text>
          </HStack>

          <Box>
            <Heading>Meios de pagamento:</Heading>

            <VStack space="md">
              <HStack space="sm" className="items-center">
                <Box className="size-5 bg-base-500" />
                <Text>Boleto</Text>
              </HStack>

              <HStack space="sm" className="items-center">
                <Box className="size-5 bg-base-500" />
                <Text>Pix</Text>
              </HStack>

              <HStack space="sm" className="items-center">
                <Box className="size-5 bg-base-500" />
                <Text>Dinheiro</Text>
              </HStack>

              <HStack space="sm" className="items-center">
                <Box className="size-5 bg-base-500" />
                <Text>Cartão de Crédito</Text>
              </HStack>

              <HStack space="sm" className="items-center">
                <Box className="size-5 bg-base-500" />
                <Text>Depósito Bancário</Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </ScrollView>

      <Box className="px-[24px] pt-[20px] pb-[28px] bg-base-700">
        <HStack space="md" className="justify-between items-center">
          <Heading>
            <Text>R$</Text>
            120,00
          </Heading>

          <CustomButton
            text="Entrar em contato"
            variant="PRIMARY"
          />
        </HStack>
      </Box>
    </Box>
  );
}
