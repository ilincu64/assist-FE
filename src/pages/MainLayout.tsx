import { Outlet, useLocation } from "react-router";
import { acceptedRoutesForAIChat } from "../utils/acceptedRoutesForAIChat";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { ScrollRestoration } from "react-router-dom";

import AiChatContainer from "../components/AIChat/AiChatContainer";
import Footer from "../components/Footer";

import { useTokenStore } from "../store/tokenStore";
import { useLogout } from "../hooks/useLogout";
import Header from "../components/header/Header";

const MainLayout = () => {
  const location = useLocation();
  const aiChatBoxIsShown = acceptedRoutesForAIChat.includes(location.pathname);
  const token = useTokenStore((state) => state.token);
  const { logout } = useLogout();

  useEffect(() => {
    const jwt = jwtDecode(token);
    const userExpDate = jwt.exp;

    if (!userExpDate) return;

    if (Date.now() >= userExpDate * 1000) {
      logout();
    }
  }, [token, logout]);

  return (
    <div className="flex min-h-screen flex-col bg-bgWhite">
      <Header />

      <main className="relative flex flex-1 flex-col">
        <div className="m-auto flex w-full max-w-[1280px] flex-1">
          <Outlet />
          {aiChatBoxIsShown && <AiChatContainer />}
        </div>
      </main>

      <Footer />

      <ScrollRestoration />
    </div>
  );
};

export default MainLayout;
