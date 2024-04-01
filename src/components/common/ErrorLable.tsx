import { ReactNode } from "react";
import { Label } from "../ui/label";

export const ErrorMsg = ({ children }: { children: ReactNode }) => {
  return <Label className="text-red-500">{children}</Label>;
};
