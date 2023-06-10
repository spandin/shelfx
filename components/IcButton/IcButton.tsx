export function IcButton(props: any) {
  return (
    <button className={props.className} onClick={props.onclick}>
      {props.icon}
      {props.text}
    </button>
  );
}
