<template>
    <div class="pa-8 pb-16">
        <v-row class="justify-space-between">
            <v-col cols="12" md="3"></v-col>
        </v-row>
        <EasyDataTable
            :loading="loading"
            buttons-pagination
            theme-color="#5D87FF"
            table-class-name="customize-table"
            :headers="headers"
            :items="items"
            :server-items-length="serverItemsLength"
            v-model:server-options="serverOptions"
        >
            <template #header-name="header">
                {{ header.text }}
            </template>
            <template #item-cover="item">
                <v-img :src="apiUrl + item.cover" width="120" height="60">
                    <template v-slot:placeholder>
                        <div class="d-flex align-center justify-center fill-height">
                            <v-progress-circular color="grey-lighten-4" indeterminate></v-progress-circular>
                        </div>
                    </template>
                </v-img>
            </template>
            <template #item-status="item">
                <v-chip :color="item.status == 'Enable' ? 'info' : 'error'">{{ item.status }}</v-chip>
            </template>
            <template #item-action="item">
                <v-btn icon elevation="0" class="mr-2" @click="$router.push({ name: 'EditAdmin', params: { id: item.id } })"
                    ><v-icon color="primary">mdi-pencil-outline</v-icon>
                    <v-tooltip activator="parent">edit</v-tooltip>
                </v-btn>
                <v-btn icon elevation="0" class="mr-2" @click="deleteItem(item.id)"
                    ><v-icon color="error">mdi-delete-outline</v-icon>
                    <v-tooltip activator="parent">delete</v-tooltip>
                </v-btn>
            </template>
            <template #loading>
                <img
                    src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
                    style="width: 100px; height: 80px"
                />
            </template>
            <template #empty-message>
                <span class="text-muted">nothing here</span>
            </template>
        </EasyDataTable>
        <v-dialog v-model="dialog" width="500" transition="dialog-top-transition" persistent>
            <v-card class="pa-4" :loading="loading">
                <v-card-title>Do you really want to delete this Employee?</v-card-title>
                <v-card-text>After confirming the deletion of this Employee you cannot undo the changes you made</v-card-text>
                <v-card-actions class="mt-5 text-center">
                    <v-btn @click="dialog = false" color="success"> <v-icon>mdi-close</v-icon>Cancel</v-btn>
                    <v-btn @click="confirmDeleteItem" color="error" class="mr-5" :loading="loading">
                        <v-icon>mdi-check</v-icon>Confirm
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup>
import axios from 'axios';
import { toast } from 'vue3-toastify';
import { onMounted, ref, watch } from 'vue';

// vars
let search = ref('');
let loading = ref(false);
let dialog = ref(false);
let id = ref('');
const apiUrl = import.meta.env.VITE_API_URL;
const headers = ref([
    { text: 'Id', value: 'id', sortable: true },
    { text: 'Name', value: 'name', sortable: true },
    { text: 'Email', value: 'email', sortable: true },
    { text: 'Role', value: 'role_name', sortable: true },
    { text: 'Action', value: 'Action' }
]);
let items = ref([]);

// hooks
const serverItemsLength = ref(0);
const serverOptions = ref({
    page: 1,
    rowsPerPage: 16,
    sortBy: 'id',
    sortType: 'desc'
});

const loadItems = async () => {
    loading.value = true;
    try {
        const res = await axios.get('api_dashboard/managers?page=' + serverOptions.value.page);
        if (res.status === 200) {
            items.value = res.data.data;
            const serverOption = res.data.meta.pagination;
            serverItemsLength.value = serverOption.total;
            serverOptions.value.page = serverOption.current_page;
            serverOptions.value.rowsPerPage = serverOption.per_page;
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
    loading.value = false;
};
loadItems(); // initial load

watch(
    serverOptions,
    (value) => {
        loadItems();
    },
    { deep: true }
);

// Methods
const deleteItem = (idd) => {
    id.value = idd;
    dialog.value = true;
};
const confirmDeleteItem = async () => {
    loading.value = true;
    try {
        const res = await axios.delete('api_dashboard/managers/' + id.value);
        if (res.status == 204) {
            toast.success('Employee Deleted Successfully', { autoClose: 1000 });
            dialog.value = false;
            loadItems();
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
    loading.value = false;
};
</script>

<style lang="scss">
.customize-table {
    border-radius: 7px;
    white-space: nowrap;
    --easy-table-border: none;
    --easy-table-row-border: 1px solid rgb(var(--v-theme-inputBorder), 0.1);
    --easy-table-header-font-size: 16px;
    --easy-table-header-height: 50px;
    --easy-table-header-font-color: rgb(var(--v-theme-textPrimary));
    --easy-table-header-background-color: rgb(var(--v-theme-surface));
    --easy-table-header-item-padding: 10px 15px;
    --easy-table-body-even-row-font-color: rgb(var(--v-theme-surface));
    --easy-table-body-even-row-background-color: rgba(0, 0, 0, 0.02);
    --easy-table-body-row-font-color: rgb(var(--v-theme-textPrimary));
    --easy-table-body-row-background-color: rgb(var(--v-theme-surface));
    --easy-table-body-row-height: 50px;
    --easy-table-body-row-font-size: 14px;
    --easy-table-body-row-hover-font-color: rgb(var(--v-theme-textPrimary));
    --easy-table-body-row-hover-background-color: rgba(0, 0, 0, 0.02);
    --easy-table-body-item-padding: 15px;
    --easy-table-footer-background-color: rgb(var(--v-theme-surface));
    --easy-table-footer-font-color: rgb(var(--v-theme-textPrimary));
    --easy-table-footer-font-size: 14px;
    --easy-table-footer-padding: 0px 10px;
    --easy-table-footer-height: 50px;
    --easy-table-rows-per-page-selector-width: 70px;
    --easy-table-rows-per-page-selector-option-padding: 10px;
    --easy-table-scrollbar-track-color: #;
    --easy-table-scrollbar-color: #;
    --easy-table-scrollbar-thumb-color: #4c5d7a;
    --easy-table-scrollbar-corner-color: #;
    --easy-table-loading-mask-background-color: #;
}
</style>
