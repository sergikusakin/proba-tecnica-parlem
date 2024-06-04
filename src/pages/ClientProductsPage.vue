<template>
  <div>
    <router-link
      :to="{
        name: 'home',
      }"
    >
      <div
        class="flex border border-slate-300 rounded-md justify-start items-center w-max p-2"
      >
        <div><- Home</div>
      </div>
    </router-link>
  </div>
  <div v-if="isClientLoading">Loading...</div>
  <div v-else-if="client" class="flex flex-col gap-2">
    <div class="grid grid-cols-[max-content_max-content] gap-2 p-2">
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

    <pv-data-table
      :value="productList"
      :loading="isProductLoading"
      @sort="handleSort"
      removableSort
      lazy
    >
      <template #header>
        <form @submit.prevent="fetchProducts" class="flex justify-end">
          <pv-input-text
            v-model="productsQueryOptions.keywords"
            placeholder="Search..."
          />
        </form>
      </template>
      <pv-column field="_id" header="id"></pv-column>
      <pv-column field="productName" header="Product name" sortable></pv-column>
      <pv-column field="mbSpeed" header="mbSpeed" sortable></pv-column>
      <pv-column field="gbData" header="gbData" sortable></pv-column>
      <pv-column
        field="productTypeName"
        header="Product type name"
        sortable
      ></pv-column>
      <pv-column field="numeracioTerminal" header="Terminal number"></pv-column>
      <pv-column field="soldAt" header="Sold at"></pv-column>
      <pv-column field="customerId" header="Customer id"></pv-column>
    </pv-data-table>
  </div>
  <div v-else>Error 404: Client is not a found</div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import PvInputText from "primevue/inputtext";
import PvDataTable, { type DataTableSortEvent } from "primevue/datatable";
import PvColumn from "primevue/column";
import type { Customer } from "@/entities/Customer";
import type { Product } from "@/entities/Product";
import { useProductService } from "@/composition/useProductService";
import { useCustomerService } from "@/composition/useCustomerService";
import { useRoute } from "vue-router";
import type { ProductListQueryOptions } from "@/services/IProductService";

const route = useRoute();
const clientId = computed(() => route.params.id as string);

// Client

const isClientLoading = ref(false);
const customerService = useCustomerService();
const client = ref<Customer>();
const productsQueryOptions = reactive<ProductListQueryOptions>({
  keywords: "",
});

const fetchClientById = async () => {
  isClientLoading.value = true;
  try {
    const result = await customerService.get(Number(clientId.value));
    client.value = result ?? undefined;
  } catch (error) {
    client.value = undefined;
  }
  isClientLoading.value = false;
};
onMounted(fetchClientById);
watch(clientId, fetchClientById);

// Product

const isProductLoading = ref(false);
const productService = useProductService();
const page = ref<number>(1);
const limit = ref<number>(10);
const productList = ref<Product[]>([]);

const fetchProducts = async () => {
  if (client.value === undefined) {
    productList.value = [];
    return;
  }

  isProductLoading.value = true;
  try {
    const result = await productService.list(
      page.value,
      limit.value,
      client.value.customerId,
      productsQueryOptions
    );
    productList.value = result.items;
  } catch (error) {
    productList.value = [];
  }
  isProductLoading.value = false;
};

watch(client, fetchProducts);
watch(page, fetchProducts);

const handleSort = (event: DataTableSortEvent) => {
  if (event.sortField) {
    productsQueryOptions.sort = {
      field: event.sortField as string,
      order: event.sortOrder as 1 | -1,
    };
  } else {
    productsQueryOptions.sort = undefined;
  }
  fetchProducts();
};
</script>
