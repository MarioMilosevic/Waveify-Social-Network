import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export const showToast = (text:string) => toast.success(`${text}`, {
//   position: "top-center",
//   autoClose: 5000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: true,
//   draggable: true,
//   progress: undefined,
//   theme: "dark",
// });


// Define a type for the toast type (success, error, etc.)
type ToastType = 'success' | 'error' | 'info' | 'warning';

export const showToast = (text: string, type: ToastType = 'success') => {
  // Dynamically call the appropriate toast function based on the type
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