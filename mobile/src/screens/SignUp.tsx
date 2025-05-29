import React from "react";
import { ScrollView } from "react-native";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthRoutesProps } from "@routes/auth.routes";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { Image } from "@/components/ui/image";
import { Center } from "@/components/ui/center";

import CustomInput from "@components/CustomInput";
import CustomButton from "@components/CustomButton";

import { PencilSimpleLine } from "phosphor-react-native";

import Logo from "@assets/logo.svg";
import Avatar from "@assets/avatar.png";

type Props = NativeStackScreenProps<AuthRoutesProps, "SignUp">;
type FieldProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
}

const schemaSignUp = yup.object({
  name: yup.string().required("Nome é obrigatório"),
  email: yup.string().required("Email é obrigatório").email("O formato de email está incorreto"),
  phone: yup.string().required('Telefone é obrigatório').matches(/^\(?\d{2}\)?[\s-]?\d{5}-?\d{4}$/, 'Número de telefone inválido, ex: (11) 91234-5678'),
  password: yup.string().required("Senha é obrigatório").min(6, "A senha deve ter pelo menos 6 digitos"),
  confirm_password: yup.string().required("A confirmação da senha é obrigatório").oneOf([yup.ref("password"), ""], "A confirmação da senha não confere.")
});

export default function SignUp({ navigation }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm<FieldProps>({
    resolver: yupResolver(schemaSignUp)
  });

  function handleNavigationToSingIn(){
    navigation.navigate("SignIn");
  }

  function handleS(data: any){
    console.log(data)
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
            <Box className="relative">
              <Image
                source={Avatar}
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
              name="phone"
              control={control}
              render={({ field: { value, onChange } }) => (
                <CustomInput 
                  placeholder="Telefone" type="text"
                  value={value}
                  onChangeText={onChange}
                  error={errors.phone && errors.phone.message}
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
              <CustomButton text="Criar" variant="SECUNDARY" onPress={handleSubmit(handleS)} />
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
