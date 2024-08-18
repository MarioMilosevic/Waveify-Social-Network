import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


type ToastType = 'success' | 'error' | 'warning';

export const showToast = (text: string, type: ToastType = 'success') => {
  toast[type](text, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });
};