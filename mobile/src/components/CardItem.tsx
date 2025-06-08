import React, { useContext } from "react";
import { TouchableOpacity } from "react-native";

import api from "@services/api";
import { UserProduct } from "@dtos/UserProduct";

import { AuthContext } from "@context/AuthContext";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { Badge, BadgeText } from "@/components/ui/badge";

type Props = {
  data: UserProduct;
  index: number;
  onPress: () => void;
}

export default function CardItem({ data, index, onPress }: Props) {
  const { user } = useContext(AuthContext);

  return (
    <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
      <VStack className={`flex-1 ${index % 2 === 0 && "mr-[20px]"}`}>
        <Box className="relative overflow-hidden rounded-md">
          { data?.product_images && (
            <Image 
              source={{ uri: `${api.defaults.baseURL}/images/${data.product_images[0]?.path}` }}
              size="none"
              alt={data.name}
              resizeMode="cover"
              className="w-full h-[100px] rounded-md bg-base-500"
            />
          )}

          { data.is_active === false && (
            <Box className="size-full absolute left-0 top-0 z-10 p-2 bg-base-100/45 flex justify-end">
              <Heading className="uppercase text-sm text-base-700">Anúncio desativado</Heading>
            </Box>
          )}     
          
          <HStack className={`w-full absolute left-0 top-0 p-1 ${user.id !== data.user_id ? "justify-between" : "justify-end"}`}>
            {
              user.id !== data.user_id && (
                <Image 
                  source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
                  size="none"
                  width={24}
                  height={24}
                  alt={user.name}
                  resizeMode="center"
                  className="rounded-full border-2 border-base-700 bg-slate-400"
                />
              )
            }
            <Badge className="px-[8px] py-[2px] rounded-full bg-product-primary">
              <BadgeText className="uppercase font-heading font-bold text-center text-base-700">{data.is_new ? "Novo" : "Usado"}</BadgeText>
            </Badge>
          </HStack>
        </Box>

        <Box className="mt-1">
          <Text className={`text-base ${ data.is_active && data.is_active ? "text-base-200" : "text-base-400"}`}>
            {data.name}
          </Text>
          <Heading className={`text-lg ${data.is_active && data.is_active ? "text-base-100 font-bold" : "text-base-400 font-normal"}`}>
            R$ {data.price}
          </Heading>
        </Box>
      </VStack>
    </TouchableOpacity>    
  );
}
