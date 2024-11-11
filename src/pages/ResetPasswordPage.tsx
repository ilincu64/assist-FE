import AuthFormHeader from "../components/auth/common/AuthFormHeader";
import ResetPasswordForm from "../components/auth/resetPassword/ResetPasswordForm";
import Page from "./Page";

export default function ResetPasswordPage() {
  return (
    <Page>
      <div className="mb-12">
        <AuthFormHeader
          introduction="Reset your password"
          message="Create a new password to regain access to your account."
        />
      </div>
      <ResetPasswordForm />
    </Page>
  );
}
