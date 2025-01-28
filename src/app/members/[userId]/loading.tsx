import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center my-auto">
      <Spinner color="default" label="Loading..." labelColor="foreground" />
    </div>
  );
}
