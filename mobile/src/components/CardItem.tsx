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
  onPress: () => void;
}

export default function CardItem({ data, onPress }: Props) {
  const { user } = useContext(AuthContext);

  return (
    <TouchableOpacity onPress={onPress} style={{ flexGrow: 1, flexBasis: 50, flexShrink: 0 }}>
      <VStack>
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
              data.user?.avatar && (
                <Image 
                  source={{ uri: `${api.defaults.baseURL}/images/${data.user.avatar}` }}
                  size="none"
                  width={24}
                  height={24}
                  alt={user.name}
                  resizeMode="center"
                  className="rounded-full border border-base-700 bg-slate-400"
                />
              )
            }
            <Badge className="px-[8px] py-[2px] rounded-full bg-product-primary">
              <BadgeText className="uppercase font-heading font-bold text-center text-base-700">{data.is_new ? "Novo" : "Usado"}</BadgeText>
            </Badge>
          </HStack>
        </Box>

        <Box className="mt-1">
          <Text className={`text-base ${ data.is_active || data.is_active === undefined ? "base-200" : "text-base-400"}`}>
            {data.name}
          </Text>
          <HStack className="flex-shrink-0 items-center" space="xs">
            <Text className={`text-sm mt-1 ${ data.is_active || data.is_active === undefined ? "text-base-100 font-bold" : "text-base-400 font-normal"}`}>R$</Text>
            <Heading className={`text-lg ${ data.is_active || data.is_active === undefined ? "text-base-100 font-bold" : "text-base-400 font-normal"}`}>
              { new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 }).format(data.price).replace("R$", "").trim() }
            </Heading>
          </HStack>  
        </Box>
      </VStack>
    </TouchableOpacity>    
  );
}
