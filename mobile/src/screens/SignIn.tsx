import React from "react";
import { ScrollView } from "react-native";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";

import Logo from "@assets/logo.svg";
import { Box } from "@/components/ui/box";
import CustomInput from "@components/CustomInput";
import Button from "@components/Button";

export default function SignIn() {
  return (
    <ScrollView>
      <Box className="px-12 pt-24 pb-16 bg-base-600 rounded-b-3xl">
        <VStack className="mb-20 items-center">
          <Logo />
          <Heading className="mt-5 text-base-100 text-4xl">marketspace</Heading>
          <Text className="text-base-300 text-base font-light">
            Seu espaço de compra e venda
          </Text>
        </VStack>

        <VStack>
          <Text className="mb-4 text-base-200 text-base text-center">
            Acesse sua conta
          </Text>

          <Box>
            <VStack className="gap-4">
              <CustomInput placeholder="E-mail" />

              <CustomInput placeholder="Senha" type="password" />

              {/* <Input className="min-h-11 h-11">
                <InputField placeholder="E-mail" keyboardType="email-address" />
              </Input>

              <Input className="min-h-11 h-11">
                <InputField placeholder="Senha" />
              </Input> */}

              <Button text="Entrar" variant="PRIMARY" />
            </VStack>
          </Box>
        </VStack>
      </Box>

      <Box className="px-12 pt-14 pb-20">
        <Text className="mb-4 text-center text-base-200 text-base">
          Ainda não tem acesso?
        </Text>

        <Button text="Criar uma conta" variant="NEUTRAL" />
      </Box>
    </ScrollView>
  );
}
