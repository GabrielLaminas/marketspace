type PaymentMethods = "pix" | "card" | "boleto" | "cash" | "deposit";

interface ProductDTO {
  "name": string;
  "description": string;
  "is_new": string;
  "price": string;
  "accept_trade": boolean;
  "payment_methods": PaymentMethods[];
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

interface ProductData extends ProductCreated {
  payment_methods: Methods[],
  product_images: string[], 
  user: {
    avatar: string; 
    name: string;
    tel: string;
  }, 
}

export { ProductDTO, PaymentMethods, ProductCreated, ProductData };