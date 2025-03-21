import React from "react";

// 🔹 Available button styles
const buttonStyles = {
  solid: {
    primary: "bg-primary text-white hover:bg-primary-600 active:bg-primary-700 shadow-xl shadow-primary/20",
    secondary: "bg-secondary text-white hover:bg-secondary-600 active:bg-secondary-700",
    neutral: "bg-neutral-300 text-neutral-700 hover:bg-neutral-400 active:bg-neutral-500",
    danger: "bg-danger text-white hover:bg-danger-600 active:bg-danger-400",
  },
  outline: {
    primary: "bg-white border border-primary text-primary hover:opacity-40 hover:bg-inset-shadow active:bg-primary-200",
    secondary: "bg-white border border-secondary text-secondary hover:opacity-40 hover:bg-secondary-200 active:bg-secondary-200",
    neutral: "bg-white border border-neutral-300 text-neutral-500 hover:border-neutral-500 hover:bg-neutral-200 active:bg-neutral-300",
    danger: "border border-danger text-danger hover:bg-danger-100 active:bg-danger-200",
  },
};

// 🔹 Button size presets
const buttonSizes = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-5 py-3 text-lg",
  half: "p-2 w-[49%] text-xs",
  flat: "p-1 w-full text-xs",
  block: "p-4.5 w-full text-body",
};

// 📌 Base Button component
const Button = ({
  text,
  variant = "primary",
  size = "block",
  onClick,
  disabled = false,
  isOutline = false,
  icon = null,
}) => {
  const styleType = isOutline ? "outline" : "solid";
  const variantClasses = buttonStyles[styleType][variant] || buttonStyles.solid.primary;
  const sizeClasses = buttonSizes[size] || buttonSizes.md;
  const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      className={`btn ${sizeClasses} ${variantClasses} rounded-lg font-semibold transition-all duration-300 ease-in-out flex items-center justify-center gap-x-2 ${disabledClasses}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </button>
  );
};

// 📌 Solid-style button component
export const SolidButton = (props) => <Button {...props} isOutline={false} />;

// 📌 Outline-style button component
export const OutlineButton = (props) => <Button {...props} isOutline={true} />;
