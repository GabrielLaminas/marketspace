import React from "react";
import { ScrollView } from "react-native";

import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";

import CustomInput from "@components/CustomInput";
import CustomButton from "@components/CustomButton";

import Logo from "@assets/logo.svg";
import Avatar from "@assets/avatar.png";
import { Center } from "@/components/ui/center";

export default function SignUp() {
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <Box style={{ flex: 1 }} className="px-12 pt-16 pb-14 bg-base-600">
        <VStack className="mb-8 items-center">
          <Logo width={60} height={40} />

          <Heading className="mt-3 text-base-100 text-2xl block">
            Boas vindas!
          </Heading>
          <Text className="mt-2 text-base-300 text-base font-light text-center">
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>
        </VStack>

        <VStack>
          <Center className="mb-4">
            <Box className="relative">
              <Image
                source={Avatar}
                alt="avatar profile"
                width={88}
                height={88}
                className="size-20 bg-base-500 border-[3px] border-product-secundary rounded-full"
              />
            </Box>
          </Center>

          <Box>
            <VStack className="gap-4">
              <CustomInput placeholder="Nome" type="text" />

              <CustomInput placeholder="E-mail" type="text" />

              <CustomInput placeholder="Telefone" type="text" />

              <CustomInput placeholder="Senha" type="password" />

              <CustomInput placeholder="Confirmar senha" type="password" />

              <Box className="mt-4">
                <CustomButton text="Criar" variant="SECUNDARY" />
              </Box>
            </VStack>
          </Box>

          <Box className="mt-12">
            <Text className="mb-4 text-center text-base-200 text-base">
              Já tem uma conta?
            </Text>

            <CustomButton text="Ir para o login" variant="NEUTRAL" />
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
}
