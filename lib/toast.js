import { toast } from "react-toastify";

const settings = {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
};

const toastAuthErr = () => {
  toast.info("Войдите в аккаунт", settings);
};

const toastSuccess = () => {
  toast.success("Успех", settings);
};

const toastError = () => {
  toast.success("Ошибка", settings);
};

const toastWarn = () => {
  toast.warn("Внимание", settings);
};

const toastInfo = () => {
  toast.info("Инфо", settings);
};

export { toastAuthErr };
