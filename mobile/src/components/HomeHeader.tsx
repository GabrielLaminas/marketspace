import { useContext } from "react";

import api from "@services/api";
import { AuthContext } from "@context/AuthContext";

import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { Image } from "@/components/ui/image";

import CustomButton from "./CustomButton";

import { Plus } from "lucide-react-native";
import Avatar from "@assets/avatar.png";

export default function HomeHeader() {
  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const { user } = useContext(AuthContext);
  const image = `${api.defaults.baseURL}/images/${user.avatar}`;

  function handleNavigationToCreateAnnouncement(){
    navigation.navigate("CreateAnnouncement", { isEditing: false });
  }

  return (
    <HStack space="sm" className="w-full mb-9 items-center justify-between">
      <HStack space="md" className="items-center">
        <Image
          source={ user.avatar ? image : Avatar}
          alt="avatar profile"
          resizeMode="cover"
          size="none"
          className="size-[45px] border-2 border-product-secundary rounded-full"
        />

        <Text className="text-lg text-base-100">
          Boas vindas,{"\n"}
          <Text className="font-heading font-bold">{user.name}!</Text>
        </Text>
      </HStack>

      <CustomButton 
        text="Criar anúncio"
        variant="SECUNDARY"
        icon={Plus}
        onPress={handleNavigationToCreateAnnouncement}
      />
    </HStack>
  );
}
