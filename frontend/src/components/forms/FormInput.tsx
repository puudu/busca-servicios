import { ChangeEventHandler } from "react";

type Props = {
  label: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  size: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isRequired: boolean;
};

const FormInput = ({
  label,
  type,
  name,
  placeholder,
  value,
  size,
  onChange,
  isRequired,
}: Props) => {
  return (
    <div className="mb-1.5 flex justify-between">
      <label htmlFor={name} className="text-slate-400 m-2">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        size={size}
        onChange={onChange}
        required={isRequired}
        className="ml-2 rounded-md bg-slate-500 px-2 text-slate-200"
      />
    </div>
  );
};

export default FormInput;
