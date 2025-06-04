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

export { ProductDTO, PaymentMethods, ProductCreated };