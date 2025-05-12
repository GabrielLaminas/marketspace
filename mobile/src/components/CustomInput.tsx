import React, { ComponentProps } from "react";

import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";

import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";

type Props = ComponentProps<typeof Input> & {
  type: "text" | "password";
  label?: string;
  placeholder: string;
};

export default function CustomInput({
  placeholder,
  label,
  type = "text",
  ...rest
}: Props) {
  return (
    <VStack>
      {label && <Text>{label}</Text>}

      <Input
        className="h-[45px] px-4 py-3 bg-base-700 border border-base-700 rounded-md"
        {...rest}
      >
        <InputField
          type={type}
          placeholder={placeholder}
          placeholderTextColor="#9F9BA1"
          className="m-0 p-0 mr-2 text-base text-base-200 font-normal font-body"
        />

        <InputSlot>
          <InputIcon
            as={type === "password" && EyeIcon}
            size="xl"
            className="text-xl text-base-300"
          />
        </InputSlot>
      </Input>
    </VStack>
  );
}
