import React from "react";
import { ScrollView } from "react-native";

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";

import Logo from "@assets/logo.svg";

export default function SignIn() {
  return (
    <ScrollView>
      <VStack>
        <Logo />
        <Heading>marketspace</Heading>
        <Text>Seu espaço de compra e venda</Text>
      </VStack>
    </ScrollView>
  );
}
