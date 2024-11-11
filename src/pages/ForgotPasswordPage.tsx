import { useState } from "react";

import AuthFormHeader from "../components/auth/common/AuthFormHeader";
import ForgotPasswordForm from "../components/auth/forgotPassword/ForgotPasswordForm";
import Page from "./Page";

import { AuthApi } from "../api/AuthApi";

export default function ForgotPasswordPage() {
  const [isRecoveryLinkSent, setIsRecoveryLinkSent] = useState<boolean>(false);

  function sendRecoveryLink(email: string) {
    console.log(email);
    AuthApi.forgotPassword(email).then(() => console.log("Sent"));
  }

  return (
    <Page>
      <div className="mb-12">
        <AuthFormHeader
          introduction="Forgot your password?"
          message="No worries! Let’s get you a new one."
        />
      </div>

      <ForgotPasswordForm
        isRecoveryLinkSent={isRecoveryLinkSent}
        sendRecoveryLink={sendRecoveryLink}
      />
    </Page>
  );
}
