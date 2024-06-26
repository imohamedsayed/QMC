<template>
    <div class="create-bundle py-10 mb-10">
        <v-container>
            <v-breadcrumbs :items="items">
                <template v-slot:prepend>
                    <v-btn icon elevation="0" class="bg-background" to="/">
                        <v-icon class="mx-1" size="small" icon="mdi-home" color="primary"></v-icon>
                    </v-btn>
                    <v-icon icon="mdi-chevron-right" v-if="$i18n.locale === 'EN'"></v-icon>
                    <v-icon icon="mdi-chevron-left" v-else></v-icon>
                </template>
                <template v-slot:divider v-if="$i18n.locale === 'EN'">
                    <v-icon icon="mdi-chevron-right"></v-icon>
                </template>
                <template v-slot:divider v-else>
                    <v-icon icon="mdi-chevron-left"></v-icon>
                </template>
            </v-breadcrumbs>

            <v-window v-model="step" :touch="{ left: null, right: null }">
                <v-window-item :value="1">
                    <div v-if="loading" class="my-4 px-3 text-center">
                        <v-progress-linear indeterminate color="skin"></v-progress-linear><br />
                        <v-progress-circular class="mt-10" color="primary" width="3" size="120" indeterminate></v-progress-circular>
                    </div>
                    <div v-else-if="!loading && specifications.length">
                        <div class="choose-components mt-16">
                            <p class="step mt-10 font-weight-bold d-flex align-center animate__animated animate__backInDown">
                                <v-icon class="mx-2" :icon="$i18n.locale == 'AR' ? 'mdi-step-backward' : 'mdi-step-forward'"></v-icon>
                                {{ $t('bundle.choose') }}
                            </p>
                            <v-table class="mt-8 text-center animate__animated animate__backInLeft" :hover="true" :fixed-header="true">
                                <thead class="bg-skin">
                                    <tr class="font-weight-bold">
                                        <td>{{ $t('bundle.category') }}</td>
                                        <td style="width: 40%">{{ $t('bundle.productName') }}</td>
                                        <td>{{ $t('bundle.quantity') }}</td>
                                        <td>{{ $t('bundle.price') }}</td>
                                    </tr>
                                </thead>
                                <tbody v-if="specifications.length">
                                    <tr v-for="specification in specifications" :key="specification.id">
                                        <td>{{ specification.SpecificationName }}</td>
                                        <td style="width: 50%">
                                            <v-select
                                                :label="specification.SpecificationName"
                                                v-model="specification.selectedProduct"
                                                variant="outlined"
                                                color="primary"
                                                :items="specification.product"
                                                @update:model-value="updatePrice(specification)"
                                                item-value="id"
                                                item-title="name"
                                                class="mt-2"
                                            >
                                                <template v-slot:chip="{ props, item }">
                                                    <v-chip
                                                        style="width: 100%"
                                                        v-bind="props"
                                                        :prepend-avatar="apiUrl + pathImageProduct + item.raw.mediaFirst?.name"
                                                        :text="item.raw.name"
                                                    ></v-chip>
                                                </template>
                                                <template v-slot:item="{ props, item }">
                                                    <v-list-item
                                                        v-bind="props"
                                                        :prepend-avatar="apiUrl + pathImageProduct + item.raw.mediaFirst?.name"
                                                        :title="item.raw.name"
                                                    ></v-list-item>
                                                </template>
                                            </v-select>
                                        </td>
                                        <td>
                                            <div>
                                                <div
                                                    class="qty d-flex pa-2 align-center gap-3 rounded-md mx-2 mx-auto d-inline justify-center"
                                                >
                                                    <p class="font-weight-bold me-3 ms-1 elevation-1 pa-2">{{ specification.quantity }}</p>
                                                    <div class="actions">
                                                        <v-btn class="d-block" size="20" @click="increment(specification)"
                                                            ><v-icon color="black">mdi-chevron-up</v-icon></v-btn
                                                        >
                                                        <v-btn size="20" @click="decrement(specification)"
                                                            ><v-icon color="black">mdi-chevron-down</v-icon></v-btn
                                                        >
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>{{ calculateTotal(specification).toFixed(2) }} {{ $t('bundle.EGP') }}</td>
                                    </tr>
                                </tbody>
                                <tbody v-else>
                                    <tr>
                                        <td colspan="10">
                                            <v-alert type="info" class="my-5">
                                                {{ $t('bundle.no_spec') }}
                                            </v-alert>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot class="bg-skin">
                                    <tr>
                                        <td colspan="2" class="text-start px-10">{{ $t('bundle.totalBundle') }}</td>
                                        <td colspan="2" class="text-center">{{ total }} {{ $t('bundle.EGP') }}</td>
                                    </tr>
                                </tfoot>
                            </v-table>

                            <div class="mt-10 text-center animate__animated animate__backInUp">
                                <v-btn size="large" color="success" @click="buy_now">{{ $t('bundle.buy') }}</v-btn>
                            </div>
                        </div>
                    </div>
                    <div v-else class="text-center not-found">
                        <img class="mx-auto" width="500" src="../../assets/images/products/noPc.svg" />
                        <p class="font-weight-bold" style="font-size: 1.2rem; text-align: center">{{ $t('bundle.noProducts') }}</p>
                    </div>
                </v-window-item>
                <v-window-item :value="2">
                    <div v-if="step == 2">
                        <BundleCheckout :total="total" :bundle="bundle" @confirm="step = 3" />
                    </div>
                </v-window-item>
                <v-window-item :value="3">
                    <div class="approved text-center mt-16">
                        <h2 class="font-weight-bold" style="text-align: center">{{ $t('cart.approved') }}</h2>
                        <img src="@/assets/images/background/Approval.svg" width="100" class="mx-auto my-10" />
                        <p style="font-size: 1.3rem; text-align: center">
                            {{ $t('cart.thanks') }}
                        </p>
                        <v-btn color="success" class="mt-7" size="large" to="/">{{ $t('cart.done') }}</v-btn>
                    </div>
                </v-window-item>
            </v-window>
        </v-container>
    </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { onMounted, ref, computed, watch } from 'vue';
