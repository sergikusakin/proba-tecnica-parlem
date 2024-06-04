<template>
  <pv-data-table
    :value="clientList"
    :loading="isClientLoading"
    removableSort
    @sort="handleSort"
    lazy
  >
    <template #header>
      <form @submit.prevent="fetchClients" class="flex justify-end">
        <pv-input-text
          v-model="clientsQueryOptions.keywords"
          placeholder="Search..."
        />
      </form>
    </template>
    <pv-column field="_id" header="id"></pv-column>
    <pv-column field="docType" header="Document type"></pv-column>
    <pv-column field="docNum" header="Document number"></pv-column>
    <pv-column field="email" header="Email" sortable></pv-column>
    <pv-column field="customerId" header="Customer id"></pv-column>
    <pv-column field="givenName" header="First name" sortable></pv-column>
    <pv-column field="familyName1" header="Last name" sortable></pv-column>
    <pv-column field="phone" header="Phone number" sortable></pv-column>
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
          <div
            class="flex border border-slate-300 rounded-md justify-center items-center w-max p-2"
          >
            <div>view more -></div>
          </div>
        </router-link>
      </template>
    </pv-column>
  </pv-data-table>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from "vue";
import PvInputText from "primevue/inputtext";
import PvDataTable, { type DataTableSortEvent } from "primevue/datatable";
import PvColumn from "primevue/column";
import type { Customer } from "@/entities/Customer";

import { useCustomerService } from "@/composition/useCustomerService";
import type { CustomerListQueryOptions } from "@/services/ICustomerService";

const isClientLoading = ref(false);
const clientList = ref<Customer[]>([]);

const clientsQueryOptions = reactive<CustomerListQueryOptions>({
  keywords: "",
});

const page = ref<number>(1);
const limit = ref<number>(10);
const clientService = useCustomerService();

const fetchClients = async () => {
  isClientLoading.value = true;
  try {
    const result = await clientService.list(
      page.value,
      limit.value,
      clientsQueryOptions
    );
    clientList.value = result.items;
  } catch (error) {
    clientList.value = [];
  }
  isClientLoading.value = false;
};

onMounted(fetchClients);
watch(page, fetchClients);

const handleSort = (event: DataTableSortEvent) => {
  if (event.sortField) {
    clientsQueryOptions.sort = {
      field: event.sortField as string,
      order: event.sortOrder as 1 | -1,
    };
  } else {
    clientsQueryOptions.sort = undefined;
  }

  fetchClients();
};
</script>
