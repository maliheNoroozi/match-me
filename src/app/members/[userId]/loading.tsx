import { Spinner } from "@nextui-org/react";

export default function LoadingPage() {
  return (
    <div className="flex items-center justify-center w-full h-full my-auto p-4 overflow-auto">
      <Spinner color="default" label="Loading..." labelColor="foreground" />
    </div>
  );
}
