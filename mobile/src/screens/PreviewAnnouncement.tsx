import { ScrollView, SafeAreaView } from "react-native";
import React from "react";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { AppRoutesProps } from "@routes/app.routes";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";

import CustomButton from "@components/CustomButton";
import Carousel from "@components/Carousel";

import { Barcode, Bank, Money, QrCode, CreditCard } from "phosphor-react-native";
import { ArrowLeft, Tag } from "lucide-react-native";

const DATA = [
  "https://cdn.awsli.com.br/600x700/1259/1259538/produto/238747959/img_6666-8zgzqibzh0.jpg",
  "https://down-br.img.susercontent.com/file/sg-11134201-7rd57-lwyqk6femsfa96",
  "https://lebiscuit.vtexassets.com/arquivos/ids/21689609/17302131428199.jpg?v=638679144080530000"
]

type Props = BottomTabScreenProps<AppRoutesProps, "PreviewAnnouncement">;

export default function PreviewAnnouncement({ navigation }: Props) {
  const inactive = false;

  function handleNavigationGoBack(){
    navigation.goBack();
  }

  function handleNavigationDetailsAnnouncement(){
    navigation.navigate("DetailsAnnouncement");
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Box className="pt-[64px] px-[24px] pb-[16px] bg-product-secundary">
        <Heading className="text-base-700 text-lg text-center">Pré visualização do anúncio</Heading>
        <Text className="text-base-700 text-base text-center">É assim que seu produto vai aparecer!</Text>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Carousel 
          data={DATA}
          inactiveAd={inactive}
        />

        <VStack space="2xl" className="px-[24px] pt-[22px] pb-[26px]">
          <HStack space="sm" className="items-center">
            <Image 
              source={{ uri: "https://mighty.tools/mockmind-api/content/human/104.jpg" }}
              size="none"
              width={28}
              height={28}
              alt="nome qualquer"
              className="rounded-full border-2 border-product-secundary bg-slate-400"
            />
            <Text className="text-base text-base-100">Makenna Baptista</Text>
          </HStack>

          <VStack space="sm" className="items-start">
            <Badge className="px-[8px] py-[2px] bg-base-500 rounded-full">
              <BadgeText className="uppercase font-heading text-center text-base-200">Novo</BadgeText>
            </Badge>

            <HStack className="w-full justify-between items-center">
              <Heading className="text-base-100 text-2xl">Bicicleta</Heading>

              <Heading className="text-product-secundary text-2xl">
                <Text className="text-product-secundary text-base mr-2">R$</Text>
                120,00
              </Heading>
            </HStack>

            <Text className="w-full text-base text-base-200">
              Cras congue cursus in tortor sagittis placerat nunc, tellus arcu. Vitae ante leo eget maecenas urna mattis cursus. Mauris metus amet nibh mauris mauris accumsan, euismod. Aenean leo nunc, purus iaculis in aliquam.
            </Text>
          </VStack>

          <HStack space="md" className="items-center">
            <Heading className="text-base-200 text-base">Aceita troca?</Heading>
            <Text className="text-base-200 text-base">Sim</Text>
          </HStack>

          <VStack space="md">
            <Heading className="text-base-200 text-base">Meios de pagamento:</Heading>

            <VStack space="md">
              <HStack space="sm" className="items-center">
                <Barcode size={20} color="#1A181B" />
                <Text className="text-base-200 text-base">Boleto</Text>
              </HStack>

              <HStack space="sm" className="items-center">
                <QrCode size={20} color="#1A181B" />
                <Text className="text-base-200 text-base">Pix</Text>
              </HStack>

              <HStack space="sm" className="items-center">
                <Money size={20} color="#1A181B" />
                <Text className="text-base-200 text-base">Dinheiro</Text>
              </HStack>

              <HStack space="sm" className="items-center">
                <CreditCard size={20} color="#1A181B" />
                <Text className="text-base-200 text-base">Cartão de Crédito</Text>
              </HStack>

              <HStack space="sm" className="items-center">
                <Bank size={20} color="#1A181B" />
                <Text className="text-base-200 text-base">Depósito Bancário</Text>
              </HStack>
            </VStack>
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
            onPress={handleNavigationDetailsAnnouncement}
          />
        </HStack>
      </Box>
    </SafeAreaView>
  );
}
