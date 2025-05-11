import React from "react";

import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";

import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";

type Props = {
  type: "text" | "password";
  placeholder: string;
};

export default function CustomInput({ placeholder, type = "text" }: Props) {
  return (
    <VStack>
      {/* <Text>Label</Text> */}

      <Input className="h-12 px-4 py-3">
        <InputField
          type={type}
          placeholder={placeholder}
          className="m-0 p-0 text-base text-base-400"
        />

        <InputSlot>
          <InputIcon as={type === "password" && EyeIcon} />
        </InputSlot>
      </Input>
    </VStack>
  );
}

{
  /* {label && <Text>{label}</Text>} */
}
