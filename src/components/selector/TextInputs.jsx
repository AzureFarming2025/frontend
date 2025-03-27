import React, { useState } from "react";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";

// 🔹 LinedTextInput: A simple input field with a bottom border (used for all text inputs)
export const LinedTextInput = ({ 
  type, placeholder, value, onChange, isValid = true, showPassword = false, onTogglePassword 
}) => (
  <div className="relative w-full">
    <input
      type={type === "password" && showPassword ? "text" : type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full text-gray-700 focus:outline-none text-xs input input-ghost border-0 border-b-2 rounded-none ${
        isValid ? "border-gray-300" : "border-error"
      } focus-within:border-primary transition-all duration-300`}
      required
    />
    {/* Password toggle button */}
    {type === "password" && onTogglePassword && (
      <button
        type="button"
        className="absolute right-3 bottom-3 text-gray-500 opacity-40 hover:text-gray-700"
        onClick={onTogglePassword}
      >
        {showPassword ? <FaRegEyeSlash size={15} /> : <FaRegEye size={15} />}
      </button>
    )}
  </div>
);

// 🔹 AuthTextInput: Wrapper for LinedTextInput that handles validation and password toggle
export const AuthTextInput = ({ label, type, placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);

  // Validate input
  const handleValidation = (e) => {
    setIsValid(e.target.checkValidity());
    onChange(e);
  };

  return (
    <div className="form-control w-full">
      <fieldset className="fieldset py-0">
        <legend className="fieldset-legend">{label}</legend>
        <LinedTextInput
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={handleValidation}
          isValid={isValid}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
        />
        {/* Validation message */}
        {!isValid && (
          <div className="fieldset-label text-error pl-1.5">
            {type === "email" ? "Enter a valid email address" : "Invalid input"}
          </div>
        )}
      </fieldset>
    </div>
  );
};
