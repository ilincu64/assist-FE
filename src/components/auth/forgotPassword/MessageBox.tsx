import { Button } from "../../ui/button";
import BackToLoginLink from "../common/BackToLoginLink";

type Props = {
  sendRecoveryLink: () => void;
};

export default function MessageBox({ sendRecoveryLink }: Props) {
  return (
    <div className="h-full flex flex-col">
      <p className="mb-6 text-base">
        We have sent you a recovery link to your email. Follow the instructions
        to regain access.
      </p>

      <p className="text-sm mb-2">Haven’t received an email?</p>

      <div className="flex gap-2">
        <Button
          variant="outline"
          className="w-full text-primary"
          onClick={sendRecoveryLink}
        >
          Send again
        </Button>
        <Button className="w-full text-white bg-primary">Contact us</Button>
      </div>

      <BackToLoginLink />
    </div>
  );
}
