import { useTokenStore } from "../store/tokenStore";

export function useLogout() {
  const removeToken = useTokenStore((state) => state.removeToken);

  function logout() {
    removeToken();
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
  }

  return { logout };
}
