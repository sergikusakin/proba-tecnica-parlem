<template>
  <pv-data-table :value="clientList" :loading="isClientLoading">
    <pv-column field="_id" header="id"></pv-column>
    <pv-column field="docType" header="Document type"></pv-column>
    <pv-column field="docNum" header="Document number"></pv-column>
    <pv-column field="email" header="Email"></pv-column>
    <pv-column field="customerId" header="Customer id"></pv-column>
    <pv-column field="givenName" header="First name"></pv-column>
    <pv-column field="familyName1" header="Last name"></pv-column>
    <pv-column field="phone" header="Phone number"></pv-column>
    <pv-column header="Actions">
      <template #body="{ data }">
        <router-link
          :to="{
            name: 'customers',
            params: {
              id: data._id,
            },
          }"
        >
          view
        </router-link>
      </template>
    </pv-column>
  </pv-data-table>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import PvDataTable from "primevue/datatable";
import PvColumn from "primevue/column";
import type { Customer } from "@/entities/Customer";

import { useCustomerService } from "@/composition/useCustomerService";

const isClientLoading = ref(false);
const clientList = ref<Customer[]>([]);

const page = ref<number>(1);
const limit = ref<number>(10);
const clientService = useCustomerService();

const fetchClients = async () => {
  isClientLoading.value = true;
  try {
    const result = await clientService.list(page.value, limit.value);
    clientList.value = result.items;
  } catch (error) {
    clientList.value = [];
  }
  isClientLoading.value = false;
};

onMounted(fetchClients);
watch(page, fetchClients);
</script>
