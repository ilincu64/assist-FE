import { NavLink } from "react-router-dom";

export default function BackToLoginLink() {
  return (
    <NavLink
      to="/auth/login"
      className="mr-auto mt-auto border-b border-primary text-base font-medium text-primary"
    >
      Back to Login
    </NavLink>
  );
}
