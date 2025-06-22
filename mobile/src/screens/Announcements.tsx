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
import EmptyList from "@components/EmptyList";

import { Plus } from "lucide-react-native";

export default function Announcements() {
  const [products, setProducts] = useState<UserProduct[]>([]);
  const [filterProducts, setFilterProducts] = useState<UserProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<"active" | "inactive" | "all">("all");

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
      setFilterProducts(data);
      setSelected("all");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleChangeStatusAnnouncement(){
    const filterProducts = products.filter((product) => 
      selected === "active" ? product.is_active : 
      selected === "inactive" ? !product.is_active : product
    );
    setFilterProducts(filterProducts);
  }

  useFocusEffect(
    useCallback(() => {
      getAllAnnouncements();
    }, [])
  )

  useEffect(() => {
    handleChangeStatusAnnouncement();
  }, [selected]);

  return (
    <Box className="flex-1 pt-[64px] px-[24px]">
      <Box className="mb-[32px]">
        <Header 
          text="Meus anúncios"
          iconRight={Plus}
          iconRighAction={handleNavigationToCreateAnnouncement}
        />
      </Box>

      <HStack className="mb-[20px] justify-between items-center">
        <Text className="text-base text-base-200">{filterProducts.length > 0 && `${filterProducts.length} anúncios`}</Text>
        <CustomSelect 
          selected={selected}
          setSelected={setSelected}
        />
      </HStack>

      {
        loading ? (
          <Loading bg="transparent" />
        ) : (
          <FlatList 
            showsVerticalScrollIndicator={false}
            contentContainerStyle={
              filterProducts.length === 0 
              ? { flex: 1 }
              : { paddingBottom: 64 } 
            }
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 24, gap: 20 }}
            data={filterProducts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <CardItem 
                data={item} 
                index={index} 
                onPress={() => handleNavigationToDetailsAnnouncement(item.id)}
              />
            )}
            ListEmptyComponent={() => <EmptyList description="Você ainda não tem produtos cadastrados!" />}
          />
        )
      }      
    </Box>
  );
}
