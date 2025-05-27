import React from "react";
import { TouchableOpacity } from "react-native";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Badge, BadgeText } from "@/components/ui/badge";

interface Data {
  id: number;
  kind: string;
  name: string;
  preco: number;
  uri: string;
  user?: string; 
  status: "active" | "inactive";
}

type Props = {
  data: Data;
  index: number;
  onPress: () => void;
}

export default function CardItem({ data, index, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      <VStack className={`flex-1 ${index % 2 === 0 && "mr-[20px]"}`}>
        <Box className="relative overflow-hidden rounded-md">
          <Image 
            source={{ uri: data.uri }}
            size="none"
            alt={data.name}
            resizeMode="cover"
            className="w-full h-[100px] rounded-md bg-slate-700"
          />

          { data.status === "inactive" && (
            <Box className="size-full absolute left-0 top-0 z-10 p-2 bg-base-100/45 flex justify-end">
              <Heading className="uppercase text-sm text-base-700">Anúncio desativado</Heading>
            </Box>
          )}     
          
          <HStack className={`w-full absolute left-0 top-0 p-1 ${data.user ? "justify-between" : "justify-end"}`}>
            {
              data.user && (
                <Image 
                  source={{ uri: data.user }}
                  size="none"
                  width={24}
                  height={24}
                  alt={data.name}
                  className="rounded-full border-2 border-base-700 bg-slate-400"
                />
              )
            }
            <Badge className="px-[8px] py-[2px] rounded-full bg-product-primary">
              <BadgeText className="uppercase font-heading font-bold text-center text-base-700">{data.kind}</BadgeText>
            </Badge>
          </HStack>
        </Box>

        <Box className="mt-1">
          <Text className={`text-base ${ data.status && data.status === "active" ? "text-base-200" : "text-base-400"}`}>
            {data.name}
          </Text>
          <Heading className={`text-lg ${data.status && data.status === "active" ? "text-base-100 font-bold" : "text-base-400 font-normal"}`}>
            R$ {data.preco}
          </Heading>
        </Box>
      </VStack>
    </TouchableOpacity>    
  );
}
