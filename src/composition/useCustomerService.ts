import { inject } from "vue";
import type { ICustomerService } from "@/services/ICustomerService";
import { ICustomerServiceKey } from "@/services/ICustomerService";
export const useCustomerService = () => {
  return inject(ICustomerServiceKey) as ICustomerService;
};
