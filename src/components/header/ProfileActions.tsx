import { NavLink } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/drop_down_menu";
import { useLogout } from "../../hooks/useLogout";
import { Button } from "../ui/button";
import Favourites from "./Favourites";
import useSWR from "swr";
import { AuthApi } from "../../api/AuthApi";

export default function ProfileActions() {
  const { data, isLoading, error } = useSWR("/users", AuthApi.getUser);

  const { logout } = useLogout();

  return (
    <div className="flex flex-row items-center gap-2 xl:gap-4">
      <Favourites />

      <div className="hidden xl:block">
        <Avatar>
          {data && <AvatarImage src={data.url} />}
          <AvatarFallback />
        </Avatar>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {data && (
            <Button variant="outline">{`${data.lastName} ${data.firstName}`}</Button>
          )}
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
    </div>
  );
}
