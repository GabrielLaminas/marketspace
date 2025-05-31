import { useContext, useState } from "react";
import { ScrollView, TouchableOpacity } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthRoutesProps } from "@routes/auth.routes";

import { AuthContext } from "@context/AuthContext";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";
import { useToast } from "@/components/ui/toast";

import CustomInput from "@components/CustomInput";
import CustomButton from "@components/CustomButton";
import CustomToast from "@components/CustomToast";

import { PencilSimpleLine } from "phosphor-react-native";

import Logo from "@assets/logo.svg";
import Avatar from "@assets/avatar.png";

type Props = NativeStackScreenProps<AuthRoutesProps, "SignUp">;

export type FieldSignUpProps = {
  name: string;
  email: string;
  tel: string;
  password: string;
  confirm_password: string;
}

const schemaSignUp = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().required("Email é obrigatório").email("O formato de email está incorreto"),
  tel: yup.string().required('Telefone é obrigatório').matches(/^\+55\d{2}9\d{8}$/, 'Número de telefone inválido, ex: +5511912345678'),
  password: yup.string().required("Senha é obrigatório").min(6, "A senha deve ter pelo menos 6 digitos"),
  confirm_password: yup.string().required("A confirmação da senha é obrigatório").oneOf([yup.ref("password"), ""], "A confirmação da senha não confere.")
});

export default function SignUp({ navigation }: Props) {
  const [avatar, setAvatar] = useState<{ name: string, uri: string, type: string} | null>(null);

  const { control, handleSubmit, formState: { errors, defaultValues } } = useForm<FieldSignUpProps>({
    resolver: yupResolver(schemaSignUp),
    defaultValues: {
      name: "Rocketseat",
      email: "desafio2@rocketseat.com.br",
      tel: "+5511915839644",
      password: "123456",
      confirm_password: "123456"
    }
  });

  const { loading, signUp, signIn } = useContext(AuthContext);

  const toast = useToast();

  function handleNavigationToSingIn(){
    navigation.navigate("SignIn");
  }

  async function handleCreateUser(data: FieldSignUpProps){
    try {
      if(!avatar){
        throw new Error("Insira a imagem para o seu perfil!");
      }

      await signUp(data, avatar);

      toast.show({
        id: "id-submit-form",
        placement: "top",
        duration: 5000,
        containerStyle: { marginTop: 48 },
        render: ({ id }) => (
          <CustomToast 
            id={id}
            title="Sign Up"
            action="success"
            message="Usuário criado com sucesso!"
          />
        )
      });

      await signIn(data.email, data.password);
    } catch (error) {
      if(error instanceof Error){
        toast.show({
          id: "error-submit-form",
          placement: "top",
          duration: 5000,
          containerStyle: { marginTop: 48 },
          render: ({ id }) => (
            <CustomToast 
              id={id}
              title="Sign Up"
              action="error"
              message={error.message}
            />
          )
        })
      }
    }
  }

  async function handlePickImage(){
    try {
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
      const photoFile = {
        name: `${defaultValues?.name}.${fileExtension}`.toLowerCase(),
        uri: imageURI,
        type: `${imageSelected.assets[0].type}/${fileExtension}`
      } as any;

      setAvatar(photoFile);
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
              title="Sign Up"
              action="error"
              message={error.message}
            />
          )
        })
      }
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
      className="bg-base-600"
    >
      <Box className="flex-1 px-12 pt-16 pb-14">
        <VStack className="mb-8 items-center">
          <Logo width={60} height={40} />

          <Heading className="mt-3 text-base-100 text-2xl block">
            Boas vindas!
          </Heading>
          <Text className="mt-2 text-base-300 text-base font-light text-center">
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </Text>
        </VStack>

        <VStack>
          <Center className="mb-5">
            <TouchableOpacity onPress={handlePickImage}>
              <Box className="relative">
                <Image
                  source={ avatar ? { uri: avatar.uri } : Avatar}
                  alt="avatar profile"
                  resizeMode="cover"
                  width={89}
                  height={89}
                  size="none"
                  className="bg-base-500 border-[3px] border-product-secundary rounded-full"
                />
                <Box className="absolute -right-2 bottom-0 bg-product-secundary size-10 justify-center items-center rounded-full">
                  <PencilSimpleLine size={16} color="#FFFFFF" />
                </Box>
              </Box>
            </TouchableOpacity>
          </Center>

          <VStack className="gap-4">
            <Controller 
              name="name"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomInput 
                  placeholder="Nome" 
                  type="text" 
                  value={value}
                  onChangeText={onChange}
                  error={errors.name && errors.name.message}
                />
              )}
            />

            <Controller 
              name="email"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomInput 
                  placeholder="E-mail" 
                  type="text"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={value}
                  onChangeText={onChange}
                  error={errors.email && errors.email.message}
                />
              )}
            />

            <Controller 
              name="tel"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomInput 
                  placeholder="Telefone" type="text"
                  value={value}
                  onChangeText={onChange}
                  error={errors.tel && errors.tel.message}
                />
              )}
            />

            <Controller 
              name="password"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomInput 
                  placeholder="Senha" 
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  error={errors.password && errors.password.message}
                />
              )}
            />
            
            <Controller 
              name="confirm_password"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomInput 
                  placeholder="Confirmar senha" 
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  error={errors.confirm_password && errors.confirm_password.message}
                />
              )}
            />

            <Box className="mt-4">
              <CustomButton 
                text="Criar" 
                variant="SECUNDARY" 
                onPress={handleSubmit(handleCreateUser)} 
                isLoading={loading}
              />
            </Box>
          </VStack>

          <Box className="mt-12">
            <Text className="mb-4 text-center text-base-200 text-base">
              Já tem uma conta?
            </Text>

            <CustomButton text="Ir para o login" variant="NEUTRAL" onPress={handleNavigationToSingIn} />
          </Box>
        </VStack>
      </Box>
    </ScrollView>
  );
}