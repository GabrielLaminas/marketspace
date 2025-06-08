import { Center } from "@/components/ui/center";
import { Spinner } from "@/components/ui/spinner";

type Props = {
  bg?: string;
}

export default function Loading({ bg = "base-600" }: Props) {
  return (
    <Center className={`flex-1 bg-${bg}`}>
      <Spinner size="large" color="#647AC7" />
    </Center>
  );
}
