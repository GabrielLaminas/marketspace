import { useCallback, useEffect, useState } from "react";
import { FlatList } from "react-native";

import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import api from "@services/api";
import { UserProduct } from "@dtos/UserProduct";

import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";

import CustomSelect from "@components/CustomSelect";
import CardItem from "@components/CardItem";
import Header from "@components/Header";
import Loading from "@components/Loading";

import { Plus } from "lucide-react-native";

export default function Announcements() {
  const [products, setProducts] = useState<UserProduct[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNavigationToCreateAnnouncement(){
    navigation.navigate("CreateAnnouncement");
  }

  function handleNavigationToDetailsAnnouncement(id: string){
    navigation.navigate("DetailsAnnouncement", { id })
  }

  async function getAllAnnouncements(){
    try {
      setLoading(true)
      const { data } = await api.get<UserProduct[]>("/users/products");
      setProducts(data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getAllAnnouncements();
    }, [])
  )

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

      {
        loading ? (
          <Loading bg="transparent" />
        ) : (
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
        )
      }      
    </Box>
  );
}
