import React from "react";
import { 
  Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel 
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";

import { PaymentMethods } from "@dtos/Product";

type Props = {
  value: PaymentMethods;
  label?: string;
}

export default function CustomCheckbox({ value, label }: Props) {
  return (
    <Checkbox size="md" isInvalid={false} isDisabled={false} value={value}>
      <CheckboxIndicator>
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>

      <CheckboxLabel className="text-lg text-base-200">{label ? label : value}</CheckboxLabel>
    </Checkbox>
  );
}
