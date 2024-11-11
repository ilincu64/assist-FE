import { Outlet } from "react-router";
import AuthFormHeader from "../components/auth/common/AuthFormHeader";
import Page from "./Page";

const SignUpPage = () => {
  // test
  return (
    <Page>
      <div className="mb-12">
        <AuthFormHeader
          introduction="First time here?"
          message="Dive into exciting adventures and discover great deals."
        />
      </div>
      <Outlet />
    </Page>
  );
};

export default SignUpPage;
