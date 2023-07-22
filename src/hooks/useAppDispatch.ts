import { useDispatch } from "react-redux";

import { AppDispatch } from "../utils/store";

/**
 * For typing purposes
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
