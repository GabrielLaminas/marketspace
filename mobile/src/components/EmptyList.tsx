import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import CustomButton from "./CustomButton";

type Props = {
  description: string;
  isAction?: boolean;
}

export default function EmptyList({ description, isAction = false }: Props) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleCreateAnnouncement(){
    navigation.navigate("CreateAnnouncement");
  }

  return (
    <Box className="flex-1 items-center justify-center">
      <Text className="text-center text-lg">
        {description}
      </Text>
      
      {
        isAction && (
          <CustomButton 
            text="Criar anúncio"
            variant="SECUNDARY"
            style={{ marginTop: 20 }}
            onPress={handleCreateAnnouncement}
          />
        )
      }
    </Box>
  );
}
