import { 
  Select, SelectTrigger, SelectInput, SelectIcon, SelectPortal, SelectBackdrop, 
  SelectContent, SelectDragIndicator, SelectDragIndicatorWrapper, SelectItem 
} from "@/components/ui/select";

import { ChevronDownIcon } from "@/components/ui/icon";

export default function CustomSelect() {
  return (
    <Select>
      <SelectTrigger variant="outline" size="md" className="items-center bg-[#EDECEE] border-base-400">
        <SelectInput placeholder="Todos" className="text-base-100 text-base" />
        <SelectIcon className="mr-3" as={ChevronDownIcon} />
      </SelectTrigger>

      <SelectPortal>
        <SelectBackdrop />

        <SelectContent className="items-center bg-base-700 shadow-base-300">
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
