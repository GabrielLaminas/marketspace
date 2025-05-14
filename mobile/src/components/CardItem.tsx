import React from "react";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Badge, BadgeText } from "@/components/ui/badge";

export default function CardItem() {
  return (
    <VStack>
      <Box>
        <Image 
          size="none"
          width={152.99}
          height={100}
          className="rounded-md bg-slate-700"
        />

        <HStack>
          <Image 
            size="none"
            width={24}
            height={24}
            className="rounded-full border-1 border-base-700 bg-slate-400"
          />

          <Badge className="px-[8px] py-[2px] rounded-full bg-product-primary">
            <BadgeText className="uppercase font-heading text-base-700">Novo</BadgeText>
          </Badge>
        </HStack>
      </Box>

      <Box>
        <Text className="text-base-200 text-base">Tênis vermelho</Text>
        <Heading className="text-base-100 text-lg">R$ 59,90</Heading>
      </Box>
    </VStack>
  );
}
