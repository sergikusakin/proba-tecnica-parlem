import type { Customer } from "@/entities/Customer";
import type { Page } from "@/entities/Page";
import type { InjectionKey } from "vue";

export const ICustomerServiceKey = Symbol() as InjectionKey<ICustomerService>;

export interface ICustomerService {
  list(
    page: number,
    limit: number,
    options?: CustomerListQueryOptions
  ): Promise<Page<Customer>>;
  get(id: number): Promise<Customer | null>;
}

export type CustomerListQueryOptions = {
  keywords?: string;
  sort?: {
    field: string;
    order: 1 | -1;
  };
};
