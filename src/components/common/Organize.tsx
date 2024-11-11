import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  type: string;
  placeholder?: string;
  defaultValue?: string;
  onChange: (value: string, type: string) => void;
  options: { value: string; content: string }[];
};

export default function Organize({
  type,
  defaultValue,
  onChange,
  options,
}: Props) {
  return (
    <Select
      onValueChange={(value) => onChange(value, type)}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="flex h-min w-max items-center gap-2 border-none p-1 font-semibold">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.content}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
