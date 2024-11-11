import { Dispatch, SetStateAction } from "react";
import { NavLink } from "react-router-dom";

const links = [
  {
    to: "/",
    value: "Home",
  },
  {
    to: "/portfolio",
    value: "Portfolio",
  },
];

type Props = {
  setIsSideNavOpen?: Dispatch<SetStateAction<boolean>>;
};

export default function NavLinks({ setIsSideNavOpen }: Props) {
  return (
    <nav className="w-full">
      <ul className="flex flex-col items-center gap-6 text-textGray xl:flex-row xl:gap-4">
        {links.map((link) => (
          <li key={link.value}>
            <NavLink
              to={link.to}
              onClick={() => setIsSideNavOpen && setIsSideNavOpen(false)}
              className="p-3 font-medium"
            >
              {link.value}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
