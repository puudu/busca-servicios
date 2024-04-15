import { ChangeEventHandler } from "react";

type Props = {
  label: string;
  name: string;
  checked: boolean;
  isRequired: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  className: string;
};

export const CheckboxInput = ({
  label,
  name,
  isRequired,
  checked,
  onChange,
  className
}: Props) => {
  return (
    <div className={className}>
      <input
        type="checkbox"
        name={name}
        id={name}
        required={isRequired}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name} className="text-slate-400">{" " + label}</label>
    </div>
  );
};
