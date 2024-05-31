import { inject } from "vue";
import type { IProductService } from "@/services/IProductService";
import { IProductServiceKey } from "@/services/IProductService";
export const useProductService = () => {
  return inject(IProductServiceKey) as IProductService;
};
