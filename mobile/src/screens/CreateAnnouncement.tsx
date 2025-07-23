import { useCallback, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import MaskInput, { createNumberMask } from "react-native-mask-input";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ProductDTO, ImagesPickerProps } from "@dtos/Product";

import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Radio, RadioGroup, RadioIndicator, RadioLabel, RadioIcon } from "@/components/ui/radio";
import { CircleIcon } from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/toast";
import { Image } from "@/components/ui/image";
import { CheckboxGroup } from "@/components/ui/checkbox";

import Header from "@components/Header";
import CustomButton from "@components/CustomButton";
import CustomCheckbox from "@components/CustomCheckbox";
import CustomInput from "@components/CustomInput";
import CustomToast from "@components/CustomToast";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { ArrowLeft, Plus } from "lucide-react-native";
import { XCircle } from "phosphor-react-native";

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
});

// Cria a máscara de moeda
const currencyMask = createNumberMask({
  prefix: ['R', '$', ' '],
  delimiter: '.',
  separator: ',',
  precision: 2,
});

type CreateAnnouncementFormData = yup.InferType<typeof createSchema>;

export default function CreateAnnouncement() {
  const [avatar, setAvatar] = useState<ImagesPickerProps[]>([]);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const params = route.params as { isEditing: boolean };

  const { control, handleSubmit, reset, formState: { errors } } = useForm<CreateAnnouncementFormData>({
    resolver: yupResolver(createSchema),
    defaultValues: {
      accept_trade: false,
      description: "",
      is_new: "",
      name: "",
      payment_methods: [],
      price: ""
    }
  });

  const toast = useToast();

  function handleNavigationToGoBack(){
    navigation.goBack();
  }

  async function handlePickImage(){
    try {
      if(avatar.length > 2){
        throw new Error("Você excedeu a quantidade de imagens para mostrar!");
      }

      const imageSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });

      if(imageSelected.canceled) return;

      const imageURI = imageSelected.assets[0].uri;

      if(!imageURI) return;

      const photoInfo = await FileSystem.getInfoAsync(imageURI) as { size: number }
      
      /*a expressão (photoInfo.size / 1024 / 1024) converte o tamanho da imagem de bytes para megabytes, dividindo primeiro por 1024 para obter kilobytes e novamente por 1024 para obter megabytes. */
      if(photoInfo.size && (photoInfo.size / 1024 / 1024) > 5){
        throw new Error("Essa imagem é muito grande. Escolha uma de até 5MB")
      }

      const fileExtension = imageSelected.assets[0].uri.split('.').pop();

      //precisa enviar para o backend essas informações de imagem.
      const photoFile: ImagesPickerProps = {
        name: `${imageSelected.assets[0].fileName}`.toLowerCase(),
        uri: imageURI,
        type: `${imageSelected.assets[0].type}/${fileExtension}`
      };

      setAvatar((prevAvatar) => [...prevAvatar, photoFile]);
    } catch (error) {
      if(error instanceof Error){  
        toast.show({
          id: "error-pick-image",
          placement: "top",
          duration: 5000,
          containerStyle: { marginTop: 48 },
          render: ({ id }) => (
            <CustomToast 
              id={id}
              title="Criar anúncio"
              action="error"
              message={error.message}
            />
          )
        })
      }
    }
  }

  async function handleCreateAnnouncement(body: ProductDTO){
    try {
      const data = await createSchema.validate({
        name: body.name,
        description: body.description,
        is_new: body.is_new,
        price: body.price,
        accept_trade: body.accept_trade,
        payment_methods: body.payment_methods
      }, { abortEarly: false })

      if(avatar.length === 0){
        throw new Error("É obrigatório o envio de imagens.");
      }

      if(data.name && data.description && data.is_new && data.price && data.payment_methods.length > 0){
        navigation.navigate("PreviewAnnouncement", { 
          name: data.name, 
          description: data.description, 
          is_new: data.is_new,
          price: data.price,
          accept_trade: data.accept_trade,
          payment_methods: data.payment_methods,
          images: avatar
        });
      }
    } catch (error) {
      if(error instanceof Error){  
        toast.show({
          id: "error-create-announcement",
          placement: "top",
          duration: 5000,
          containerStyle: { marginTop: 48 },
          render: ({ id }) => (
            <CustomToast 
              id={id}
              title="Criar anúncio"
              action="error"
              message={error.message}
            />
          )
        })
      }
    }
  }

  function handleRemoveAvatar(id: string){
    const avatars = avatar.filter(({ name }) => name !== id);
    setAvatar(avatars);
  }

  useFocusEffect(
    useCallback(() => {
      if (!params.isEditing) {
        setAvatar([]);
        reset({
          accept_trade: false,
          description: "",
          is_new: "",
          name: "",
          payment_methods: [],
          price: ""
        });
      }
    }, [params.isEditing, reset])
  );

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

            <HStack space="md" className="flex-wrap">
              {
                avatar.length > 0 && avatar.map(({ name, uri }) => (
                  <Box className="w-[100px] h-[100px] relative" key={name}>
                    <Image 
                      source={{ uri: uri }}
                      size="none"
                      width={100}
                      height={100}
                      alt="nome qualquer"
                      className="bg-base-500 rounded-lg"
                    />
                    <TouchableOpacity 
                      className="absolute right-1 top-1 z-10 w-5 h-5 rounded-full justify-center items-center bg-white"
                      onPress={() => handleRemoveAvatar(name)}
                    >
                      <XCircle size={24} color="#3E3A40" weight="fill"   />
                    </TouchableOpacity>
                  </Box>
                ))
              }             

              <TouchableOpacity 
                className={`w-[100px] h-[100px] justify-center items-center bg-base-500 rounded-lg ${avatar.length === 3 ? 'opacity-30' : 'opacity-100'}`} 
                disabled={avatar.length === 3} onPress={handlePickImage}
              >
                <Plus size={24} color="#9F9BA1" />
              </TouchableOpacity>
            </HStack>
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
                    error={errors.name && errors.name.message}
                  />
                )}
              />
              
              <VStack>
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
                { errors.description && <Text className="mt-1 px-1 text-red-600 text-sm">{errors.description.message}</Text> }
              </VStack>     

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
                    { errors.is_new && <Text className="mt-1 px-1 text-red-600 text-sm">{errors.is_new.message}</Text> }
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
                <Box>
                  <MaskInput 
                    value={value}
                    onChangeText={(masked, unmasked) => {
                      const cents = parseFloat(unmasked) / 100;
                      onChange(cents.toFixed(2));
                    }}
                    keyboardType="numeric"
                    mask={currencyMask}
                    placeholder="Valor do produto"
                    placeholderTextColor="#9F9BA1"
                    className="h-[45px] px-4 py-3 bg-base-700 border border-base-700 rounded-md"
                  />
                  { errors.price && <Text className="mt-1 px-1 text-red-600 text-sm">{errors.price.message}</Text> }
                </Box>
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
                    { errors.payment_methods && <Text className="mt-2 px-1 text-red-600 text-sm">{errors.payment_methods.message}</Text> }
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
