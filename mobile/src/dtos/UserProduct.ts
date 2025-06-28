import { ProductImages } from "./Product";

interface UserProduct {
  accept_trade: boolean;
  id: string;
  is_active: boolean;
  is_new: boolean;
  name: string;
  price: number;
  user_id: string;
  product_images: ProductImages[];
  user: {
    avatar: string;
  } | undefined;
}

export { UserProduct };