import { Center } from "@/components/center";
import { Spinner } from "@nextui-org/react";

export default function Loading() {
  return (
    <Center>
      <Spinner color="default" label="Loading..." labelColor="foreground" />
    </Center>
  );
}
