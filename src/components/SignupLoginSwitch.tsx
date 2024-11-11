import { Link } from "react-router-dom";

interface SignupLoginSwitchProps {
  page: string;
}
const SignupLoginSwitch = ({ page }: SignupLoginSwitchProps) => {
  return (
    <div className="flex flex-col items-center gap-2 text-base text-primary sm:flex-row">
      <p>
        {page === "signup"
          ? "Already have an account?"
          : "Don't have an account?"}
      </p>
      <Link
        className="border-b border-primary font-medium"
        to={page === "signup" ? "/auth/login" : "/auth/signup"}
      >
        {page === "signup" ? "Login" : "Sign up"}
      </Link>
    </div>
  );
};

export default SignupLoginSwitch;
