import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const failure = () =>
  toast.error("Comment removed !", {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });

export const success = () => toast.success("🦄 Wow so easy!", {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
});
