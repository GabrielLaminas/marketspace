import React from "react";
import {
  Button as BTN,
  ButtonText,
  ButtonSpinner,
} from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";

type Props = {
  text: string;
  variant: "PRIMARY" | "SECUNDARY" | "NEUTRAL";
  isLoading?: boolean;
};

export default function Button({ text, variant, isLoading = false }: Props) {
  return (
    <BTN
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
    </BTN>
  );
}
