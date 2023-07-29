import "./_index.scss";

export const IcButton = ({ onClick, className, icon, text }) => {
  return (
    <button className={className} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
};
