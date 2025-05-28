import React from "react";

import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";

import CustomButton from "./CustomButton";

import { Plus } from "lucide-react-native";
import Avatar from "@assets/avatar.png";

type Props = {
  name?: string;
  avatar?: string;
  onPress: () => void;
}

export default function HomeHeader({ onPress }: Props) {
  return (
    <HStack space="sm" className="w-full mb-9 items-center justify-between">
      <HStack space="md" className="items-center">
        <Image
          source={Avatar}
          alt="avatar profile"
          resizeMode="cover"
          size="none"
          className="size-[45px] border-2 border-product-secundary rounded-full"
        />

        <Text className="text-lg text-base-100">
          Boas vindas,{"\n"}
          <Text className="font-heading font-bold">Maria!</Text>
        </Text>
      </HStack>

      <CustomButton 
        text="Criar anúncio"
        variant="SECUNDARY"
        icon={Plus}
        onPress={onPress}
      />
    </HStack>
  );
}
