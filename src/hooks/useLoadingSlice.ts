import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

export const useLoadingSlice = () => {
  const loading = useSelector((state: RootState) => state.loading);
  return loading;
};
