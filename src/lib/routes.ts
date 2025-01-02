import { urls } from "./urls";

export const publicRoutes = [urls.home];

export const authRoutes = [
  urls.signIn,
  urls.signUp,
  urls.signUpSuccess,
  urls.verifyEmail,
  urls.forgotPassword,
  urls.resetPassword,
];
