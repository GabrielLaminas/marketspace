import React, { useState } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";

import { MagnifyingGlass, Sliders } from "phosphor-react-native";

type Props = TouchableOpacityProps & {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function ProductFilter({ search, setSearch, ...rest }: Props) {
  const [searchText, setSearchText] = useState("");

  function handleUpdateSearch(text: string){
    setSearchText(text);
    if(text === ""){
      setSearch("");
    }
  }

  function handleSetSearch(text: string){
    setSearch(text);
  }

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
            value={searchText}
            onChangeText={(text) => handleUpdateSearch(text)}
            onSubmitEditing={() => handleSetSearch(searchText)}
            returnKeyType="search"
          />
        </Input>

        <HStack space="lg" className="flex-shrink-0 items-center">
          <TouchableOpacity onPress={() => handleSetSearch(searchText)}>
            <MagnifyingGlass size={20} weight="bold" />
          </TouchableOpacity>          

          <Box className="w-[1px] flex-shrink-0 h-6 bg-base-400 block" />

          <TouchableOpacity {...rest}>
            <Sliders size={20} weight="bold" />
          </TouchableOpacity>
        </HStack>
      </HStack>
    </Box>
  );
}
