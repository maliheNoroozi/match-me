import { ReactNode } from "react";

export const CenteredContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center p-4 container">
      {children}
    </div>
  );
};
