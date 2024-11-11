import { createBrowserRouter, RouterProvider } from "react-router-dom";

import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import FinalStepSignUpForm from "./components/Sign-up/FinalStepSignUpForm";
import ProtectedRoute from "./pages/ProtectedRoute";
import App from "./App";
import ProfilePage from "./pages/ProfilePage";
import FavouritesPage from "./pages/FavouritesPage";
import Portfolio from "./pages/Portfolio";
import SearchPage from "./pages/SearchPage";
import FirstStepSignUpForm from "./components/Sign-up/FirstStepSignUpForm";
import AuctionPage from "./pages/AuctionPage";
import AddAuctionPage from "./pages/AddAuctionPage";
import EditAuctionPage from "./pages/EditAuctionPage";
import AuthLayout from "./pages/AuthLayout";
import UpcommingPage from "./pages/UpcommingPage";
import AdminPage from "./pages/AdminPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <App /> },
      { path: "/profile", element: <ProfilePage /> },
      { path: "/favourites", element: <FavouritesPage /> },
      { path: "/search", element: <SearchPage /> },
      {
        path: "/portfolio",
        element: <Portfolio />,
      },
      {
        path: "/addAuction",
        element: <AddAuctionPage />,
      },
      {
        path: "/editAuction/:id",
        element: <EditAuctionPage />,
      },
      {
        path: "/auctions/:id",
        element: <AuctionPage />,
      },
      {
        path: "/upcomming",
        element: <UpcommingPage />,
      },
      {
        path: "/admin",
        element: <AdminPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/signup",
        element: <SignUpPage />,
        children: [
          {
            index: true,
            element: <FirstStepSignUpForm />,
          },
          {
            path: "step2",
            element: <FinalStepSignUpForm />,
          },
        ],
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/auth/forgotPassword",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/auth/resetPassword",
        element: <ResetPasswordPage />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