import { toast } from 'vue3-toastify';
import axios from 'axios';
import BundleCheckout from '@/components/website/bundle/checkout/BundleCheckout.vue';
const { t } = useI18n({ useScope: 'global' });

// breadcrumbs and props
const items = [
    {
        title: t('bread.buildYOB'),
        disabled: false,
        href: '/build-ur-bundle'
    },
    {
        title: t('bread.bundleBuying'),
        disabled: true,
        href: 'BundlePCBrands'
    }
];
const props = defineProps({
    id: {
        required: true,
        type: Number
    }
});

// variables
const step = ref(1);
const loading = ref(false);
const apiUrl = import.meta.env.VITE_API_URL;
const pathImageProduct = ref('');

const specifications = ref([]);
watch(
    step,
    (value) => {
        window.scrollTo(0, 0);
    },
    { deep: true }
);
// mounted
onMounted(async () => {
    loading.value = true;
    try {
        await loadComponents();
    } catch (error) {
        toast.error(error.message);
    }
    loading.value = false;
});
const modelPrice = ref(0);
// functions
const loadComponents = async () => {
    try {
        const res = await axios.get('api/get-bundle-info/' + props.id);

        if (res.status == 200) {
            modelPrice.value = res.data.data.PcModel.price;
            pathImageProduct.value = res.data.data.pathImageProduct;
            specifications.value = res.data.data.Pc.sepcification;
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
};

const updatePrice = (specification) => {
    if (specification.selectedProduct) {
        const selectedProduct = specification.product.find((product) => product.id === specification.selectedProduct);
        if (selectedProduct) {
            specification.price = selectedProduct.price;
            specification.quantity = 1;
        }
    }
};

const increment = (specification) => {
    const selectedProduct = specification.product.find((product) => product.id === specification.selectedProduct);
    if (selectedProduct && selectedProduct.compatiable) {
        if (specification.quantity < selectedProduct.compatiable.max_quantity) {
            specification.quantity++;
        } else {
            toast.warning(t('bundle.maxQuantityReached'));
        }
    }
};

const decrement = (specification) => {
    if (specification.quantity >= 1) {
        specification.quantity--;
    }
};

const calculateTotal = (specification) => {
    // Calculate total price based on selected product and quantity
    if (specification.selectedProduct) {
        const selectedProduct = specification.product.find((product) => product.id === specification.selectedProduct);
        if (selectedProduct) {
            return Number(selectedProduct.price) * Number(specification.quantity);
        }
    }
    return 0;
};

const total = computed(() => Number(calculateOverallTotal()));

const calculateOverallTotal = () => {
    let overallTotal = 0;

    // if (model.value) {
    //     const selectedModel = models.value.find((m) => m.id === model.value);
    //     if (selectedModel) {
    //         overallTotal += Number(selectedModel.price);
    //     }
    // }
    overallTotal += Number(modelPrice.value);
    // Iterate through each specification to calculate its total
    specifications.value.forEach((specification) => {
        overallTotal += calculateTotal(specification);
    });

    return Number(overallTotal);
};

const bundle = ref();

const buy_now = (event) => {
    event.stopPropagation();

    const selected_products = [];

    specifications.value.forEach((specification) => {
        if (specification.selectedProduct) {
            selected_products.push({ id: specification.selectedProduct, quantity: specification.quantity });
        }
    });

    bundle.value = {
        model: props.id,
        products: selected_products
    };

    step.value = 2;
};
</script>

<style lang="scss" scoped>
.create-bundle {
    p {
        &.step {
            font-size: 1.3rem;
        }
    }
}
.not-found {
    text-align: center !important;
    img {
        @media (max-width: 500px) {
            width: auto !important;
        }
    }
}
</style>
