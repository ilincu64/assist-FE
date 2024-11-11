import AuthFormHeader from "../components/auth/common/AuthFormHeader";
import LoginForm from "../components/auth/login/LoginForm";
import Page from "./Page";

export default function LoginPage() {
  return (
    <Page>
      <div className="mb-12">
        <AuthFormHeader
          introduction="Great to have you back!"
          message="Ready for another round of bidding?"
        />
      </div>
      <LoginForm />
    </Page>
  );
}
