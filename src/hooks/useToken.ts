import { useAppSelector } from "./useAppSelector";
import { selectAccessToken } from "../slices/authSlice";

const useToken = () => {
  const token = useAppSelector(selectAccessToken);

  return token;
};

export default useToken;
