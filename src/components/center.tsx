import { ReactNode } from "react";

export const CenteredContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex items-center justify-center h-[calc(100vh-64px)] w-full p-4 overflow-auto">
      {children}
    </div>
  );
};
