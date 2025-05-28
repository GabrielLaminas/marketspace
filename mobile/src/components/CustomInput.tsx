import React, { ComponentProps, useState } from "react";

import { 
  FormControl, FormControlLabel, FormControlLabelText, 
  FormControlError, FormControlErrorText 
} from "@/components/ui/form-control";

import { Input, InputField, InputSlot, InputIcon } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";

type Props = ComponentProps<typeof InputField> & {
  type?: "text" | "password";
  label?: string;
  placeholder: string;
  value: string;
  error?: string;
  isInvalid?: boolean;
};

export default function CustomInput({ placeholder, label, type = "text", error, isInvalid = false, ...rest }: Props) {
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
        <InputField
          type={password ? "text" : "password"}
          placeholder={placeholder}
          placeholderTextColor="#9F9BA1"
          className="m-0 p-0 mr-2 text-base text-base-200 font-normal font-body"
          {...rest}
        />

        { type === "password" && (
          <InputSlot onPress={handleChangeEyeIcon}>
            <InputIcon
              as={password ? EyeOffIcon : EyeIcon}
              size="xl"
              className="text-xl text-base-300"
            />
          </InputSlot>
        )}
      </Input>

      { error && (
        <FormControlError>
          <FormControlErrorText className="mt-1 text-red-600 text-sm">{error}</FormControlErrorText>
        </FormControlError>
      )}
    </FormControl>
  );
}
