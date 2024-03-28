import { ChangeEventHandler } from "react";

type Props = {
  label: string;
  name: string;
  isRequired: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const CheckboxInput = ({ label, name, isRequired, onChange }: Props) => {
  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={name}
        required={isRequired}
        onChange={onChange}
      />
      <label htmlFor={name}>{" " + label}</label>
    </>
  );
};
