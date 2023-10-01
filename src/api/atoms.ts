import { atom } from "jotai";

// Default values
import { axiosErrorDefault, axiosSuccessDefault } from "./jotaiDefaultValues";

export const ATOMS = {
  axiosError: atom(axiosErrorDefault),
  axiosSuccess: atom(axiosSuccessDefault),
};
