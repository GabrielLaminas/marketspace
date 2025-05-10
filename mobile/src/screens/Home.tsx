import React from "react";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";

export default function Home() {
  return (
    <Center className="flex-1">
      <Heading className="text-5xl">My App</Heading>
      <Text className="font-bold text-black text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
        recusandae!
      </Text>
    </Center>
  );
}
