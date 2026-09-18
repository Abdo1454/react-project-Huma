// import { Product, ProductResponse } from './../types/Product.types';
import api from "./axios"
import type{
    Product,
    ProductsResponse,
} from "../types/Product.types";
type GetProductsParams = {
  search?: string;
  limit?: number;
  skip?: number;
};

export async function getProducts({
     search = "",
  limit = 10,
  skip = 0,
}:GetProductsParams ={}):Promise<ProductsResponse> {
    const endpoint =search.trim()
    ?`/products/search?=${encodeURIComponent(search.trim())}&limit=${limit}&skip=${skip}`
      : `/products?limit=${limit}&skip=${skip}`;
        const { data } = await api.get<ProductsResponse>(endpoint);

  return data;

}

export async function getProductById(
    
    id:number,

):Promise<Product> {
    const {data} =await api.get<Product>(`/products/${id}`);
     return data;
}
