import { useEffect, useRef } from "react";
import { FlatList } from "react-native";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { AppRoutesProps } from "@routes/app.routes";

import { Box } from "@/components/ui/box";

import HomeHeader from "@components/HomeHeader";
import Sell from "@components/Sell";
import ProductFilter from "@components/ProductFilter";
import CardItem from "@components/CardItem";
import Filter, { CustomBottomSheetModalRef } from "@components/Filter";
import api from "@services/api";

interface Data {
  id: number;
  kind: string;
  name: string;
  preco: number;
  uri: string;
  user?: string; 
  status: "active" | "inactive";
}

const DATA: Array<Data> = [
  {
    id: 1,
    kind: "novo",
    name: "Sandalia alta",
    preco: 69.50,
    uri: "https://kallan.vteximg.com.br/arquivos/ids/450035-1140-1140/45030322_001_1-FEM-SAND-SALTO-TR-PRNT-6262-1009.jpg?v=638279730355670000",
    user: "https://cdn.vectorstock.com/i/1000v/66/13/default-avatar-profile-icon-social-media-user-vector-49816613.jpg",
    status: "active",
  },
  {
    id: 2,
    kind: "usada",
    name: "Sandalia rasteirinha",
    preco: 79.50,
    uri: "https://cdn.awsli.com.br/2500x2500/1313/1313400/produto/232523900/img_9175-9ib5kg3xtk.jpeg",
    user: "https://cdn-icons-png.flaticon.com/512/9187/9187532.png",
    status: "active", 
  },
  {
    id: 3,
    kind: "novo",
    name: "Bicicleta",
    preco: 559.50,
    uri: "https://static.netshoes.com.br/produtos/bicicleta-aro-29-krw-aluminio-shimano-tz-24-vel-suspensao-freio-a-disco-mountain-bike-ltx-s40/60/CGY-0283-260/CGY-0283-260_zoom1.jpg?ts=1725874935&ims=326x",
    user: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/2048px-User_icon_2.svg.png",
    status: "active", 
  },
  {
    id: 4,
    kind: "novo",
    name: "PS5",
    preco: 4000.00,
    uri: "https://http2.mlstatic.com/D_609064-MLB83284097521_032025-O.jpg",
    user: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/System-users.svg/2048px-System-users.svg.png",
    status: "active", 
  }
]

type Props = BottomTabScreenProps<AppRoutesProps, "Home">;

export default function Home({ navigation }: Props) {
  const modalRef = useRef<CustomBottomSheetModalRef>(null);

  function handleFilterShowModal(){
    modalRef.current?.present();
  }

  function handleFilterHiddenModal(){
    modalRef.current?.dismiss();   
  }

  function handleNavigationToCreateAnnouncement(){
    navigation.navigate("CreateAnnouncement");
  }

  function handleNavigationToAnnouncement(){
    navigation.navigate("Announcements");
  }

  function handleNavigationToDetails(){
    navigation.navigate("Details");
  }

  async function getAllProducts(){
    try {
      const { data, status } = await api.get("/products/");
      console.log(data, status)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  
  return (
    <>
      <Box className="flex-1 px-6 pt-16 relative">
        <HomeHeader onPress={handleNavigationToCreateAnnouncement} />

        <Sell quantity={4} onPress={handleNavigationToAnnouncement} />

        <ProductFilter 
          onPress={handleFilterShowModal}
        />
        
        <FlatList 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 24 }}
          data={DATA}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <CardItem 
              data={item} 
              index={index} 
              onPress={handleNavigationToDetails}
            />
          )}
        />
      </Box>

      <Filter 
        ref={modalRef} 
        hiddenModal={handleFilterHiddenModal} 
      /> 
    </>
  );
}