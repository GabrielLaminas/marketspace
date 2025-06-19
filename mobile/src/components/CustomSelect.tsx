import React from "react";
import { 
  Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, 
  SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem 
} from "@/components/ui/select";

import { ChevronDownIcon } from "@/components/ui/icon";

type Props = {
  selected: "active" | "inactive" | "all";
  setSelected: React.Dispatch<React.SetStateAction<"active" | "inactive" | "all">>;
}

export default function CustomSelect({ selected,  setSelected }: Props) {

  function handleSelectValue(value: string){
    if (value === "active" || value === "inactive" || value === "all") {
      setSelected(value);
    }    
  }

  return (
    <Select selectedValue={selected === "all" ? "Todos" : selected} onValueChange={handleSelectValue}>
      <SelectTrigger variant="outline" size="md" className="items-center bg-transparent border-base-500">
        <SelectInput placeholder="Todos" className="py-1 text-base-100 text-base" />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>

      <SelectPortal>
        <SelectBackdrop />

        <SelectContent className="px-4 pb-20 pt-4 items-center bg-base-700 shadow-base-300">
          <SelectDragIndicatorWrapper>
            <SelectDragIndicator />
          </SelectDragIndicatorWrapper>

          <SelectItem label="Todos" value="all" className="text-base-200 text-base" />
          <SelectItem label="Ativos" value="active" className="text-base-200 text-base" />
          <SelectItem label="Inativos" value="inactive" className="text-base-200 text-base" />
        </SelectContent>
      </SelectPortal>
    </Select>
  );  
}
