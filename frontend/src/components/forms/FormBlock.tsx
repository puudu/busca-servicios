interface Props {
  title: string;
  children: JSX.Element | JSX.Element[];
}

export const FormBlock = ({ title, children }: Props) => {
  return (
    <div className="m-3">
      <h3>{title}</h3>
      {children}
    </div>
  );
};
