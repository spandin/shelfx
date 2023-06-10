import { Ring } from '@uiball/loaders';

export function LoadingButton(props: any) {
  return (
    <button disabled={props.disabled ? false : true}>
      {props.isLoading ? <Ring size={30} color="#f0f2ff" /> : props.text}
    </button>

    // Вариант для скрытия пока не заполнены input`ы
    // <div>
    // {
    // props.disabled ?
    //     <button>
    //     { props.isLoading ? <Orbit size={30} color="#f0f2ff" /> : props.text }
    //     </button>
    //     : true
    // }
    // </div>
  );
}
