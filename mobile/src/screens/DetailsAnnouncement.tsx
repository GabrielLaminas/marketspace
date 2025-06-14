import { useCallback, useState } from "react";
import { Alert, ScrollView } from "react-native";

import { AppNavigatorRoutesProps } from "@routes/app.routes";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

import api from "@services/api";
import { PaymentMethods, ProductData, ImagesPickerProps } from "@dtos/Product";

import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Badge, BadgeText } from "@/components/ui/badge";
import { Heading } from "@/components/ui/heading";
import { Image } from "@/components/ui/image";
import { useToast } from "@/components/ui/toast";

import CustomButton from "@components/CustomButton";
import Carousel from "@components/Carousel";
import Header from "@components/Header";
import PaymentMethodsList from "@components/PaymentMethodsList";
import Loading from "@components/Loading";
import CustomToast from "@components/CustomToast";

import { ArrowLeft, PencilLine, Power, Trash } from "lucide-react-native";

type RouteParamsProps = {
  id: string;
};

type ImagesProps = ImagesPickerProps & {
  id?: string;
};

export default function DetailsAnnouncement() {
  const [product, setProduct] = useState<ProductData>({} as ProductData);
  const [images, setImages] = useState<ImagesProps[]>([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  const route = useRoute();
  const { id } = route.params as RouteParamsProps;

  const toast = useToast();

  function handleNavigationToAnnouncement() {
    navigation.navigate("Announcements");
  }

  function handleNavigationToEditAnnouncement() {
    const payment_methods = product.payment_methods.map(
      ({ key }) => key as PaymentMethods,
    );

    navigation.navigate("EditAnnouncement", {
      name: product.name,
      description: product.description,
      accept_trade: product.accept_trade,
      images,
      is_new: product.is_new ? "true" : "false",
      payment_methods: payment_methods,
      price: String(product.price),
      id: id,
    });
  }

  async function getProductById() {
    try {
      setLoading(true);
      const { data } = await api.get<ProductData>(`/products/${id}`);

      const image: ImagesProps[] = data.product_images.map((image) => {
        return {
          id: image.id,
          name: image.path,
          uri: `${api.defaults.baseURL}/images/${image.path}`,
          type: `image/${image.path.split(".")[1]}`,
        };
      });

      setImages(image);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function inactiveProduct(id: string, is_active: boolean) {
    try {
      const { status } = await api.patch(`/products/${id}`, {
        is_active: !is_active,
      });

      if (status === 204) {
        setProduct((prevProduct) => ({
          ...prevProduct,
          is_active: !is_active,
        }));

        toast.show({
          id: "update-product",
          placement: "top",
          duration: 5000,
          containerStyle: { marginTop: 48 },
          render: ({ id }) => (
            <CustomToast
              id={id}
              title={`${product.name}`}
              action="success"
              message={`Anúncio foi ${is_active ? "desativado" : "reativado"}!`}
            />
          ),
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.show({
          id: "error-update-product",
          placement: "top",
          duration: 5000,
          containerStyle: { marginTop: 48 },
          render: ({ id }) => (
            <CustomToast
              id={id}
              title={`Anúncio ${product.name}`}
              action="error"
              message={error.message}
            />
          ),
        });
      }
    }
  }

  function handleRemoveProduct(id: string){
    Alert.alert(
      "Remover anúncio",
      "Tem certeza que deseja remover o anúncio?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await removeProduct(id);
          }
        }
      ]
    )
  }

  async function removeProduct(id: string) {
    try {
      const { status } = await api.delete(`/products/${id}`);

      if (status === 204) {
        toast.show({
          id: "remove-product",
          placement: "top",
          duration: 5000,
          containerStyle: { marginTop: 48 },
          render: ({ id }) => (
            <CustomToast
              id={id}
              title={`Anúncio ${product.name}`}
              action="success"
              message={`Anúncio Excluido com sucesso!`}
            />
          ),
        });

        navigation.navigate("Announcements");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.show({
          id: "error-remove-product",
          placement: "top",
          duration: 5000,
          containerStyle: { marginTop: 48 },
          render: ({ id }) => (
            <CustomToast
              id={id}
              title={`Anúncio ${product.name}`}
              action="error"
              message={error.message}
            />
          ),
        });
      }
    }
  }

  useFocusEffect(
    useCallback(() => {
      getProductById();
    }, [id]),
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <Box className="flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box className="mt-[64px] px-[24px] mb-[12px]">
          <Header
            iconLeft={ArrowLeft}
            iconLeftAction={handleNavigationToAnnouncement}
            iconRight={PencilLine}
            iconRighAction={handleNavigationToEditAnnouncement}
          />
        </Box>

        <Carousel data={images} inactiveAd={!product.is_active} />

        <VStack space="2xl" className="px-[24px] pt-[22px] pb-[26px]">
          <HStack space="sm" className="items-center">
            <Image
              source={{
                uri: `${api.defaults.baseURL}/images/${product.user?.avatar}`,
              }}
              size="none"
              width={28}
              height={28}
              alt="nome qualquer"
              className="rounded-full border-2 border-product-secundary bg-slate-400"
            />
            <Text className="text-base text-base-100">
              {product.user?.name}
            </Text>
          </HStack>

          <VStack space="sm" className="items-start">
            <Badge className="px-[8px] py-[2px] bg-base-500 rounded-full">
              <BadgeText className="uppercase font-heading text-center text-base-200">
                {product.is_new ? "Novo" : "Usado"}
              </BadgeText>
            </Badge>

            <HStack className="w-full justify-between items-center">
              <Heading className="text-base-100 text-2xl">
                {product.name}
              </Heading>

              <HStack className="items-center">
                <Text className="text-product-secundary text-base mr-1">
                  R$
                </Text>
                <Heading className="text-product-secundary text-2xl">
                  {product.price}
                </Heading>
              </HStack>
            </HStack>

            <Text className="w-full text-base text-base-200">
              {product.description}
            </Text>
          </VStack>

          <HStack space="md" className="items-center">
            <Heading className="text-base-200 text-base">Aceita troca?</Heading>
            <Text className="text-base-200 text-base">
              {product.accept_trade ? "Sim" : "Não"}
            </Text>
          </HStack>

          <VStack space="md">
            <Heading className="text-base-200 text-base">
              Meios de pagamento:
            </Heading>

            <PaymentMethodsList
              paymentsMethods={
                product.payment_methods?.map(
                  (method) => method.key,
                ) as PaymentMethods[]
              }
            />
          </VStack>
        </VStack>
      </ScrollView>

      <Box className="px-[24px] pt-[20px] pb-[28px]">
        <VStack space="md">
          {!product.is_active ? (
            <CustomButton
              text="Reativar anúncio"
              variant="PRIMARY"
              icon={Power}
              onPress={() => inactiveProduct(product.id, product.is_active)}
            />
          ) : (
            <CustomButton
              text="Desativar anúncio"
              variant="SECUNDARY"
              icon={Power}
              onPress={() => inactiveProduct(product.id, product.is_active)}
            />
          )}

          <CustomButton
            text="Excluir anúncio"
            variant="NEUTRAL"
            icon={Trash}
            onPress={() => handleRemoveProduct(product.id)}
          />
        </VStack>
      </Box>
    </Box>
  );
}
