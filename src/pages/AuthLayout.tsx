import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";

import Loader from "../components/common/Loader";

import { useTokenStore } from "../store/tokenStore";

export default function AuthLayout() {
  const navigate = useNavigate();
  const token = useTokenStore((state) => state.token);

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  if (token) {
    return (
      <div className="flex h-screen items-center justify-center text-9xl">
        <Loader />
      </div>
    );
  }

  return <Outlet />;
}
