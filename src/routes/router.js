import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../components/ErrorPage";
import LoginForm from "../components/auth/LoginForm";
import RegisterPage from "../components/auth/RegisterPage";
import { Dashboard } from "../pages/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
    errorElement: <ErrorPage errorCode={404} errorMessage={"Oops !"} />,
  },
  {
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashBoard",
    element: <Dashboard />,
  },
]);
