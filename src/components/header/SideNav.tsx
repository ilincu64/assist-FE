import clsx from "clsx";
import NavLinks from "./NavLinks";
import { HiMiniXMark } from "react-icons/hi2";
import { Dispatch, SetStateAction } from "react";
import Favourites from "./Favourites";

type Props = {
  isSideNavOpen: boolean;
  setIsSideNavOpen: Dispatch<SetStateAction<boolean>>;
};

export default function SideNav({ isSideNavOpen, setIsSideNavOpen }: Props) {
  return (
    <div
      className={clsx(
        isSideNavOpen && "right-0",
        "absolute right-[-100] top-0 flex h-screen w-full flex-col items-center gap-6 bg-white p-12",
      )}
    >
      <img
        src="/assets/assist-academy-logo.png"
        alt="Assist Academy Logo"
        className="mt-20 max-w-[25%]"
      />
      <button onClick={() => setIsSideNavOpen((prev) => !prev)}>
        <HiMiniXMark className="absolute right-5 top-5 stroke-1 text-2xl" />
      </button>
      <NavLinks setIsSideNavOpen={setIsSideNavOpen} />
      <div onClick={() => setIsSideNavOpen(false)}>
        <Favourites />
      </div>
    </div>
  );
}
