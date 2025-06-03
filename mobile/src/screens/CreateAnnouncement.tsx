import { useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { AppRoutesProps } from "@routes/app.routes";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
import { CheckboxGroup } from "@/components/ui/checkbox";
import { ProductDTO } from "@dtos/Product";

type Props = BottomTabScreenProps<AppRoutesProps, "CreateAnnouncement">;

const paymentOptions = ["pix", "card", "boleto", "cash", "deposit"] as const;
type PaymentMethods = typeof paymentOptions[number];

const createSchema = yup.object({
  name: yup.string().required("O nome do produto é obrigatório!"),
  description: yup.string().required("A descrição do produto é obrigatório!"),
  is_new: yup.string().required("O status do produto é obrigatório!"),
  price: yup.string().required("O preço do produto é obrigatório!"),
  accept_trade: yup.boolean().default(false),
  payment_methods: yup
    .array()
    .of(yup.mixed<PaymentMethods>().oneOf(paymentOptions).required())
    .min(1, "É preciso marcar pelo menos um método de pagamento!")
    .required("Campo obrigatório"),
})
type CreateAnnouncementFormData = yup.InferType<typeof createSchema>;


export default function CreateAnnouncement({ navigation }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm<CreateAnnouncementFormData>({
    resolver: yupResolver(createSchema)
  });

  function handleNavigationToGoBack(){
    navigation.goBack();
  }

  function handleNavigationToPreview(){
    navigation.navigate("PreviewAnnouncement");
  }

  function handleCreateAnnouncement(data: ProductDTO){
    console.log(data)
  }

  return (
    <VStack className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 64, paddingBottom: 25 }}>
        <VStack className="gap-[32px]">
          <Box>
            <Header
              iconLeft={ArrowLeft} 
              iconLeftAction={handleNavigationToGoBack}
              text="Criar anúncio"
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
              <Controller 
                control={control}
                name="name"
                render={({ field: { value, onChange } }) => (
                  <CustomInput 
                    type="text" 
                    placeholder="Título do anúncio"
                    value={value !== undefined && value !== null ? String(value) : ""}
                    onChangeText={onChange}
                    // error=""
                  />
                )}
              />
              
              <Controller 
                control={control}
                name="description"
                render={({ field: { value, onChange } }) => (
                  <Textarea>
                    <TextareaInput 
                      type="text" 
                      value={value}
                      onChangeText={onChange}
                      placeholder="Descrição do produto" 
                      className="px-4 bg-base-700 text-base-400 text-base"                      
                      style={{ textAlignVertical: 'top' }} 
                    />
                  </Textarea>
                )}
              />              

              <Controller 
                control={control}
                name="is_new"
                render={({ field: { value, onChange } }) => (
                  <RadioGroup value={String(value)} onChange={onChange}>
                    <HStack space="xl">
                      <Radio value="true">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel className="text-lg text-base-200">Produto novo</RadioLabel>
                      </Radio>

                      <Radio value="false">
                        <RadioIndicator>
                          <RadioIcon as={CircleIcon} />
                        </RadioIndicator>
                        <RadioLabel className="text-lg text-base-200">Produto usado</RadioLabel>
                      </Radio>
                    </HStack>
                  </RadioGroup>
                )}
              />    
            </VStack>          
          </Box>

          <VStack space="lg"> 
            <Heading className="mb-1.5 text-base-200 text-[16px]">Venda</Heading>
            
            <Controller 
              control={control}
              name="price"
              render={({ field: { value, onChange } }) => (
                <CustomInput 
                  type="text" 
                  keyboardType="numeric"
                  placeholder="Valor do produto" 
                  value={value}
                  onChangeText={onChange} 
                  isMoney 
                />
              )}
            />            

            <Box>
              <Heading className="text-base text-base-200">Aceita troca?</Heading>

              <HStack className="justify-start">
                <Controller 
                  control={control}
                  name="accept_trade"
                  render={({ field: { value, onChange } }) => (
                    <Switch 
                      value={value}
                      onToggle={onChange}
                      size="lg"
                      trackColor={{ false: "#D9D8DA", true: "#647AC7" }}
                      thumbColor="#F7F7F8"
                      ios_backgroundColor="#D9D8DA"
                    />
                  )}
                />                 
              </HStack>
            </Box>

            <Box>
              <Heading className="mb-[12px] text-base text-base-200">Meios de pagamento aceitos</Heading>

              <Controller 
                control={control}
                name="payment_methods"
                render={({ field: { value, onChange } }) => (
                  <CheckboxGroup value={value} onChange={onChange}>
                    <VStack space="md" className="mt-2">
                      <CustomCheckbox label="Boleto" value="boleto" /> 
                      <CustomCheckbox label="Pix" value="pix" />
                      <CustomCheckbox label="Dinheiro" value="cash" />
                      <CustomCheckbox label="Cartão de Crédito" value="card" />
                      <CustomCheckbox label="Depósito Bancário" value="deposit" />
                    </VStack>
                  </CheckboxGroup>  
                )}
              />
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
            onPress={handleNavigationToGoBack}
          />
          <CustomButton 
            text="Avançar"
            variant="SECUNDARY"
            style={{ flex: 1 }}
            onPress={handleSubmit(handleCreateAnnouncement)}
          />
        </HStack>
      </Box>
    </VStack>
  );
}
