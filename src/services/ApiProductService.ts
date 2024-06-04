import type { Product } from "@/entities/Product";
import type { Page } from "@/entities/Page";
import type {
  IProductService,
  ProductListQueryOptions,
} from "./IProductService";

export class ApiProductService implements IProductService {
  async list(
    page: number,
    limit: number,
    customerId: string,
    options?: ProductListQueryOptions
  ): Promise<Page<Product>> {
    const query = new URLSearchParams();

    query.set("_page", page.toString());
    query.set("_limit", limit.toString());
    query.set("customerId", customerId);

    if (options?.keywords) {
      query.set("q", options.keywords);
    }

    if (options?.sort) {
      query.set("_sort", options.sort.field);
      query.set("_order", `${options.sort.order < 0 ? "asc" : "desc"}`);
    }

    const response = await fetch(`/api/products?${query}`, {
      method: "GET",
    });

    if (response.status !== 200) {
      throw new Error(`List customer error: ${await response.text()}`);
    }

    return {
      items: await response.json(),
      count: Number(response.headers.get("x-total-count")),
    };
  }
}
