import { MouseEventHandler } from "react";

type Props = {
  nextButton: boolean;
  previusButton: boolean;
  nextFn: MouseEventHandler<HTMLButtonElement>;
  previusFn: MouseEventHandler<HTMLButtonElement>;
};

const Pagination = ({
  nextButton,
  previusButton,
  nextFn,
  previusFn,
}: Props) => {
  return (
    <div>
      {previusButton || <button onClick={previusFn}>⬅Anterior</button>}
      {nextButton || <button onClick={nextFn}>Siguiente➡</button>}
    </div>
  );
};

export default Pagination;
