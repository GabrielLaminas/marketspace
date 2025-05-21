import { View, Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated"
import RNCarousel from "react-native-reanimated-carousel";

import { Image } from "@/components/ui/image";
import { Box } from "@/components/ui/box";
import { Heading } from "@/components/ui/heading";

const screenWidth = Dimensions.get("window").width;

type Props = {
  data: string[];
  activeAd?: boolean;
}

export default function Carousel({ data, activeAd = false }: Props) {
  const progress = useSharedValue<number>(0);

  return (
    <View id="carousel-component" style={{ position: 'relative' }}>
      <RNCarousel 
        autoPlay={activeAd ? false : true}
        autoPlayInterval={5000}
        data={data}
        height={280}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        width={screenWidth}
        style={{ width: screenWidth }}
        mode="parallax"
        modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: 50,
				}}
				onProgressChange={progress}
        renderItem={({ item, index }) => (
          <Box>
            <Image 
              source={{ uri: item }}
              width={screenWidth}
              height={280}
              size="none"
              alt={`Imagem ${index + 1} do carousel`}
              resizeMode="cover"
            />          
          </Box>
        )}
      />

      {activeAd && (
        <Box className="absolute left-0 top-0 size-full p-1 justify-center items-center bg-base-100/60">
          <Heading className="uppercase text-base text-base-700 text-center">
            Anúncio desativado
          </Heading>
        </Box>
      )}
    </View>
  );
}
