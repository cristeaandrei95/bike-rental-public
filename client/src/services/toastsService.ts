import { toast } from "react-toastify";

export const toastError = (message: string) =>
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
    className: "toastError",
  });

export const toastSuccess = (message: string) =>
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
    className: "toastSuccess",
  });
