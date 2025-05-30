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

import CustomInput from "@components/CustomInput";
import CustomButton from "@components/CustomButton";

import Logo from "@assets/logo.svg";

type Props = NativeStackScreenProps<AuthRoutesProps, "SignIn">;
type FieldProps = {
  email: string;
  password: string;
}

const signInSchema = yup.object({
  email: yup.string().required("Email é obrigatório").email("O formato de email está incorreto"),
  password: yup.string().required("Senha é obrigatório").min(6, "A senha deve ter pelo menos 6 digitos")
})

export default function SignIn({ navigation }: Props) {
  const { control, handleSubmit, formState: { errors } } = useForm<FieldProps>({
    defaultValues: {
      email: "",
      password: ""
    }, 
    resolver: yupResolver(signInSchema)
  });

  function handleNavigationToSingUp(){
    navigation.navigate("SignUp");
  }

  const onSubmit = (data: any) => console.log(data) 

  return (
    <ScrollView>
      <Box className="px-12 pt-24 pb-16 bg-base-600 rounded-b-3xl">
        <VStack className="mb-20 items-center">
          <Logo />
          <Heading className="mt-5 text-base-100 text-4xl">marketspace</Heading>
          <Text className="text-base-300 text-base font-light">
            Seu espaço de compra e venda
          </Text>
        </VStack>

        <VStack>
          <Text className="mb-4 text-base-200 text-base text-center">
            Acesse sua conta
          </Text>

          <Box>
            <VStack className="gap-4">
              <Controller 
                control={control}
                name="email"
                render={({ field: { value, onChange } }) => (
                  <CustomInput 
                    placeholder="E-mail" 
                    value={value}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={onChange}
                    error={errors.email && errors.email.message}
                  />
                )}
              />   

              <Controller 
                control={control}
                name="password"
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

              <Box className="mt-4">
                <CustomButton text="Entrar" variant="PRIMARY" onPress={handleSubmit(onSubmit)} />
              </Box>
            </VStack>
          </Box>
        </VStack>
      </Box>

      <Box className="px-12 pt-14 pb-20">
        <Text className="mb-4 text-center text-base-200 text-base">
          Ainda não tem acesso?
        </Text>

        <CustomButton text="Criar uma conta" variant="NEUTRAL" onPress={handleNavigationToSingUp} />
      </Box>
    </ScrollView>
  );
}
