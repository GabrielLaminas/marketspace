import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { AppRoutesProps } from "@routes/app.routes";

import api from "@services/api";
import { UserProduct } from "@dtos/UserProduct";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";

import CustomSelect from "@components/CustomSelect";
import CardItem from "@components/CardItem";
import Header from "@components/Header";

import { Plus } from "lucide-react-native";

interface DataProps {
  id: number;
  kind: string;
  name: string;
  preco: number;
  uri: string;
  status: "active" | "inactive";
  user: undefined;
}

const DATA: Array<DataProps> = [
  {
    id: 1,
    kind: "novo",
    name: "Fachada de prédio",
    preco: 20069.50,
    uri: "https://admin.mac.com.br/wp-content/uploads/2025/01/Blog-fachada-de-predio-imagem-padrao.webp",
    status: "inactive",
    user: undefined
  },
  {
    id: 2,
    kind: "usada",
    name: "Sandalia rasteirinha",
    preco: 79.50,
    uri: "https://cdn.awsli.com.br/2500x2500/1313/1313400/produto/232523900/img_9175-9ib5kg3xtk.jpeg",
    status: "active",
    user: undefined
  },
  {
    id: 3,
    kind: "novo",
    name: "Bicicleta",
    preco: 559.50,
    uri: "https://static.netshoes.com.br/produtos/bicicleta-aro-29-krw-aluminio-shimano-tz-24-vel-suspensao-freio-a-disco-mountain-bike-ltx-s40/60/CGY-0283-260/CGY-0283-260_zoom1.jpg?ts=1725874935&ims=326x", 
    status: "active",
    user: undefined
  },
  {
    id: 4,
    kind: "novo",
    name: "Casa de Sítio com Varanda",
    preco: 40000.00,
    uri: "https://vgprojetos.com/wp-content/uploads/2024/12/P11-3.png",
    status: "inactive",
    user: undefined
  }
]

type Props = BottomTabScreenProps<AppRoutesProps, "Announcements">;

export default function Announcements({ navigation }: Props) {
  const [products, setProducts] = useState<UserProduct[]>([]);

  function handleNavigationToCreateAnnouncement(){
    navigation.navigate("CreateAnnouncement");
  }

  function handleNavigationToDetailsAnnouncement(id: string){
    navigation.navigate("DetailsAnnouncement", { id });
  }

  async function getAllAnnouncements(){
    try {
      const { data } = await api.get<UserProduct[]>("/users/products");
      setProducts(data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllAnnouncements();
  }, []);

  return (
    <Box className="flex-1 py-[64px] px-[24px]">
      <Box className="mb-[32px]">
        <Header 
          text="Meus anúncios"
          iconRight={Plus}
          iconRighAction={handleNavigationToCreateAnnouncement}
        />
      </Box>

      <HStack className="mb-[20px] justify-between items-center">
        <Text className="text-base text-base-200">{products.length > 0 && `${products.length} anúncios`}</Text>
        <CustomSelect />
      </HStack>

      <FlatList 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 64 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 24 }}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item, index }) => (
          <CardItem 
            data={item} 
            index={index} 
            onPress={() => handleNavigationToDetailsAnnouncement(item.id)}
          />
        )}
      />
    </Box>
  );
}
