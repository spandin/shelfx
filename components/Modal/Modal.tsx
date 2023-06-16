import "./index.scss";

export const Modal = ({ active, setActive, children }: any) => {
  return (
    <div
      className={active ? "Modal active" : "Modal"}
      onClick={() => setActive(false)}
    >
      <div
        className={active ? "Modal__content active" : "Modal__content"}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
