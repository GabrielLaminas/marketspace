import React, { ElementType } from "react";
import { TouchableOpacity } from "react-native";
import { LucideProps } from "lucide-react-native";

import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Icon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";

type Props = {
  text?: string;
  iconLeft?: ElementType<LucideProps>;
  iconLeftAction?: () => void;
  iconRight?: ElementType<LucideProps>;
  iconRighAction?: () => void;
}

export default function Header({ text, iconLeft, iconLeftAction, iconRight, iconRighAction }: Props) {
  return (
    <HStack className="items-center justify-between">
       { iconLeft ? (
        <TouchableOpacity onPress={iconLeftAction}>
          <Icon className="w-7 h-7" color="#1A181B" as={iconLeft} /> 
        </TouchableOpacity>
      ) : <Box className="w-7 h-7" /> }

      <Heading className="text-2xl text-base-100">{text}</Heading>

      { iconRight ? (
        <TouchableOpacity onPress={iconRighAction}>
          <Icon className="w-7 h-7" color="#1A181B" as={iconRight} /> 
        </TouchableOpacity>
      ) : <Box className="w-7 h-7" />  }
      
    </HStack>
  );
}
