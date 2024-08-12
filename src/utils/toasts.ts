import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const removeToast = (text:string) => toast.success(`${text}`, {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
});


