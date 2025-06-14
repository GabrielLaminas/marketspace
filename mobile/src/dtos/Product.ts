type PaymentMethods = "pix" | "card" | "boleto" | "cash" | "deposit";

interface ImagesPickerProps {
  name: string;
  uri: string;
  type: string;
}

interface ImagesCreated {
  id: string;
  path: string;
  product_id: string;
  created_at: string;
  updated_at: string;
}

interface ProductDTO {
  name: string;
  description: string;
  is_new: string;
  price: string;
  accept_trade: boolean;
  payment_methods: PaymentMethods[];
}

interface ProductCreated {
  accept_trade: boolean;
  created_at: string;
  description: string;
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  price: 230;
  updated_at: string;
  user_id: string;
}

interface Methods {
  key: string;
  name: string;
}

interface ProductImages {
  id: string;
  path: string;
}

interface ProductData extends ProductCreated {
  payment_methods: Methods[];
  product_images: ProductImages[];
  user: {
    avatar: string;
    name: string;
    tel: string;
  };
}

export {
  ProductDTO,
  PaymentMethods,
  ProductCreated,
  ProductData,
  ImagesPickerProps,
  ImagesCreated,
  ProductImages,
};
