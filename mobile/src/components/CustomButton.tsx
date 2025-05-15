import React, { JSX, ComponentProps } from "react";
import { TouchableOpacityProps } from "react-native";
import { Button, ButtonText, ButtonSpinner } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { type IconProps } from "phosphor-react-native";
import { Icon } from "@/components/ui/icon";

type IconType = (props: IconProps) => JSX.Element;

type Props = TouchableOpacityProps & {
  text: string;
  variant: "PRIMARY" | "SECUNDARY" | "NEUTRAL";
  isLoading?: boolean;
};

export default function CustomButton({
  text,
  variant,
  isLoading = false,
  ...rest
}: Props) {
  return (
    <Button
      className={`
        h-12 rounded-md
        ${
          variant === "PRIMARY"
            ? "bg-product-secundary"
            : variant === "SECUNDARY"
            ? "bg-base-100"
            : "bg-base-500"
        }
      `}
      {...rest}
    >
      {isLoading ? (
        <ButtonSpinner
          size="small"
          color={`${
            variant === "PRIMARY" || variant === "SECUNDARY"
              ? "#F7F7F8"
              : "#3E3A40"
          }`}
        />
      ) : (
        <HStack>
          <ButtonText
            className={`text-base font-heading ${
              variant === "PRIMARY" || variant === "SECUNDARY"
                ? "text-base-700"
                : "text-base-200"
            }`}
          >
            {text}
          </ButtonText>
        </HStack>
      )}
    </Button>
  );
}
