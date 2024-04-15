interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const FormBlock = ({ title, children }: Props) => {
  return (
    <div className="m-3">
      <h3 className="text-lg text-slate-200">{title}</h3>
      {children}
    </div>
  );
};
