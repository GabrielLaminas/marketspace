import { ScrollView } from "react-native";
import { useEffect, useState } from "react";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { AppRoutesProps } from "@routes/app.routes";

import api from "@services/api";
import { PaymentMethods, ProductData, ImagesPickerProps } from "@dtos/Product";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";

import CustomButton from "@components/CustomButton";
import Carousel from "@components/Carousel";
import Header from "@components/Header";
import PaymentMethodsList from "@components/PaymentMethodsList";
import Loading from "@components/Loading"

import { ArrowLeft, PencilLine, Power, Trash } from "lucide-react-native";

type Props = BottomTabScreenProps<AppRoutesProps, "DetailsAnnouncement">;

export default function DetailsAnnouncement({ navigation, route }: Props) {
  const [product, setProduct] = useState<ProductData>({} as ProductData);
  const [images, setImages] = useState<ImagesPickerProps[]>([]);
  const [loading, setLoading] = useState(false);

  const announcementId = route.params.id;

  function handleNavigationToAnnouncement(){
    navigation.navigate("Announcements");
  }

  function handleNavigationToEditAnnouncement(){
    navigation.navigate("EditAnnouncement");
  }

  async function getProduct(id: string){
    try {
      setLoading(true);
      const { data } = await api.get<ProductData>(`/products/${id}`);

      const image: ImagesPickerProps[] = data.product_images.map((image) => {
        return {
          name: image.path,
          uri: `${api.defaults.baseURL}/images/${image.path}`,
          type: `image/${image.path.split(".")[1]}`
        }
      });
      
      setImages(image);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct(announcementId);
  }, [announcementId]);


  if(loading){
    return <Loading />
  }

  return (
    <Box className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="mt-[64px] px-[24px] mb-[12px]">
          <Header 
            iconLeft={ArrowLeft}
            iconLeftAction={handleNavigationToAnnouncement}
            iconRight={PencilLine}
            iconRighAction={handleNavigationToEditAnnouncement}
          />
        </Box>

        <Carousel 
          data={images}
          inactiveAd={!product.is_active}
        />

        <VStack space="2xl" className="px-[24px] pt-[22px] pb-[26px]">
          <HStack space="sm" className="items-center">
            <Image 
              source={{ uri: `${api.defaults.baseURL}/images/${product.user?.avatar}` }}
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
              <BadgeText className="uppercase font-heading text-center text-base-200">
                { product.is_new ? "Novo" : "Usado" }
              </BadgeText>
            </Badge>

            <HStack className="w-full justify-between items-center">
              <Heading className="text-base-100 text-2xl">{product.name}</Heading>

              <HStack className="items-center">
                <Text className="text-product-secundary text-base mr-1">R$</Text>
                <Heading className="text-product-secundary text-2xl">{product.price}</Heading>
              </HStack>
            </HStack>

            <Text className="w-full text-base text-base-200">
              {product.description}
            </Text>
          </VStack>

          <HStack space="md" className="items-center">
            <Heading className="text-base-200 text-base">Aceita troca?</Heading>
            <Text className="text-base-200 text-base">{product.accept_trade ? "Sim" : "Não"}</Text>
          </HStack>

          <VStack space="md">
            <Heading className="text-base-200 text-base">Meios de pagamento:</Heading>

            <PaymentMethodsList
              paymentsMethods={product.payment_methods?.map(method => method.key) as PaymentMethods[]}
            />
          </VStack>
        </VStack>
      </ScrollView>

      <Box className="px-[24px] pt-[20px] pb-[28px]">
        <VStack space="md">
          {
            !product.is_active ? (
              <CustomButton 
                text="Reativar anúncio"
                variant="PRIMARY"
                icon={Power}
              />
            ) : (
              <CustomButton 
                text="Desativar anúncio"
                variant="SECUNDARY"
                icon={Power}
              />
            )
          }

          <CustomButton 
            text="Excluir anúncio"
            variant="NEUTRAL"
            icon={Trash}
          />
        </VStack>
      </Box>
    </Box>
  );
}
