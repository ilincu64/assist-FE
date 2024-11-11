import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <div className=" border-t border-[#D5D9EB] px-28 py-12 flex flex-wrap space-x-4">
      <div className="flex justify-between max-w-[1280px] m-auto items-center">

        <ul className="hidden md:flex gap-6 ">
          <li>
            <Link to="https://x.com/assistsoftware">
              <img
                src="/assets/Logos/Social Icon Twitter.svg"
                alt="logo twitter"
              ></img>
            </Link>
          </li>
          <li>
            <Link to="https://ro.linkedin.com/company/assist-software-srl">
              <img
                src="/assets/Logos/Social Icon Linkedin.svg"
                alt="logo linkedin"
              ></img>
            </Link>
          </li>
          <li>
            <Link to="https://www.facebook.com/assist.software.development/?locale=ro_RO">
              <img
                src="/assets/Logos/Social Icon Facebook.svg"
                alt="logo facebook"
              ></img>
            </Link>
          </li>
          <li>
            <Link to="https://github.com/assist-software">
              <img
                src="/assets/Logos/Social Icon Github.svg"
                alt="logo github"
              ></img>
            </Link>
          </li>
          <li>
            <Link to="https://www.youtube.com/channel/UCe6M4rao6E30n1msI9KjJJQ">
              <img src="/assets/Logos/Social Icon.svg" alt="logo"></img>
            </Link>
          </li>
          <li>
            <Link to="https://dribbble.com/assist-software-design">
              <img
                src="/assets/Logos/Social Icon Dribbble.svg"
                alt="logo dribbble"
              ></img>
            </Link>
          </li>
        </ul>
{/* ------------------------------------------------------------------------------------------------------------------- */}
        <ul className="flex md:hidden justify-items-center gap-4 justify-center flex-col">
          <ul className="flex flex-row justify-between gap-4">
            <li>
              <Link to="https://x.com/assistsoftware">
                <img
                  src="/assets/Logos/Social Icon Twitter.svg"
                  alt="logo twitter"
                ></img>
              </Link>
            </li>
            <li>
              <Link to="https://ro.linkedin.com/company/assist-software-srl">
                <img
                  src="/assets/Logos/Social Icon Linkedin.svg"
                  alt="logo linkedin"
                ></img>
              </Link>
            </li>
            <li>
              <Link to="https://www.facebook.com/assist.software.development/?locale=ro_RO">
                <img
                  src="/assets/Logos/Social Icon Facebook.svg"
                  alt="logo facebook"
                ></img>
              </Link>
            </li>
          </ul>
          <ul className="flex flex-row justify-between gap-4">
            <li>
              <Link to="https://github.com/assist-software">
                <img
                  src="/assets/Logos/Social Icon Github.svg"
                  alt="logo github"
                ></img>
              </Link>
            </li>
            <li>
              <Link to="https://www.youtube.com/channel/UCe6M4rao6E30n1msI9KjJJQ">
                <img src="/assets/Logos/Social Icon.svg" alt="logo"></img>
              </Link>
            </li>
            <li>
              <Link to="https://dribbble.com/assist-software-design">
                <img
                  src="/assets/Logos/Social Icon Dribbble.svg"
                  alt="logo dribbble"
                ></img>
              </Link>
            </li>
          </ul>
        </ul>
{/* ------------------------------------------------------------------------------------------------------------------- */}
        <div className="w-28 h-10">
          <NavLink to="/">
            <img
              src="/assets/assist-academy-logo.png"
              alt="Assist Academy Logo"
              className="xs:max-w-[60%] sm:max-w-[70%] md:max-w-[70%] lg:max-w-[80%] xl:max-w-[90%]
                         xs:min-w-[60%] sm:min-w-[70%] md:min-w-[70%] lg:min-w-[80%] xl:min-w-[90%]"
            />
          </NavLink>
        </div>
        <p className="text-gray-400 xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-lg">© All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
