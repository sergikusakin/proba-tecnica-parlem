import type { Customer } from "@/entities/Customer";
import type { Page } from "@/entities/Page";
import type {
  CustomerListQueryOptions,
  ICustomerService,
} from "./ICustomerService";

export class ApiCustomerService implements ICustomerService {
  async list(
    page: number,
    limit: number,
    options?: CustomerListQueryOptions
  ): Promise<Page<Customer>> {
    const query = new URLSearchParams();

    query.set("_page", page.toString());
    query.set("_limit", limit.toString());

    if (options?.keywords) {
      query.set("q", options.keywords);
    }

    if (options?.sort) {
      query.set("_sort", options.sort.field);
      query.set("_order", `${options.sort.order < 0 ? "asc" : "desc"}`);
    }

    const response = await fetch(`/api/customers?${query}`, { method: "GET" });

    if (response.status !== 200) {
      throw new Error(`List customer error: ${await response.text()}`);
    }

    return {
      items: await response.json(),
      count: Number(response.headers.get("x-total-count")),
    };
  }

  async get(id: number): Promise<Customer | null> {
    const response = await fetch(`/api/customers/${id}`, { method: "GET" });

    if (response.status == 404) {
      return null;
    } else if (response.status !== 200) {
      throw new Error(`Customer error: ${await response.text()}`);
    }

    return await response.json();
  }
}
