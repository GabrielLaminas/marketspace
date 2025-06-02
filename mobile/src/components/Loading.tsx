import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <Center className="flex-1 bg-base-600">
      <Spinner size="large" color="#647AC7" />
    </Center>
  );
}
