<template>
    <v-row>
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
                    <ProductCards />
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

import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/AuthStore';
import { useRouter } from 'vue-router';

const admin = useAuthStore().getAdmin;

onMounted(() => {
    if (!admin) useRouter().push({ name: 'adminLogin' });
});
</script>
