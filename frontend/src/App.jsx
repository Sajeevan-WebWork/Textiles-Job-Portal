/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import FloatingShape from "./components/floatingshape";
import { Navigate, replace, Route, Routes } from 'react-router-dom'
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";
import Homepage from "./Pages/Homepage";
import LoadingSpinner from "./components/LoadingSpinner";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordpage";

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (isAuthenticated && user.isVerified) {
    return <Navigate to={'/'} replace />
  }

  return children
}


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />;
  }

  if (!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }

  return children;
};

function App() {

  const { isCheckingAuth, checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <LoadingSpinner />;
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative ">
        <FloatingShape color="bg-green-500" size="w-64 h-64" top="-5%" left="10%" delay={0}></FloatingShape>
        <FloatingShape color="bg-emerald-500" size="w-48 h-48" top="20%" left="60%" delay={2}></FloatingShape>
        <FloatingShape color="bg-lime-500" size="w-32 h-32" top="40%" left="10%" delay={2}></FloatingShape>
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          } />

          <Route path="/home" element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          } />


          <Route path="/signup" element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          } />


          <Route path="/login" element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          } />


          <Route path="/verify-email" element={<EmailVerificationPage />} />

          <Route path="/forgot-password" element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          } />

          <Route path="/reset-password/:token" element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }></Route>
          <Route path="*" element={
            <Navigate to={'/'} replace />
          } />

        </Routes>

        <Toaster />
      </div>
    </>
  )
}

export default App
