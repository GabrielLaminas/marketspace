import { useEffect, useRef, useState } from "react";
import { FlatList } from "react-native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useNavigation } from "@react-navigation/native";

import api from "@services/api";
import { PaymentMethods, ProductsDTO } from "@dtos/Product";

import { Box } from "@/components/ui/box";

import HomeHeader from "@components/HomeHeader";
import Sell from "@components/Sell";
import ProductFilter from "@components/ProductFilter";
import CardItem from "@components/CardItem";
import Filter, { CustomBottomSheetModalRef } from "@components/Filter";
import EmptyList from "@components/EmptyList";
import Loading from "@components/Loading";

export default function Home() {
  const [products, setProducts] = useState<ProductsDTO[]>([]);
  const [search, setSearch] = useState("");
  const [condition, setCondition] = useState({
    new: false,
    used: false,
  });
  const [trade, setTrade] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods[]>([]);
  const [queryParams, setQueryParams] = useState("");
  const [loading, setLoading] = useState(false);

  const modalRef = useRef<CustomBottomSheetModalRef>(null);

  const navigation = useNavigation<AppNavigatorRoutesProps>();

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

  function handleNavigationToDetailsAnnouncement(id: string){
    navigation.navigate("Details", { id });
  }

  async function getAllProducts(){
    try {
      setLoading(true);
      const { data } = await api.get<ProductsDTO[]>(`/products/?query=${search}${queryParams}`);
      // 'http://localhost:3333/products/?is_new=true&accept_trade=true&payment_methods=pix&payment_methods=card&query=Cadeira'
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, [search, queryParams]);

  return (
    <>
      <Box className="flex-1 px-6 pt-16 relative">
        <HomeHeader onPress={handleNavigationToCreateAnnouncement} />

        <Sell quantity={4} onPress={handleNavigationToAnnouncement} />

        <ProductFilter 
          search={search}
          setSearch={setSearch}
          onPress={handleFilterShowModal}
        />
        
        {
          loading 
          ? <Loading />
          : (
            <FlatList 
              showsVerticalScrollIndicator={false}
              contentContainerStyle={
                products.length === 0 
                ? { flex: 1 }
                : { paddingBottom: 64 }
              }
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 24, gap: 20 }}
              data={products}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <CardItem 
                  data={item} 
                  onPress={() => handleNavigationToDetailsAnnouncement(item.id)}
                />
              )}
              ListEmptyComponent={() => <EmptyList description="Não há produtos disponíveis." />}
            />
          )
        }
      </Box>

      <Filter 
        ref={modalRef} 
        hiddenModal={handleFilterHiddenModal} 
        condition={condition} setCondition={setCondition}
        trade={trade} setTrade={setTrade}
        paymentMethods={paymentMethods} setPaymentMethods={setPaymentMethods}
        setQueryParams={setQueryParams}
      /> 
    </>
  );
}