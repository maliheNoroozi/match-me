import { ReactNode } from "react";

export const Center = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-full h-full my-auto p-4 overflow-auto">
      {children}
    </div>
  );
};
