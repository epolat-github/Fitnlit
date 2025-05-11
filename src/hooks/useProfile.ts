import { useAppSelector } from "./useAppSelector";
import { selectProfile } from "../slices/authSlice";
import { Profile } from "../types/user.type";

const useProfile = () => {
  const profile = useAppSelector(selectProfile);

  return profile as Profile; // this will be called and used only if the user is logged in. won't be null ever, if this hook is called
};

export default useProfile;
