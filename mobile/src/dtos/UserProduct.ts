import { ProductCreated } from "./Product";

interface UserProduct extends ProductCreated {
  "product_images": string[], 
}

export { UserProduct };