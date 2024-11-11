import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Section({ children }: Props) {
  return (
    <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[35fr_65fr] xl:grid-cols-2">
      {children}
    </div>
  );
}
