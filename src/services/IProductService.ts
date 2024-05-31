import type { Product } from "@/entities/Product";
import type { Page } from "@/entities/Page";
import type { InjectionKey } from "vue";

export const IProductServiceKey = Symbol() as InjectionKey<IProductService>;

export interface IProductService {
  list(page: number, limit: number, customerId: string): Promise<Page<Product>>;
}
