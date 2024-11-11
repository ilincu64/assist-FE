import { NavLink } from "react-router-dom";

import { Switch } from "../../ui/switch";

type Props = {
  isLoading: boolean;
  onCheckedChange: (checked: boolean) => void;
};

export default function UserUtilities({ onCheckedChange, isLoading }: Props) {
  return (
    <div className="flex flex-col items-center justify-between gap-2 text-primary sm:flex-row">
      <div className="flex items-center gap-2">
        <Switch
          className="bg-textGray"
          onCheckedChange={onCheckedChange}
          disabled={isLoading}
        />
        <p className="text-sm font-medium">Remember me</p>
      </div>

      <NavLink
        to="/auth/forgotPassword"
        className="border-b border-primary text-sm font-medium"
      >
        Forgot your password?
      </NavLink>
    </div>
  );
}
