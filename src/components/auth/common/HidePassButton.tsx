import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";

type Props = {
  isLoading: boolean;
  isPassHidden: boolean;
  onClick: () => void;
};

export default function HidePassButton({
  isLoading,
  isPassHidden,
  onClick,
}: Props) {
  return (
    <button
      disabled={isLoading}
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      {isPassHidden ? (
        <HiOutlineEye className="absolute bottom-1/2 right-2 translate-y-1/2 stroke-2" />
      ) : (
        <HiOutlineEyeSlash className="absolute bottom-1/2 right-2 translate-y-1/2 stroke-2" />
      )}
    </button>
  );
}
