import { ChangeEventHandler } from "react";

type Props = {
  label: string;
  name: string;
  checked: boolean;
  isRequired: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

export const CheckboxInput = ({
  label,
  name,
  isRequired,
  checked,
  onChange,
}: Props) => {
  return (
    <>
      <input
        type="checkbox"
        name={name}
        id={name}
        required={isRequired}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name}>{" " + label}</label>
    </>
  );
};
