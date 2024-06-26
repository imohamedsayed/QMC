<template>
    <v-menu>
        <template #activator="{ props }">
            <v-btn class="custom-hover-primary mx-2" variant="text" v-bind="props" icon>
                <v-avatar size="20" v-if="$i18n.locale == 'EN'">
                    <img src="/icons/icon-flag-en.svg" alt="user" />
                </v-avatar>
                <v-avatar size="20" v-else>
                    <img src="/icons/icon-flag-ro.svg" alt="user" />
                </v-avatar>
            </v-btn>
        </template>

        <v-sheet rounded="md" width="200" elevation="10" class="mt-2">
            <v-list class="py-0" lines="one" density="compact">
                <v-list-item value="item1" color="primary" @click="changeLocale('EN')">
                    <template #prepend>
                        <v-avatar size="20">
                            <img src="/icons/icon-flag-en.svg" />
                        </v-avatar>
                    </template>

                    <v-list-item-title class="text-body-1"> English </v-list-item-title>
                </v-list-item>

                <v-list-item value="item2" color="primary" @click="changeLocale('AR')">
                    <template #prepend>
                        <v-avatar size="20">
                            <img src="/icons/icon-flag-ro.svg" />
                        </v-avatar>
                    </template>

                    <v-list-item-title class="text-body-1"> العربية </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-sheet>
    </v-menu>
</template>

<script setup>
function changeLocale(lang) {
    localStorage.setItem('lang', lang);
    location.reload();
}
</script>

<style></style>
