import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ToastContainer } from "react-toastify";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <NextUIProvider>
      {children}
      <ToastContainer position="bottom-right" />
    </NextUIProvider>
  );
}
