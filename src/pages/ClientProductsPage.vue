<template>
  <div class="flex flex-col gap-2">
    <div class="grid grid-cols-[max-content_max-content] gap-2">
      <div class="font-bold">Id:</div>
      <div>{{ client._id }}</div>
      <div class="font-bold">Document type:</div>
      <div>{{ client.docType }}</div>
      <div class="font-bold">Document number:</div>
      <div>{{ client.docNum }}</div>
      <div class="font-bold">Email:</div>
      <div>{{ client.email }}</div>
      <div class="font-bold">First name:</div>
      <div>{{ client.givenName }}</div>
      <div class="font-bold">Last name:</div>
      <div>{{ client.familyName1 }}</div>
      <div class="font-bold">Phone number:</div>
      <div>{{ client.phone }}</div>
    </div>

    <pv-data-table :value="productList">
      <pv-column field="_id" header="id"></pv-column>
      <pv-column field="productName" header="Product name"></pv-column>
      <pv-column field="mbSpeed" header="mbSpeed"></pv-column>
      <pv-column field="gbData" header="gbData"></pv-column>
      <pv-column field="productTypeName" header="Product type name"></pv-column>
      <pv-column field="numeracioTerminal" header="Terminal number"></pv-column>
      <pv-column field="soldAt" header="Sold at"></pv-column>
      <pv-column field="customerId" header="Customer id"></pv-column>
    </pv-data-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PvDataTable from "primevue/datatable";
import PvColumn from "primevue/column";
import type { Customer } from "@/entities/Customer";
import type { Product } from "@/entities/Product";

const productList = ref<Product[]>([
  {
    _id: 22,
    productName: "string",
    mbSpeed: 33,
    gbData: 33,
    productTypeName: "string",
    numeracioTerminal: 66,
    soldAt: "string",
    customerId: "string",
  },
  {
    _id: 33,
    productName: "string",
    mbSpeed: 33,
    gbData: 33,
    productTypeName: "string",
    numeracioTerminal: 66,
    soldAt: "string",
    customerId: "string",
  },
  {
    _id: 44,
    productName: "string",
    mbSpeed: 33,
    gbData: 33,
    productTypeName: "string",
    numeracioTerminal: 66,
    soldAt: "string",
    customerId: "string",
  },
]);

const client = ref<Customer>({
  _id: 111,
  docType: "string",
  docNum: "string",
  email: "string",
  customerId: "string",
  givenName: "string",
  familyName1: "string",
  phone: "string",
});
</script>
