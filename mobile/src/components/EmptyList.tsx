import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import CustomButton from "./CustomButton";

export default function EmptyList({ description }: { description: string }) {
  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleCreateAnnouncement(){
    navigation.navigate("CreateAnnouncement");
  }

  return (
    <Box className="flex-1 items-center justify-center">
      <Text className="text-center text-lg">
        {description}
      </Text>
      
      <CustomButton 
        text="Criar anúncio"
        variant="PRIMARY"
        style={{ marginTop: 20 }}
        onPress={handleCreateAnnouncement}
      />
    </Box>
  );
}
