import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/drop_down_menu";
import { NavLink } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";

export default function AvatarDrop() {
  const { logout } = useLogout();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <NavLink to="/profile" className="px-full w-full">
            <DropdownMenuItem className="cursor-pointer px-4 py-3">
              My Profile
            </DropdownMenuItem>
          </NavLink>

          <NavLink to="/AddAuction" className="px-full w-full">
            <DropdownMenuItem className="cursor-pointer px-4 py-3">
              Add auction item
            </DropdownMenuItem>
          </NavLink>

          <DropdownMenuItem
            className="w-full cursor-pointer px-4 py-3"
            onClick={logout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
