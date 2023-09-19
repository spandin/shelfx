import { toast } from "react-toastify";

const settings = {
  position: "bottom-center",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  progress: undefined,
  theme: "prefers-color-scheme",
};

const toastAuthErr = () => {
  toast.error("Войдите в аккаунт", settings);
};

const toastSuccess = () => {
  toast.success("Успех", settings);
};

const toastError = () => {
  toast.error("Ошибка", settings);
};

const toastWarn = () => {
  toast.warn("Внимание", settings);
};

const toastInfo = () => {
  toast.info("Инфо", settings);
};

export { toastAuthErr, settings };
