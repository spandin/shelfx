import { Ring } from "@uiball/loaders";

export const LoadingButton = ({ disabled, isLoading, onClick, text }: any) => {
  const theme = window.matchMedia("(prefers-color-scheme: dark)");

  return (
    <button onClick={onClick} disabled={disabled ? false : true}>
      {isLoading ? (
        <Ring size={30} color={theme.matches ? "#12131e" : "#f8fafe"} />
      ) : (
        text
      )}
    </button>
  );
};
