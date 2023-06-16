import { Ring } from "@uiball/loaders";

export const LoadingButton = ({ disabled, isLoading, text }: any) => {
  return (
    <button disabled={disabled ? false : true}>
      {isLoading ? <Ring size={30} color="#f0f2ff" /> : text}
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
};
