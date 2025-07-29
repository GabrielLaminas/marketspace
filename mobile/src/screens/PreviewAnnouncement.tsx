import { ScrollView, SafeAreaView } from "react-native";
import { useCallback, useContext, useState } from "react";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

import { AuthContext } from "@context/AuthContext";

import api from "@services/api";
import { 
  ImagesCreated, ProductCreated, ImagesPickerProps, ProductDTO, ProductData 
} from "@dtos/Product";

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
import PaymentMethodsList from "@components/PaymentMethodsList";
import CustomToast from "@components/CustomToast";

import { ArrowLeft, Tag } from "lucide-react-native";


type ImageProps = ImagesPickerProps & {
  id?: string;
}

type PreviewRouteProps = ProductDTO & { 
  id?: string;  
  images: ImageProps[];
  imagesDelete?: string[];
}

export default function PreviewAnnouncement() {
  const { user } = useContext(AuthContext);

  const route = useRoute();
  const params = route.params as PreviewRouteProps;
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  const toast = useToast();  

  function handleNavigationGoBack(){
    if(params.id){
      navigation.navigate("EditAnnouncement", { 
        accept_trade: params.accept_trade, 
        description: params.description, 
        id: params.id, 
        is_new: params.is_new, 
        name: params.name,
        price: params.price,
        payment_methods: params.payment_methods,
        images: params.images,
        imagesDelete: params.imagesDelete
      });
    } else {
      navigation.navigate("CreateAnnouncement", { isEditing: true });
    }    
  }

  async function handleCreateAnnouncement(){
    try {
      const { data: product, status: productStatus } = await api.post<ProductCreated>("/products/", {
        name: params.name,
        description: params.description,
        is_new: params.is_new === "true" ? true : false,
        price: Number(params.price),
        accept_trade: params.accept_trade,
        payment_methods: params.payment_methods
      });

      if((productStatus === 200 || productStatus === 201) && product.id){
        const imageFormData = new FormData();

        imageFormData.append("product_id", product.id);
        params.images.forEach((image: ImagesPickerProps) => {
          imageFormData.append("images", {
            uri: image.uri,
            name: image.name,
            type: image.type,
          } as any);
        });

        const { data, status } = await api.post<ImagesCreated[]>("/products/images/", imageFormData, { 
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        if(status === 200 || status === 201){
          navigation.navigate("DetailsAnnouncement", { id: data[0].product_id });
          toast.show({
            id: "success-preview-announcement",
            placement: "top",
            duration: 5000,
            containerStyle: { marginTop: 48 },
            render: ({ id }) => (
              <CustomToast 
                id={id}
                title="Visualização do anúncio"
                action="success"
                message="Anúncio publicado com sucesso!"
              />
            )
          })
        }
      }
    } catch (error) {
      if(error instanceof Error){  
        toast.show({
          id: "error-preview-announcement",
          placement: "top",
          duration: 5000,
          containerStyle: { marginTop: 48 },
          render: ({ id }) => (
            <CustomToast 
              id={id}
              title="Visualização do anúncio"
              action="error"
              message={error.message}
            />
          )
        })
      }
    }
  }

  async function handleEditAnnouncement(){
    try {
      if(params.id && params.description && params.is_new && params.name && params.price && params.payment_methods.length > 0 && params.images.length > 0){
        //delete when exist images in imagesDelete
        if(params.imagesDelete && params.imagesDelete.length > 0){
          await api.delete("/products/images/", {
            data: {
              productImagesIds: params.imagesDelete
            }
          });
        }       

        const imagesCreate = params.images.filter((image) => !image.id);

        //create when exist images without id in imagesCreate
        if(imagesCreate.length > 0){
          const imageFormData = new FormData();
          imageFormData.append("product_id", params.id); 
          imagesCreate.forEach((image: ImagesPickerProps) => {
            imageFormData.append("images", {
              uri: image.uri,
              name: image.name,
              type: image.type,
            } as any);
          });
          
          await api.post<ImagesCreated[]>("/products/images/", imageFormData, { 
            headers: {
              'Content-Type': 'multipart/form-data',
            }
          }); 
        }

        await api.put(`/products/${params.id}`, {
          name: params.name,
          description: params.description,
          is_new: params.is_new === "true" ? true : false,
          price: Number(params.price),
          accept_trade: params.accept_trade,
          payment_methods: params.payment_methods
        });

        navigation.navigate("DetailsAnnouncement", { id: params.id });
        toast.show({
          id: "success-preview-announcement",
          placement: "top",
          duration: 5000,
          containerStyle: { marginTop: 48 },
          render: ({ id }) => (
            <CustomToast 
              id={id}
              title="Visualização do anúncio"
              action="success"
              message="Anúncio atualizado com sucesso!"
            />
          )
        });
      } else {
        throw new Error("Você deve passar os parametros corretamente.")
      }
    } catch (error) {
      if(error instanceof Error){  
        toast.show({
          id: "error-preview-announcement",
          placement: "top",
          duration: 5000,
          containerStyle: { marginTop: 48 },
          render: ({ id }) => (
            <CustomToast 
              id={id}
              title="Atualização do anúncio"
              action="error"
              message={error.message}
            />
          )
        })
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="pt-[64px] px-[24px] pb-[16px] bg-product-secundary">
        <Heading className="text-base-700 text-lg text-center">Pré visualização do anúncio</Heading>
        <Text className="text-base-700 text-base text-center">É assim que seu produto vai aparecer!</Text>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Carousel 
          data={params.images}
          inactiveAd={false}
        />

        <VStack space="2xl" className="px-[24px] pt-[22px] pb-[26px]">
          <HStack space="sm" className="items-center">
            <Image 
              source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}` }}
              size="none"
              width={28}
              height={28}
              alt="nome qualquer"
              className="rounded-full border-2 border-product-secundary bg-slate-400"
            />
            <Text className="text-base text-base-100">{user.name}</Text>
          </HStack>

          <VStack space="sm" className="items-start">
            <Badge className="px-[8px] py-[2px] bg-base-500 rounded-full">
              <BadgeText className="uppercase font-heading text-center text-base-200">{ params.is_new === "true" ? "Novo" : "Usado" }</BadgeText>
            </Badge>

            <HStack className="w-full justify-between gap-2">
              <Heading className="text-base-100 text-2xl flex-1">{params.name}</Heading>

              <HStack className="items-center flex-shrink-0">
                <Text className="text-product-secundary text-base mr-1">R$</Text>
                <Heading className="text-product-secundary text-2xl">
                  { new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 }).format(Number(params.price)).replace("R$", "").trim() }
                </Heading>
              </HStack>
            </HStack>

            <Text className="w-full text-base text-base-200">{params.description}</Text>
          </VStack>

          <HStack space="md" className="items-center">
            <Heading className="text-base-200 text-base">Aceita troca?</Heading>
            <Text className="text-base-200 text-base">{ params.accept_trade ? "Sim" : "Não" }</Text>
          </HStack>

          <VStack space="md">
            <Heading className="text-base-200 text-base">Meios de pagamento:</Heading>
            
            <PaymentMethodsList
              paymentsMethods={params.payment_methods}
            />
          </VStack>
        </VStack>
      </ScrollView>

      <Box className="px-[24px] pt-[20px] pb-[28px]">
        <HStack space="md">
          <CustomButton 
            text="Voltar e editar"
            variant="NEUTRAL"
            icon={ArrowLeft}
            style={{ flex: 1 }}
            onPress={handleNavigationGoBack}
          />

          <CustomButton 
            text="Publicar"
            variant="PRIMARY"
            icon={Tag}
            style={{ flex: 1 }}
            onPress={params.id ? () => handleEditAnnouncement() : () => handleCreateAnnouncement()}
          />
        </HStack>
      </Box>
    </SafeAreaView>
  );
}
