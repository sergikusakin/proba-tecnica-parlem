import type { Customer } from "@/entities/Customer";
import type { Page } from "@/entities/Page";
import type { ICustomerService } from "./ICustomerService";

export class MockCustomerService implements ICustomerService {
  private mockProducts: Customer[] = [
    {
      _id: 555555,
      docType: "nif",
      docNum: "11223344E",
      email: "it@parlem.com",
      customerId: "11111",
      givenName: "Enriqueta",
      familyName1: "Parlem",
      phone: "668668668",
    },
    {
      _id: 66666,
      docType: "dni",
      docNum: "11223344E",
      email: "it@parlem.com",
      customerId: "22222",
      givenName: "Enri",
      familyName1: "Parlem",
      phone: "668669999",
    },
  ];

  list(page: number, limit: number): Promise<Page<Customer>> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const start = (page - 1) * limit;
        const end = start + limit;
        const paginatedCustomers = this.mockProducts.slice(start, end);

        const result: Page<Customer> = {
          items: paginatedCustomers,
          count: this.mockProducts.length,
        };
        resolve(result);
      }, 2000);
    });
  }

  get(id: number): Promise<Customer | null> {
    const customer = this.mockProducts.find((customer) => customer._id === id);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(customer ?? null);
      }, 2000);
    });
  }
}
