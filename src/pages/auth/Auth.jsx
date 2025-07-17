import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { OutlineButton, SolidButton } from "@components/selector/Buttons";
import { AuthTextInput } from "@components/selector/TextInputs";
import TermsModal from "@components/partials/TermsModal";
import { FaGoogle } from "react-icons/fa";

// 📌 Layout Component
const AuthLayout = ({ children }) => (
  <div className="w-screen h-screen flex md:flex-row overflow-hidden">
    {/* Left Section - Illustration (PC only) */}
    <div className="hidden h-full md:flex md:w-1/2 p-10 items-center justify-center bg-custom-gradient">
      <div className="text-green-700 font-bold text-xl font-poppins">Currently Under Development</div>
    </div>
    {/* Right Section - Form */}
    <div className="w-full h-full md:w-1/2 bg-white flex justify-center">
      <div className="w-full max-w-md p-16 py-20">{children}</div>
    </div>
  </div>
);

// 📌 Authentication Form
const AuthForm = ({ isSignUp }) => {
  const [showModal, setShowModal] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSkipLogin = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <AuthLayout>
        <div className="w-full space-y-4 flex flex-col h-full">
          {/* Sign In / Sign Up Toggle */}
          <div className="flex justify-end items-center -mt-8 mb-12 h-1/5">
            <span className="text-link-caption">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
            </span>
            <Link to={isSignUp ? "/" : "/sign-up"} className="pl-2 text-link-sm">
              {isSignUp ? "Sign in" : "Sign up"}
            </Link>
          </div>
          {/* Title */}
          <h2 className="text-title font-bold text-center mb-6">{isSignUp ? "Create an Account" : "Sign In"}</h2>
          {/* Form Fields */}
          <div className="space-y-3 grow-0">
            <div className="mb-4">
            {isSignUp && (
              <div className="flex gap-4">
                <AuthTextInput type="text" label="Name" placeholder="Enter your name" />
                <AuthTextInput type="text" label="Username" placeholder="Choose a username" />
              </div>
            )}
            <AuthTextInput type="email" label="Email" placeholder="example.email@gmail.com" />
            <AuthTextInput type="password" label="Password" placeholder="Enter at least 8+ characters" />
            </div>
            {/* Terms Agreement */}
            {isSignUp && (
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isTermsChecked}
                  onChange={() => setShowModal(true)}
                  className="checkbox checkbox-sm checkbox-primary opacity-65"
                />
                <button className="text-link" onClick={() => setShowModal(true)}>
                  Agree to Terms and Conditions
                </button>
              </label>
            )}
            {/* Remember Me & Forgot Password */}
            {!isSignUp && (
              <div className="flex justify-between text-sm">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="checkbox checkbox-sm checkbox-warning opacity-70" />
                  <span className="text-link-caption">Remember me</span>
                </label>
                <Link to="/reset-password" className="text-link">Forgot password?</Link>
              </div>
            )}
            <div className="h-0.5"></div>
            {/* Submit Button */}
            <SolidButton text={isSignUp ? "Create Account" : "Sign In"} disabled={isSignUp && !isTermsChecked} />
            {/* Social Login */}
            <div className="divider">OR</div>
            <OutlineButton
             text={`${isSignUp ? "Sign up" : "Sign in"} with Google`}
             icon={<FaGoogle size={12} />} 
            />
            
            {/* Skip Login Button */}
            {!isSignUp && (
              <div className="mt-4 text-center">
                <button
                  onClick={handleSkipLogin}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Skip Login (Demo Mode)
                </button>
              </div>
            )}
          </div>
        </div>
      </AuthLayout>

      {/* Terms Modal */}
      {isSignUp && (
        <TermsModal isOpen={showModal} onClose={() => setShowModal(false)} onAccept={() => { setIsTermsChecked(true); setShowModal(false); }} />
      )}
    </>
  );
};

// 📌 Forgot Password Page
export const ResetPassword = () => (
  <AuthLayout>
    <div className="space-y-5 flex flex-col h-full justify-center items-center">
      <h2 className="text-title text-center">Reset Password</h2>
      <p className="text-caption text-center">
        Enter your email below, and we'll send you a reset link.
      </p>
      <AuthTextInput type="email" label="Email" placeholder="Enter your email" />
      <SolidButton text="Send Link" />
      <div className="text-center">
        <Link to="/" className="text-link">Back to Sign In</Link>
      </div>
    </div>
  </AuthLayout>
);

// 📌 Page Exports
export const SignIn = () => <AuthForm isSignUp={false} />;
export const SignUp = () => <AuthForm isSignUp={true} />;
