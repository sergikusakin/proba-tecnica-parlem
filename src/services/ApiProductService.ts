import type { Product } from "@/entities/Product";
import type { Page } from "@/entities/Page";
import type { IProductService } from "./IProductService";

export class ApiProductService implements IProductService {
  async list(
    page: number,
    limit: number,
    customerId: string
  ): Promise<Page<Product>> {
    const response = await fetch(
      `/api/products?_page=${page}&_limit=${limit}&customerId=${customerId}`,
      {
        method: "GET",
      }
    );

    if (response.status !== 200) {
      throw new Error(`List customer error: ${await response.text()}`);
    }

    return {
      items: await response.json(),
      count: Number(response.headers.get("x-total-count")),
    };
  }
}
