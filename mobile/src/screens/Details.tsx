import { Alert, Linking, ScrollView } from "react-native";
import { useCallback, useState } from "react";

import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import api from "@services/api";

import { ImagesPickerProps, PaymentMethods, ProductData } from "@dtos/Product";
import PaymentMethodsList from "@components/PaymentMethodsList";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { useToast } from "@/components/ui/toast";

import CustomButton from "@components/CustomButton";
import Carousel from "@components/Carousel";
import Header from "@components/Header";
import Loading from "@components/Loading";
import CustomToast from "@components/CustomToast";

import { ArrowLeft, Phone } from "lucide-react-native";

type ImagesProps = ImagesPickerProps & {
  id?: string;
};

export default function Details() {
  const [images, setImages] = useState<ImagesProps[]>([]);
  const [product, setProduct] = useState<ProductData>({} as ProductData);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const params = route.params as { id: string };

  const toast = useToast();

  function handleNavigationToGoBack(){
    navigation.goBack();
  }

  async function getProductById() {
    try {
      setLoading(true);
      const { data } = await api.get<ProductData>(`/products/${params.id}`);

      const image: ImagesProps[] = data.product_images.map((image) => {
        return {
          id: image.id,
          name: image.path,
          uri: `${api.defaults.baseURL}/images/${image.path}`,
          type: `image/${image.path.split(".")[1]}`,
        };
      });

      setImages(image);
      setProduct(data);
    } catch (error) {
      if(error instanceof Error){
        toast.show({
          id: "error-get-product-ad",
          placement: "top",
          duration: 5000,
          containerStyle: { marginTop: 48 },
          render: ({ id }) => (
            <CustomToast 
              id={id}
              title="Detalhes do produto"
              action="error"
              message={error.message}
            />
          )
        })
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleSendWhatsappMessage(){
    try {
      if(!product.user) return;

      const url = `https://wa.me/${product.user.tel}`;
      const suportLink = await Linking.canOpenURL(url);

      if(suportLink){
        await Linking.openURL(url);
      } else {
        throw new Error("Não é possível abrir o link! Verifique seu número de telefone")
      }
    } catch (error) {
      if(error instanceof Error){
        Alert.alert("Anúncio", "Não é possível abrir o link!");
      }      
    }
  }

  useFocusEffect(
    useCallback(() => {
      getProductById();
    }, [params.id]),
  );

  if(loading){
    <Loading />
  }

  return (
    <Box className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="mt-[64px] px-[24px] mb-[12px]">
          <Header 
            iconLeft={ArrowLeft}
            iconLeftAction={handleNavigationToGoBack}
          />
        </Box>

        <Carousel 
          data={images}
        />

        <VStack space="2xl" className="px-[24px] pt-[22px] pb-[26px]">
          <HStack space="sm" className="items-center">
            <Image 
              source={{ 
                uri: `${api.defaults.baseURL}/images/${product.user?.avatar}` 
              }}
              size="none"
              width={28}
              height={28}
              alt="nome qualquer"
              className="rounded-full border-2 border-product-secundary bg-slate-400"
            />
            <Text className="text-base text-base-100">{product.user?.name}</Text>
          </HStack>

          <VStack space="sm" className="items-start">
            <Badge className="px-[8px] py-[2px] bg-base-500 rounded-full">
              <BadgeText className="uppercase font-heading text-center text-base-200">{product.is_new ? "Novo" : "Usado"}</BadgeText>
            </Badge>

            <HStack className="w-full justify-between items-start gap-2">
              <Heading className="text-base-100 text-2xl flex-1">{product.name}</Heading>

              <HStack className="flex-shrink-0" space="xs">
                <Text className="text-product-primary text-lg self-center">R$</Text>
                <Heading className="text-product-secundary text-2xl">
                  { new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 }).format(product.price).replace("R$", "").trim() }
                </Heading>
              </HStack>
            </HStack>

            <Text className="w-full text-base text-base-200">{product.description}</Text>
          </VStack>

          <HStack space="md" className="items-center">
            <Heading className="text-base-200 text-base">Aceita troca?</Heading>
            <Text className="text-base-200 text-base">{product.accept_trade ? "Sim" : "Não"}</Text>
          </HStack>

          <VStack space="md">
            <Heading className="text-base-200 text-base">Meios de pagamento:</Heading>

            <PaymentMethodsList
              paymentsMethods={
                product.payment_methods?.map(
                  (method) => method.key,
                ) as PaymentMethods[]
              }
            />
          </VStack>
        </VStack>
      </ScrollView>

      <Box className="px-[24px] pt-[20px] pb-[28px] bg-white">
        <HStack space="md" className="justify-between items-center">
          <HStack className="flex-shrink-0 items-end" space="xs">
            <Text className="text-product-primary text-lg mb-0.5">R$</Text>
            <Heading className="text-product-primary text-3xl">
              { new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 }).format(product.price).replace("R$", "").trim() }
            </Heading>
          </HStack>         

          <CustomButton
            text="Entrar em contato"
            variant="PRIMARY"
            icon={Phone}
            onPress={handleSendWhatsappMessage}
          />
        </HStack>
      </Box>
    </Box>
  );
}
