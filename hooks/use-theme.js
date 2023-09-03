import { useSelector } from "react-redux";

export function useTheme() {
  const { theme } = useSelector((state) => state.theme);

  return {
    theme
  };
}
