import React from "react";
import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

import { Tag, ArrowRight } from "phosphor-react-native";

type Props = {
  quantity: number;
}

export default function Sell({ quantity }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigationAnnouncement(){
    navigation.navigate("Announcements");
  }

  return (
    <Box className="mb-9">
      <Text className="mb-3.5 text-base text-base-300">
        Seus produtos anunciados para venda
      </Text>

      <TouchableOpacity onPress={handleNavigationAnnouncement}>
        <HStack space="md" className="py-3.5 pl-4 pr-5 justify-between items-center bg-product-secundary/10 rounded-md">
          <HStack space="lg" className="items-center">
            <Tag size={22} color="#364D9D" weight="bold" />

            <VStack>
              <Heading className="text-base-200 text-xl">{quantity}</Heading>
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
