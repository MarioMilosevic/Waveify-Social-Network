import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const success = () => toast.success("Comment successfully removed", {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
});
