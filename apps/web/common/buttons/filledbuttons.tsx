import React from "react";
interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  // icon?: any;
  text?: React.ReactNode;
  onClick?: any;
  disabled?: boolean;
  className?: string;
  loading?: boolean;
}
export default function Button(props: ButtonProps) {
  const { text, onClick, type, disabled, className, loading } = props;
  return (
    <button
      className={`flex h-8 items-center justify-center gap-2 rounded-md bg-primary-blue px-2.5 text-sm text-white transition duration-300 hover:bg-hover-blue ${
        className || ""
      } ${disabled ? "cursor-not-allowed opacity-50" : ""}`}
      disabled={disabled}
      type={type ? type : "button"}
      onClick={onClick ? () => onClick() : () => {}}
    >
      {loading ? (
        <svg className="animate-spin h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
        </svg>
      ):<>{text}</>}
    </button>
  );
}
