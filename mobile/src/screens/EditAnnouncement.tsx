import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { AppRoutesProps } from "@routes/app.routes";

import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Radio, RadioGroup, RadioIndicator, RadioLabel, RadioIcon } from "@/components/ui/radio";
import { CircleIcon } from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";

import Header from "@components/Header";
import CustomButton from "@components/CustomButton";
import CustomCheckbox from "@components/CustomCheckbox";
import CustomInput from "@components/CustomInput";

import { ArrowLeft, Plus } from "lucide-react-native";

type Props = BottomTabScreenProps<AppRoutesProps, "EditAnnouncement">;

export default function EditAnnouncement({ navigation }: Props) {
  const [values, setValues] = useState("");

  function handleNavigationToAnnouncement(){
    navigation.navigate("Announcement");
  }

  function handleNavigationToPreview(){
    navigation.navigate("PreviewAnnouncement");
  }

  return (
    <VStack className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 64, paddingBottom: 25 }}>
        <VStack className="gap-[32px]">
          <Box>
            <Header
              iconLeft={ArrowLeft} 
              iconLeftAction={handleNavigationToAnnouncement}
              text="Editar anúncio"
            />
          </Box>

          <Box>
            <Heading className="mb-1.5 text-base-200 text-[16px]">Imagens</Heading>
            <Text className="mb-5 text-base-300 text-base">Escolha até 3 imagens para mostrar o quando o seu produto é incrível!</Text>

            <TouchableOpacity className="w-[100px] h-[100px] justify-center items-center bg-base-500 rounded-lg">
              <Plus size={24} color="#9F9BA1" />
            </TouchableOpacity>
          </Box>

          <Box>
            <Heading className="mb-1.5 text-base-200 text-[16px]">Sobre o produto</Heading>

            <VStack space="lg" className="flex-1">
              <CustomInput type="text" placeholder="Título do anúncio" />

              <Textarea>
                <TextareaInput 
                  placeholder="Descrição do produto" 
                  className="px-4 bg-base-700 text-base-400 text-base" 
                  style={{ textAlignVertical: 'top' }} 
                />
              </Textarea>

              <RadioGroup value={values} onChange={setValues}>
                <HStack space="xl">
                  <Radio value="new">
                    <RadioIndicator>
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel className="text-lg text-base-200">Produto novo</RadioLabel>
                  </Radio>

                  <Radio value="used">
                    <RadioIndicator>
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel className="text-lg text-base-200">Produto usado</RadioLabel>
                  </Radio>
                </HStack>
              </RadioGroup>
            </VStack>          
          </Box>

          <VStack space="lg"> 
            <Heading className="mb-1.5 text-base-200 text-[16px]">Venda</Heading>

            <CustomInput type="text" placeholder="Valor do produto" />

            <Box>
              <Heading className="text-base text-base-200">Aceita troca?</Heading>

              <HStack className="justify-start">
                <Switch 
                  size="lg"
                  trackColor={{ false: "#D9D8DA", true: "#647AC7" }}
                  thumbColor="#F7F7F8"
                  ios_backgroundColor="#D9D8DA"
                />
              </HStack>
            </Box>

            <Box>
              <Heading className="mb-[12px] text-base text-base-200">Meios de pagamento aceitos</Heading>

              <VStack space="md" className="mt-2">
                <CustomCheckbox value="Boleto" />
                <CustomCheckbox value="Pix" />
                <CustomCheckbox value="Dinheiro" />
                <CustomCheckbox value="Cartão de Crédito" />
                <CustomCheckbox value="Depósito Bancário" />
              </VStack>
            </Box>
          </VStack>          
        </VStack>
      </ScrollView>

      <Box className="px-[24px] pt-[20px] pb-[28px]">
        <HStack className="justify-between" space="md">
          <CustomButton 
            text="Cancelar"
            variant="NEUTRAL"
            style={{ flex: 1 }}
            onPress={handleNavigationToAnnouncement}
          />
          <CustomButton 
            text="Avançar"
            variant="SECUNDARY"
            style={{ flex: 1 }}
            onPress={handleNavigationToPreview}
          />
        </HStack>
      </Box>
    </VStack>
  );
}
