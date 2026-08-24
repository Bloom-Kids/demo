import Welcome from "../features/PublicPages/Welcome/Welcome";
import AuthWelcome from "../features/auth/pages/AuthWelcome/AuthWelcome";
import CheckEmail from "../features/auth/pages/CheckEmail/CheckEmail";
import EmailVerified from "../features/auth/pages/EmailVerified/EmailVerified";
import ForgotPassword from "../features/auth/pages/ForgotPassword/ForgotPassword";
import Login from "../features/auth/pages/Login/Login";
import PasswordChanged from "../features/auth/pages/PasswordChanged/PasswordChanged";
import Register from "../features/auth/pages/Register/Register";
import ResetPassword from "../features/auth/pages/ResetPassword/ResetPassword";
import VerifyEmail from "../features/auth/pages/VerifyEmail/VerifyEmail";
import { PATHS } from "./paths";

export const routes = [
  {
    path: PATHS.HOME,
    element: <Welcome />,
  },
  {
    path: PATHS.AUTH.WELCOME,
    element: <AuthWelcome />,
  },
  {
    path: PATHS.AUTH.LOGIN,
    element: <Login />,
  },
  {
    path: PATHS.AUTH.REGISTER,
    element: <Register />,
  },
  {
    path: PATHS.AUTH.FORGOT_PASSWORD,
    element: <ForgotPassword />,
  },
  {
    path: PATHS.AUTH.CHECK_EMAIL,
    element: <CheckEmail purpose="password-reset" />,
  },
  {
    path: PATHS.AUTH.RESET_PASSWORD,
    element: <ResetPassword />,
  },
  {
    path: PATHS.AUTH.RESET_PASSWORD_WITH_TOKEN,
    element: <ResetPassword />,
  },
  {
    path: PATHS.AUTH.RESET_PASSWORD_PUBLIC_QUERY,
    element: <ResetPassword />,
  },
  {
    path: PATHS.AUTH.RESET_PASSWORD_PUBLIC,
    element: <ResetPassword />,
  },
  {
    path: PATHS.AUTH.RESET_PASSWORD_LARAVEL,
    element: <ResetPassword />,
  },
  {
    path: PATHS.AUTH.RESET_PASSWORD_API,
    element: <ResetPassword />,
  },
  {
    path: PATHS.AUTH.PASSWORD_CHANGED,
    element: <PasswordChanged />,
  },
  {
    path: PATHS.AUTH.EMAIL_VERIFICATION_SENT,
    element: <CheckEmail purpose="email-verification" />,
  },
  {
    path: PATHS.AUTH.VERIFY_EMAIL,
    element: <VerifyEmail />,
  },
  {
    path: PATHS.AUTH.VERIFY_EMAIL_PUBLIC,
    element: <VerifyEmail />,
  },
  {
    path: PATHS.AUTH.VERIFY_EMAIL_LARAVEL,
    element: <VerifyEmail />,
  },
  {
    path: PATHS.AUTH.VERIFY_EMAIL_API,
    element: <VerifyEmail />,
  },
  {
    path: PATHS.AUTH.EMAIL_VERIFIED,
    element: <EmailVerified />,
  },
  {
    path: PATHS.AUTH.EMAIL_VERIFIED_PUBLIC,
    element: <EmailVerified />,
  },
];
