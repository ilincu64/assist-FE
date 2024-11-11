import { HiMiniArrowLeft } from "react-icons/hi2";
import { Link } from "react-router-dom";
import ProfileSection from "../components/profile/ProfileSection";
import CompanySection from "../components/profile/CompanySection";
import { AuthApi } from "../api/AuthApi";
import useSWR from "swr";
import Loader from "../components/common/Loader";

export default function ProfilePage() {
  const { data, isLoading, error } = useSWR("/users", AuthApi.getUser);

  if (isLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        Something went wrong...
      </div>
    );

  return (
    <div className="m-auto w-full px-4 py-4 sm:px-8 sm:py-8 md:px-12">
      <Link to="/" className="mb-6 flex items-center gap-2">
        <HiMiniArrowLeft className="stroke-1 text-2xl" />
        <p className="border-b border-primary font-medium text-primary">
          Go back to Homepage
        </p>
      </Link>

      {data && (
        <div className="mb-5 border-b pb-5">
          <ProfileSection user={data} />
        </div>
      )}

      {data && <CompanySection user={data} />}
    </div>
  );
}
