import React from "react";
import { TouchableOpacity } from "react-native";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

import { Tag, ArrowRight } from "phosphor-react-native";

export default function Sell() {
  return (
    <Box className="mb-9">
      <Text className="mb-3.5 text-base text-base-300">
        Seus produtos anunciados para venda
      </Text>

      <TouchableOpacity>
        <HStack space="md" className="py-3.5 pl-4 pr-5 justify-between items-center bg-product-secundary/10 rounded-md">
          <HStack space="lg" className="items-center">
            <Tag size={22} color="#364D9D" weight="bold" />

            <VStack>
              <Heading className="text-base-200 text-xl">4</Heading>
              <Text className="text-base-200 text-sm">anúncios ativos</Text>
            </VStack>
          </HStack>

          <HStack space="sm" className="items-center">
            <Heading className="text-product-primary text-sm">
              Meus anúncios
            </Heading>

            <ArrowRight size={16} color="#364D9D" />
          </HStack>
        </HStack>
      </TouchableOpacity>
    </Box>
  );
}
