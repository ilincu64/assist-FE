import { HiMiniBars3 } from "react-icons/hi2";
import NavLinks from "./NavLinks";
import ProfileActions from "./ProfileActions";
import SearchBar from "./searchbar";
import { useState } from "react";
import SideNav from "./SideNav";
import { createPortal } from "react-dom";
import AvatarDrop from "./AvatarDrop";

export default function Header() {
  const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);

  return (
    <>
      <header className="lg:px-15 grid grid-cols-[10fr_80%_10fr] items-center gap-3 border-b border-gray-400 bg-white px-5 py-7 md:grid-cols-[10fr_60%_10fr] xl:grid-cols-3 xl:gap-3 xl:px-20">
        <div className="block xl:hidden">
          <AvatarDrop />
        </div>
        <div className="hidden items-center gap-20 xl:flex">
          <img
            src="/assets/assist-academy-logo.png"
            alt="Assist Academy Logo"
            className="hidden max-w-full sm:max-w-[70%] lg:max-w-[40%] xl:flex xl:max-w-[25%]"
          />
          <div className="hidden xl:block">
            <NavLinks />
          </div>
        </div>

        <SearchBar />

        <div className="hidden justify-self-end xl:block">
          <ProfileActions />
        </div>

        <div className="block justify-self-end xl:hidden">
          <button
            className=""
            onClick={() => setIsSideNavOpen((prev) => !prev)}
          >
            <HiMiniBars3 className="text-2xl" />
          </button>
        </div>
      </header>
      {isSideNavOpen &&
        createPortal(
          <SideNav
            isSideNavOpen={isSideNavOpen}
            setIsSideNavOpen={setIsSideNavOpen}
          />,
          document.body,
        )}
    </>
  );
}
