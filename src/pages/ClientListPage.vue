<template>
  <pv-data-table :value="clientList">
    <pv-column field="_id" header="id"></pv-column>
    <pv-column field="docType" header="Document type"></pv-column>
    <pv-column field="docNum" header="Document number"></pv-column>
    <pv-column field="email" header="Email"></pv-column>
    <pv-column field="customerId" header="Customer id"></pv-column>
    <pv-column field="givenName" header="First name"></pv-column>
    <pv-column field="familyName1" header="Last name"></pv-column>
    <pv-column field="phone" header="Phone number"></pv-column>
  </pv-data-table>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PvDataTable from "primevue/datatable";
import PvColumn from "primevue/column";
import type { Customer } from "@/entities/Customer";

const clientList = ref<Customer[]>([
  {
    _id: 111,
    docType: "string",
    docNum: "string",
    email: "string",
    customerId: "string",
    givenName: "string",
    familyName1: "string",
    phone: "string",
  },
  {
    _id: 222,
    docType: "string",
    docNum: "string",
    email: "string",
    customerId: "string",
    givenName: "string",
    familyName1: "string",
    phone: "string",
  },
  {
    _id: 333,
    docType: "string",
    docNum: "string",
    email: "string",
    customerId: "string",
    givenName: "string",
    familyName1: "string",
    phone: "string",
  },
]);
</script>
