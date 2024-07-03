<template>
    <v-row v-if="!loading">
        <v-col cols="12">
            <v-row>
                <!-- Sales overview -->
                <v-col cols="12" lg="8">
                    <SalesOverview />
                </v-col>
                <!-- Yearly Breakup / Monthly Earnings -->
                <v-col cols="12" lg="4">
                    <div class="mb-6">
                        <YearlyBreakup />
                    </div>
                    <div>
                        <MonthlyEarning />
                    </div>
                </v-col>
                <!-- Recent transaction -->
                <v-col cols="12" lg="4">
                    <RecentTransaction />
                </v-col>
                <!-- Product performence -->
                <v-col cols="12" lg="8">
                    <ProductPerformance />
                </v-col>
                <!-- Product Cards -->
                <v-col cols="12">
                    <v-row>
                        <v-col cols="6" md="4" lg="3">
                            <div class="stats-box elevation-1 pa-4 text-center rounded-lg">
                                <div class="stats-box__icon mb-5">
                                    <v-icon color="skin">mdi-frequently-asked-questions</v-icon>
                                </div>
                                <div class="stats-box__value">FAQs</div>
                                <div class="stats-box__value">{{ statistics.faqCount }}</div>
                            </div>
                        </v-col>
                        <v-col cols="6" md="4" lg="3">
                            <div class="stats-box elevation-1 pa-4 text-center rounded-lg">
                                <div class="stats-box__icon mb-5">
                                    <v-icon color="skin">mdi-briefcase-outline</v-icon>
                                </div>
                                <div class="stats-box__value">Services</div>
                                <div class="stats-box__value">{{ statistics.serviceCount }}</div>
                            </div>
                        </v-col>
                        <v-col cols="6" md="4" lg="3">
                            <div class="stats-box elevation-1 pa-4 text-center rounded-lg">
                                <div class="stats-box__icon mb-5">
                                    <v-icon color="skin">mdi-post</v-icon>
                                </div>
                                <div class="stats-box__value">Blogs</div>
                                <div class="stats-box__value">{{ statistics.blosCount }}</div>
                            </div>
                        </v-col>
                        <v-col cols="6" md="4" lg="3">
                            <div class="stats-box elevation-1 pa-4 text-center rounded-lg">
                                <div class="stats-box__icon mb-5">
                                    <v-icon color="skin">mdi-message-outline</v-icon>
                                </div>
                                <div class="stats-box__value">Messages</div>
                                <div class="stats-box__value">{{ statistics.messageCount }}</div>
                            </div>
                        </v-col>
                        <v-col cols="6" md="4" lg="3">
                            <div class="stats-box elevation-1 pa-4 text-center rounded-lg">
                                <div class="stats-box__icon">
                                    <v-icon color="skin mb-5">mdi-account-group-outline</v-icon>
                                </div>
                                <div class="stats-box__value">Clients</div>
                                <div class="stats-box__value">{{ statistics.clientCount }}</div>
                            </div>
                        </v-col>
                        <v-col cols="6" md="4" lg="3">
                            <div class="stats-box elevation-1 pa-4 text-center rounded-lg">
                                <div class="stats-box__icon mb-5">
                                    <v-icon color="skin">mdi-timeline-outline</v-icon>
                                </div>
                                <div class="stats-box__value">Processes</div>
                                <div class="stats-box__value">{{ statistics.processCount }}</div>
                            </div>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
    <v-row v-else>
        <v-col cols="12">
            <v-row>
                <!-- Sales overview -->
                <v-col cols="12" lg="8">
                    <div class="skelton card" style="height: 400px"></div>
                </v-col>
                <!-- Yearly Breakup / Monthly Earnings -->
                <v-col cols="12" lg="4">
                    <div class="mb-6">
                        <div class="skelton card" style="height: 190px"></div>
                    </div>
                    <div>
                        <div class="skelton card" style="height: 190px"></div>
                    </div>
                </v-col>
                <!-- Recent transaction -->
                <v-col cols="12" lg="4">
                    <div class="skelton card" style="height: 400px"></div>
                </v-col>
                <!-- Product performence -->
                <v-col cols="12" lg="8">
                    <div class="skelton card" style="height: 400px"></div>
                </v-col>
                <!-- Product Cards -->
                <v-col cols="12">
                    <div class="skelton card" style="height: 200px"></div>
                </v-col>
            </v-row>
        </v-col>
    </v-row>
</template>
<script setup>
import SalesOverview from '@/components/admin/dashboard/SalesOverview.vue';
import YearlyBreakup from '@/components/admin/dashboard/YearlyBreakup.vue';
import MonthlyEarning from '@/components/admin/dashboard/MonthlyEarnings.vue';
import RecentTransaction from '@/components/admin/dashboard/RecentTransaction.vue';
import ProductPerformance from '@/components/admin/dashboard/ProductPerformance.vue';
import ProductCards from '@/components/admin/dashboard/ProductCards.vue';

import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import axios from 'axios';

const admin = useAuthStore().getAdmin;

const loading = ref(true);

const statistics = ref(null);

onMounted(async () => {
    if (!admin) useRouter().push({ name: 'adminLogin' });

    try {
        const res = await axios.get('api_dashboard/statistics');
        if (res.status == 200) {
            console.log(res);
            statistics.value = res.data.data;
        } else {
            throw new Error(res.response.data.message);
        }
    } catch (error) {
        toast.error(error.message);
    }
    loading.value = false;
});
</script>
<style lang="scss">
.skelton {
    background: linear-gradient(to bottom right, rgba(187, 179, 179, 0.321), rgba(255, 254, 254, 0.096));
    border-radius: 10px;
    width: 100%;
    animation: shimmer 2s infinite;
    background-size: 200% 100%;
    &.header {
        height: 20px;
        width: 400px;
        margin: 0 auto;
        margin-bottom: 16px;
    }
    &.p {
        height: 20px;
        margin-bottom: 8px;
    }
    &.card {
        margin-top: 10px;
        height: 200px;
    }
    &.rectangle {
        margin-top: 10px;
        height: 200px;
    }
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}
</style>
