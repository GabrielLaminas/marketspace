import { ProductCreated, ProductImages } from "./Product";

interface UserProduct extends ProductCreated {
  "product_images": ProductImages[], 
}

export { UserProduct };