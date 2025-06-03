type PaymentMethods = "pix" | "card" | "boleto" | "cash" | "deposit";

interface ProductDTO {
  "name": string;
  "description": string;
  "is_new": string;
  "price": string;
  "accept_trade": boolean;
  "payment_methods": PaymentMethods[];
}

export { ProductDTO, PaymentMethods };