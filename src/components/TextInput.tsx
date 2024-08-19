import React from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  value?: string;
  placeholder?: string;
}

const TextInput = (props: TextInputProps) => {
  return (
    <div className="w-full">
      <label className="text-p">{props.label}</label>
      <input
        {...props}
        className="placeholder:px-2 placeholder:text-slate-400 w-full outline-none px-4 py-3 rounded-xl border border-slate-300"
      />
    </div>
  );
};

export default TextInput;
