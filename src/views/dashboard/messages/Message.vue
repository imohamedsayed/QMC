<template>
    <v-row>
        <v-col cols="12" md="12">
            <UiParentCard title="Message">
                <div class="mes px-10 mt-10" v-if="!loading && message">
                    <div class="mes__header">
                        <p class="font-weight-bold mb-5">
                            From : <span class="text-skin"> {{ message.name }} </span>
                        </p>
                        <p class="font-weight-bold mb-5">
                            Email : <span class="text-skin"> {{ message.email }}</span>
                        </p>
                        <p class="font-weight-bold">
                            Phone : <span class="text-green"> {{ message.mobile }}</span>
                        </p>
                    </div>
                    <hr class="my-10" />
                    <p class="px-8 mb-10">{{ message.message }}</p>
                </div>
                <div v-else-if="loading" class="py-16 text-center">
                    <v-progress-circular size="100" color="skin" indeterminate></v-progress-circular>
                </div>
                <div class="text-center my-15 text-error" v-else>
                    <v-icon size="100">mdi-alert</v-icon>
                    <p>{{ err }}</p>
                </div>
            </UiParentCard>
        </v-col>
    </v-row>
</template>
<script setup>
import UiParentCard from '@/components/shared/UiParentCard.vue';
import { onMounted, ref, watch } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import axios from 'axios';

const props = defineProps({
    id: {
        type: Number,
        required: true
    }
});

const admin = useAuthStore().getAdmin;

const loading = ref(true);
const err = ref('');
const message = ref(null);
onMounted(async () => {
    if (!admin) useRouter().push({ name: 'adminLogin' });
    await loadChat();
});
watch(
    props,
    (value) => {
        loadChat();
    },
    { deep: true }
);
const loadChat = async () => {
    loading.value = true;
    try {
        const res = await axios.get('api_dashboard/messages/' + props.id);
        if (res.status == 200) {
            console.log(res.data.data);

            message.value = res.data.data;
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        err.value = error.message;
        toast.error(error.message);
    }
    loading.value = false;
};
</script>
