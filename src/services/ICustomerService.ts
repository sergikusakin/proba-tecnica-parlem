import type { Customer } from "@/entities/Customer";
import type { Page } from "@/entities/Page";
import type { InjectionKey } from "vue";

export const ICustomerServiceKey = Symbol() as InjectionKey<ICustomerService>;

export interface ICustomerService {
  list(page: number, limit: number): Promise<Page<Customer>>;
  get(id: number): Promise<Customer | null>;
}
