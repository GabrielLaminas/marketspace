import React from "react";
import { FlatList } from "react-native";
import { Center } from "@/components/ui/center";
import { Text } from "@/components/ui/text";
import { Heading } from "@/components/ui/heading";
import { Box } from "@/components/ui/box";

import HomeHeader from "@components/HomeHeader";
import Sell from "@components/Sell";
import ProductFilter from "@components/ProductFilter";
import CardItem from "@components/CardItem";

const DATA = [
  {
    id: 1,
    kind: "novo",
    name: "Bicicleta",
    preco: 559.50
  },
  {
    id: 2,
    kind: "usada",
    name: "Bicicleta Eletrica",
    preco: 1559.50
  }
]


export default function Home() {
  return (
    <Box className="flex-1 px-6 pt-16">
      <HomeHeader />

      <Sell />

      <ProductFilter />

    </Box>
  );
}
