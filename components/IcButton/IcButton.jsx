import "./IcButton.scss";

export function IcButton({ onClick, className, icon, text }) {
  return (
    <button className={className} onClick={onClick}>
      {icon}
      {text}
    </button>
  );
}
