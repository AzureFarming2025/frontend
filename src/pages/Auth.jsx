import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import termsConfig from "../config/termsConfig"; // 규정 파일 import

const AuthLayout = ({ children }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-base-200 p-6">
      <div className="w-full max-w-lg md:max-w-3xl bg-white rounded-lg shadow-xl flex flex-col md:flex-row md:divide-x">
        <div className="hidden md:flex md:w-1/2 items-center justify-center p-4 bg-primary rounded-l-lg">
          <div className="text-white text-2xl font-bold">Illustration Here</div>
        </div>
        <div className="w-full md:w-1/2 p-8">{children}</div>
      </div>
    </div>
  );
};

const AuthButton = ({ text, disabled = false }) => {
  return (
    <button className={`btn btn-primary w-full ${disabled ? "btn-disabled" : ""}`} disabled={disabled}>
      {text}
    </button>
  );
};

const OAuthButton = () => {
  return (
    <button className="btn btn-outline btn-error w-full flex items-center justify-center">
      <FaGoogle className="mr-2" /> Sign in with Google
    </button>
  );
};


export const SignIn = () => {
  return (
    <AuthLayout>
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <div>
          <label className="block text-gray-600">Email</label>
          <InputField type="email" placeholder="example.email@gmail.com" />
        </div>
        <div>
          <label className="block text-gray-600">Password</label>
          <InputField type="password" placeholder="Enter at least 8+ characters" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember" className="text-gray-600">Remember me</label>
          </div>
          <Link to="/forgot-password" className="text-primary-500">Forgot password?</Link>
        </div>
        <AuthButton text="Sign in" />
        <div className="flex items-center justify-center">
          <span className="text-gray-400">OR</span>
        </div>
        <OAuthButton />
        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <Link to="/signup" className="text-primary-500">Sign up</Link>
        </div>
      </div>
    </AuthLayout>
  );
};

export const ForgotPassword = () => {
  return (
    <AuthLayout>
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <div>
          <label className="block text-gray-600">Email</label>
          <InputField type="email" placeholder="Enter your email" />
        </div>
        <AuthButton text="Send reset link" />
        <div className="text-center">
          <Link to="/" className="text-primary-500">Back to Sign in</Link>
        </div>
      </div>
    </AuthLayout>
  );
};

const InputField = ({ type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="relative w-full">
      <input
        type={showPassword && type === "password" ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input input-bordered w-full"
      />
      {type === "password" && (
        <button
          type="button"
          className="absolute right-3 top-3 text-gray-500"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

const TermsModal = ({ isOpen, onClose, onAccept }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (id) => {
    setCheckedItems({ ...checkedItems, [id]: !checkedItems[id] });
  };

  const allChecked = Object.keys(termsConfig).every((key) => checkedItems[key]);

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}> 
      <div className="modal-box max-h-[80vh] flex flex-col overflow-hidden">
        <h2 className="text-xl font-bold">Terms and Conditions</h2>
        <div className="flex-grow mt-4 space-y-4 overflow-y-auto px-4">
          {Object.entries(termsConfig).map(([key, value]) => (
            <div key={key} className="py-2">
              <h3 className="text-md font-semibold mb-1">{value.title}</h3>
              <div className="h-24 overflow-y-auto p-2 bg-gray-50 border border-gray-300 rounded-md">
                <p className="text-gray-600 text-sm">{value.content}</p>
              </div>
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  checked={checkedItems[key] || false}
                  onChange={() => handleCheckboxChange(key)}
                  className="checkbox mr-2"
                />
                <label className="text-gray-700 text-sm">{value.label}</label>
              </div>
            </div>
          ))}
        </div>
        <div className="modal-action flex justify-between w-full px-4">
          <button className="btn btn-sm btn-soft" onClick={() => onClose(false)}>
            Cancel
          </button>
          <button className={`btn btn-sm btn-soft btn-primary ${allChecked ? "" : "btn-disabled"}`} disabled={!allChecked} onClick={() => onAccept(true)}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export const SignUp = () => {
  const [showModal, setShowModal] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  return (
    <AuthLayout>
      <div className="space-y-5">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        <InputField type="email" placeholder="example.email@gmail.com" />
        <InputField type="password" placeholder="Enter at least 8+ characters" />
        <InputField type="password" placeholder="Confirm your password" />
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isTermsChecked}
            onChange={() => setShowModal(true)}
            className="checkbox mr-2 cursor-pointer"
          />
          <button className="text-primary underline" onClick={() => setShowModal(true)}>Agree to Terms and Conditions</button>
        </div>
        <AuthButton text="Sign up" disabled={!isTermsChecked} />
        <div className="text-center">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/" className="text-primary">Sign in</Link>
        </div>
      </div>
      <TermsModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAccept={() => {
          setIsTermsChecked(true);
          setShowModal(false);
        }}
      />
    </AuthLayout>
  );
};