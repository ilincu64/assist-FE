import { ReactNode } from "react";

type Props = {
  onClick: (viewType: number) => void;
  options: { type: string; icon: ReactNode }[];
};

export default function ViewChoice({ onClick, options }: Props) {
  return (
    <div className="items-center gap-2 flex">
      {options.map((option, i) => (
        <button
          key={option.type}
          className="text-2xl"
          onClick={() => onClick(i)}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
}
