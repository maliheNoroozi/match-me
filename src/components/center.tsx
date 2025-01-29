import { ReactNode } from "react";

export const Center = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {children}
    </div>
  );
};
