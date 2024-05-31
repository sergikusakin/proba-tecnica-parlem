import type { Product } from "@/entities/Product";
import type { Page } from "@/entities/Page";
import type { IProductService } from "./IProductService";

export class MockProductService implements IProductService {
  private mockProducts: Product[] = [
    {
      _id: 1111111,
      productName: "FIBRA 1000MB",
      mbSpeed: 1000,
      gbData: null,
      productTypeName: "ftth",
      numeracioTerminal: 933933933,
      soldAt: "2019-01-09 14:26:17",
      customerId: "11111",
    },
    {
      _id: 1111112,
      productName: "MOBIL 500GB",
      mbSpeed: null,
      gbData: 500,
      productTypeName: "4G",
      numeracioTerminal: 696696969,
      soldAt: "2020-08-01 18:30:27",
      customerId: "11111",
    },
    {
      _id: 1111113,
      productName: "MOBIL 500GB",
      mbSpeed: null,
      gbData: 500,
      productTypeName: "4G",
      numeracioTerminal: 696696969,
      soldAt: "2020-08-01 18:30:27",
      customerId: "22222",
    },
  ];

  list(
    page: number,
    limit: number,
    customerId: string
  ): Promise<Page<Product>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const filteredProducts = this.mockProducts.filter(
          (product) => product.customerId === customerId
        );

        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedProducts = filteredProducts.slice(start, end);

        const result: Page<Product> = {
          items: paginatedProducts,
          count: filteredProducts.length,
        };

        resolve(result);
      }, 2000);
    });
  }
}
