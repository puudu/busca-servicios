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
    <>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        size={size}
        onChange={onChange}
        required={isRequired ? true : false}
      />
      <br />
    </>
  );
};

export default FormInput;
