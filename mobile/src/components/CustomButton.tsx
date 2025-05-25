import React, { ElementType } from "react";
import { TouchableOpacityProps } from "react-native";

import { Icon } from "@/components/ui/icon";
import { HStack } from "@/components/ui/hstack";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";

import { LucideProps } from "lucide-react-native";

type Props = TouchableOpacityProps & {
  text: string;
  variant: "PRIMARY" | "SECUNDARY" | "NEUTRAL";
  isLoading?: boolean;
  icon?: ElementType<LucideProps>;
};

export default function CustomButton({ text, variant, isLoading = false, icon, ...rest }: Props) {
  return (
    <Button
      className={`h-12 rounded-md ${ variant === "PRIMARY" ? "bg-product-secundary" : variant === "SECUNDARY" ? "bg-base-100" : "bg-base-500" }`}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner size="small" color={`${variant === "PRIMARY" || variant === "SECUNDARY" ? "#F7F7F8" : "#3E3A40"}`} />
      ) : (
        <HStack className="items-center" space="md">
          { icon && <Icon as={icon} className="w-5 h-5" color={`${variant === "PRIMARY" || variant === "SECUNDARY" ? "#EDECEE": "#3E3A40"}`} />}

          <ButtonText
            className={`text-base font-heading ${ variant === "PRIMARY" || variant === "SECUNDARY" ? "text-base-700": "text-base-200"}`}
          >
            {text}
          </ButtonText>
        </HStack>
      )}
    </Button>
  );
}
