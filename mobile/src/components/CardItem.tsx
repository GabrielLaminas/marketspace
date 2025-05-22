import React from "react";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Badge, BadgeText } from "@/components/ui/badge";

interface Props {
  id: number;
  kind: string;
  name: string;
  preco: number;
  uri: string;
  user?: string; 
  status?: "active" | "inactive";
}

export default function CardItem({ data, index }: { data: Props, index: number }) {
  return (
    <VStack className={`flex-1 ${index % 2 === 0 && "mr-[20px]"}`}>
      <Box className="relative">
        <Image 
          source={{ uri: data.uri }}
          size="none"
          alt={data.name}
          resizeMode="cover"
          className="w-full h-[100px] rounded-md bg-slate-700"
        />

      <HStack className={`absolute left-0 top-0 w-full p-1 ${data.user ? "justify-between" : "justify-end"}`}>
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
            <BadgeText className="uppercase font-heading text-center text-base-700">{data.kind}</BadgeText>
          </Badge>
        </HStack>
      </Box>
      {}
      <Box className="mt-1">
        <Text className={`text-base ${ data.status && data.status === "active" ? "text-base-200" : "text-base-400"}`}>
          {data.name}
        </Text>
        <Heading className={`text-lg ${data.status && data.status === "active" ? "text-base-100 font-bold" : "text-base-400 font-normal"}`}>
          R$ {data.preco}
        </Heading>
      </Box>
    </VStack>
  );
}
