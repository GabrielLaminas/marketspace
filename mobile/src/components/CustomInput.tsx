import React, { ComponentProps, useState } from "react";

import { FormControl, FormControlLabel, FormControlLabelText, FormControlErrorText } from "@/components/ui/form-control";

import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Box } from "@/components/ui/box";

import RS from "@assets/rs.svg";

type Props = ComponentProps<typeof InputField> & {
  type?: "text" | "password";
  label?: string;
  placeholder: string;
  value: string;
  error?: string;
  isInvalid?: boolean;
  isMoney?: boolean;
};

export default function CustomInput({ placeholder, label, value, type = "text", error, isInvalid = false, isMoney = false, ...rest }: Props) {
  const [password, setPassword] = useState(false);

  function handleChangeEyeIcon(){
    setPassword((prevIcon) => !prevIcon);
  }

  return (
    <FormControl isInvalid={isInvalid}>
      { label && (
        <FormControlLabel>
          <FormControlLabelText>{label}</FormControlLabelText>
        </FormControlLabel>
      )}

      <Input className="h-[45px] px-4 py-3 bg-base-700 border border-base-700 rounded-md" isInvalid={isInvalid}>
        { isMoney && (
          <Box className="mr-2">
            <RS />
          </Box>
        )}

        <InputField
          type={type === "text" ? "text" : password ? "text" : "password"}
          placeholder={placeholder}
          placeholderTextColor="#9F9BA1"
          className="m-0 p-0 text-base text-base-200 font-normal font-body"
          value={value}
          {...rest}
        />

        { type === "password" && (
          <InputSlot onPress={handleChangeEyeIcon} className="ml-2">
            <InputIcon
              as={password ? EyeOffIcon : EyeIcon}
              size="xl"
              className="text-xl text-base-300"
            />
          </InputSlot>
        )}
      </Input>
      
      { error && <FormControlErrorText className="mt-1 px-1 text-red-600 text-sm">{error}</FormControlErrorText> }
    </FormControl>
  );
}
