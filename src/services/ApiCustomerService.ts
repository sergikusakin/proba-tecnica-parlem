import type { Customer } from "@/entities/Customer";
import type { Page } from "@/entities/Page";
import type { ICustomerService } from "./ICustomerService";

export class ApiCustomerService implements ICustomerService {
  async list(page: number, limit: number): Promise<Page<Customer>> {
    const response = await fetch(
      `/api/customers?
    _page=${page}&_limit=${limit}`,
      { method: "GET" }
    );

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
