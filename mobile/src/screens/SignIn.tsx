import { useContext, useState } from "react";
import { ScrollView } from "react-native";

import { AuthContext } from "@context/AuthContext";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthRoutesProps } from "@routes/auth.routes";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { VStack } from "@/components/ui/vstack";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { Box } from "@/components/ui/box";
import { useToast } from "@/components/ui/toast";

import CustomInput from "@components/CustomInput";
import CustomButton from "@components/CustomButton";
import CustomToast from "@components/CustomToast";

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
  const [loading, setLoading] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm<FieldProps>({
    defaultValues: {
      email: "desafio2@rocketseat.com.br",
      password: "123456"
    }, 
    resolver: yupResolver(signInSchema)
  });
  const { signIn } = useContext(AuthContext);

  const toast = useToast();

  function handleNavigationToSingUp(){
    navigation.navigate("SignUp");
  }

  async function handleSignInUser({ email, password }: FieldProps){
    try {
      setLoading(true);
      await signIn(email, password);
    } catch (error) {
       setLoading(false);
      if(error instanceof Error){
        toast.show({
          id: "error-sign-in",
          placement: "top",
          duration: 5000,
          containerStyle: { marginTop: 48 },
          render: ({ id }) => (
            <CustomToast 
              id={id}
              title="Sign In"
              action="error"
              message={error.message}
            />
          )
        })
      }
    }
  }

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
                <CustomButton 
                  text="Entrar" 
                  variant="PRIMARY" 
                  onPress={handleSubmit(handleSignInUser)} 
                  isLoading={loading}
                />
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