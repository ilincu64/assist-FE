import LoginPage from "./LoginPage";
import MainLayout from "./MainLayout";

import { useTokenStore } from "../store/tokenStore";

export default function ProtectedRoute() {
  const token = useTokenStore((state) => state.token);

  return token ? <MainLayout /> : <LoginPage />;
  // return <MainLayout />;
}
