import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGoogle,  FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import termsConfig from "../config/termsConfig";

const AuthLayout = ({ children }) => (
  <div className="flex h-screen w-full items-center justify-center bg-base-200 p-6">
    <div className="w-full max-w-lg md:max-w-3xl rounded-box bg-white shadow-xl flex flex-col md:flex-row md:divide-x">
      <div className="hidden md:flex md:w-1/2 items-center justify-center p-4 bg-primary rounded-l-box">
        <div className="text-white text-2xl font-bold">Illustration Here</div>
      </div>
      <div className="w-full md:w-1/2 p-8">{children}</div>
    </div>
  </div>
);

const AuthButton = ({ text, disabled = false }) => (
  <button className={`btn btn-primary h-10 w-full ${disabled ? "btn-disabled" : ""}`} disabled={disabled}>
    {text}
  </button>
);

const OAuthButton = ({ text }) => (
  <button className="btn btn-outline btn-error w-full flex items-center justify-center">
    <FaGoogle className="mr-2" /> {text} with Google
  </button>
);

const InputField = ({ type, label, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleValidation = (e) => {
    setIsValid(e.target.checkValidity());
    onChange(e);
  };

  return (
    <div className="form-control w-full">
      <fieldset className="fieldset px-1">
        <legend className="fieldset-legend px-2">{label}</legend>
        <label
          className={`input input-ghost border-0 border-b-2 rounded-none px-0 flex items-center ${
            !isValid ? "border-error" : "border-gray-300"
          } focus-within:border-primary`}
        >
          <input
            type={type === "password" && showPassword ? "text" : type}
            placeholder={placeholder}
            value={value}
            onChange={handleValidation}
            className="grow text-gray-700 focus:outline-none focus:ring-0 text-caption"
            required
          />
          {type === "password" && (
            <button
              type="button"
              className="opacity-50 absolute right-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </button>
          )}
        </label>
        {!isValid && (
          <div className="fieldset-label text-error pl-1.5">
            {type === "email" ? "Enter a valid email address" : "Invalid input"}
          </div>
        )}
      </fieldset>
    </div>
  );
};

const FindPassword = () => (
  <AuthLayout>
    <div className="space-y-5">
      <h2 className="text-2xl font-bold text-center">Find Password</h2>
      <InputField type="email" label="Email" placeholder="Enter your email" />
      <AuthButton text="Send reset link" />
      <div className="text-center">
        <Link to="/" className="text-primary text-overline">Back to Sign in</Link>
      </div>
    </div>
  </AuthLayout>
);

const TermsModal = ({ isOpen, onClose, onAccept }) => {
  const [checkedItems, setCheckedItems] = useState({});

  const handleCheckboxChange = (id) => {
    setCheckedItems({ ...checkedItems, [id]: !checkedItems[id] });
  };

  const allChecked = Object.keys(termsConfig).every((key) => checkedItems[key]);

  return (
    <div className={`modal ${isOpen ? "modal-open" : ""}`}> 
      <div className="modal-box p-8 max-h-[80vh] flex flex-col overflow-hidden">
        <h2 className="text-lg font-semibold">Terms and Conditions</h2>
        <div className="flex-grow mt-4 space-y-4 overflow-y-auto p-4 bg-base-200/30 rounded-lg">
          {Object.entries(termsConfig).map(([key, value]) => (
            <div key={key} className="">
              <fieldset class="fieldset">
                <legend class="fieldset-legend text-overline">{value.title}</legend>
                <div className="h-auto max-h-24 min-h-20 overflow-y-auto p-3 bg-base-200">
                  <p className="text-neutral/80 text-details">{value.content}</p>
                </div>
                <label class="fieldset-label text-neutral">
                <input
                  type="checkbox"
                  checked={checkedItems[key] || false}
                  onChange={() => handleCheckboxChange(key)}
                  className="checkbox checkbox-sm mr-1"
                />
                 {value.label}
                </label>
              </fieldset>
            </div>
          ))}
        </div>
        <div className="modal-action flex justify-between w-full">
          <button className="btn btn-outline" onClick={() => onClose(false)}>
            Cancel
          </button>
          <button className={`btn btn-primary ${allChecked ? "" : "btn-disabled"}`} disabled={!allChecked} onClick={() => onAccept(true)}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

const AuthForm = ({ isSignUp }) => {
  const [showModal, setShowModal] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  return (
    <>
    <AuthLayout>
      <div className="px-2">
        <h2 className="text-heading text-center font-extrabold">{isSignUp ? "Sign Up" : "Sign In"}</h2>
        <InputField type="email" label="Email" placeholder="example.email@gmail.com" />
        <InputField type="password" label="Password" placeholder="Enter at least 8+ characters" />
        {isSignUp && <InputField type="password" label="Confirm Password" placeholder="Confirm your password" />}
        {isSignUp ? (
          <label className="flex items-center justify-between px-1 my-3.5">
            <label className="fieldset-label text-primary text-details md:text-overline">
              <input type="checkbox" checked={isTermsChecked} onChange={() => setShowModal(true)} className="checkbox mr-2 cursor-pointer" />
              <button className="text-primary text-overline" onClick={() => setShowModal(true)}>Agree to Terms and Conditions</button>
            </label>
          </label>
        ) : (
          <div className="flex items-center justify-between px-1 my-3.5">
            <label className="fieldset-label text-primary text-details md:text-overline">
              <input type="checkbox" id="remember" className="checkbox checkbox-sm pb-0.5" /> Remember Me
            </label>
            <Link to="/forgot-password" className="text-primary text-details md:text-overline">Forgot password?</Link>
          </div>
        )}
        <AuthButton text={isSignUp ? "Sign up" : "Sign in"} disabled={isSignUp && !isTermsChecked} />
        <div className="divider text-overline">OR</div>
        <OAuthButton text={isSignUp ? "Sign up" : "Sign in"} />
      </div>
      {isSignUp && <TermsModal isOpen={showModal} onClose={() => setShowModal(false)} onAccept={() => { setIsTermsChecked(true); setShowModal(false); }} />}
    </AuthLayout>
    </>
  );
};

export const SignIn = () => <AuthForm isSignUp={false} />;
export const SignUp = () => <AuthForm isSignUp={true} />;
export const ForgotPassword = () => <FindPassword />;