import React from "react";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";

import { MagnifyingGlass, Sliders } from "phosphor-react-native";


export default function ProductFilter() {
  return (
    <Box className="mb-[24px]">
      <Text className="mb-3.5 text-base text-base-300">
        Compre produtos variados
      </Text>

      <HStack space="lg" className="w-full px-[16px] py-[12px] justify-between items-center bg-base-700 rounded-md">
        <Input className="flex-1 border-base-700 bg-transparent outline-none">
          <InputField 
            placeholder="Buscar anúncio"
            autoFocus={false}
          />
        </Input>

        <HStack space="lg" className="flex-shrink-0 items-center">
          <MagnifyingGlass size={20} weight="bold" />
          <Box className="w-[1px] flex-shrink-0 h-6 bg-base-400 block" />
          <Sliders size={20} weight="bold" />
        </HStack>
      </HStack>
    </Box>
  );
}
