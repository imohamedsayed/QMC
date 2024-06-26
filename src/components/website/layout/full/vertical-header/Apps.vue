<template>
    <v-menu>
        <template #activator="{ props }">
            <v-btn class="custom-hover-primary" variant="text" v-bind="props" icon>
                <v-avatar size="20">
                    <v-icon>mdi-cog-outline</v-icon>
                </v-avatar>
            </v-btn>
        </template>

        <v-sheet rounded="md" elevation="10" class="mt-2">
            <v-row>
                <v-col cols="12" sm="6">
                    <v-list class="pa-4" density="default" lines="two">
                        <v-list-item
                            v-for="(element, index) in settingsFirstSide"
                            :key="index"
                            :title="element.title"
                            :subtitle="element.describtion"
                            color="primary"
                        >
                            <template #prepend>
                                <v-sheet class="pa-2 me-3" color="#ECF2FF" rounded="lg">
                                    <v-avatar size="30">
                                        <img src="/icons/icon-dd-chat.svg" />
                                    </v-avatar>
                                </v-sheet>
                            </template>
                        </v-list-item>
                    </v-list>
                </v-col>

                <v-col cols="12" sm="6">
                    <v-list class="pa-4" density="default" lines="two">
                        <v-list-item
                            v-for="(element, index) in settingsSecondSide"
                            :key="index"
                            :title="element.title"
                            :subtitle="element.describtion"
                            color="primary"
                        >
                            <template #prepend>
                                <v-sheet class="pa-2 me-3" color="#ECF2FF" rounded="lg">
                                    <v-avatar size="30">
                                        <img src="/icons/icon-dd-chat.svg" />
                                    </v-avatar>
                                </v-sheet>
                            </template>
                        </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
        </v-sheet>
    </v-menu>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n({ useScope: 'global' });

const greet = t('greeting');
const settingsFirstSide = [
    {
        title: t('settings_menu.wbs_and_projects'),
        describtion: t('settings_menu.managed_wbs_and_projects'),
        icon: 'mdi-account-outline',
    },
    {
        title: t('settings_menu.enterprise_directory'),
        describtion: t('settings_menu.manage_companies_and_contacts'),

    },
    {
        title: t('settings_menu.enterprise_settings'),
        describtion: t('settings_menu.customize_the_enterprise_settings')
    },
    {
        title: t('settings_menu.users'),
        describtion: t('settings_menu.manage_the_enterprise_users')
    }
];

const settingsSecondSide = [
    {
        title: t('settings_menu.forms'),
        describtion: t('settings_menu.design_your_org_forms')
    },
    {
        title: t('settings_menu.modules'),
        describtion: t('settings_menu.manged_the_projects_modules')
    },
    {
        title: t('settings_menu.custom_lists'),
        describtion: t('settings_menu.customize_the_dropdowns_contents')
    },
    {
        title: t('settings_menu.user_profile_app'),
        describtion: t('settings_menu.get_profile_details')
    }
];
</script>

<style></style>
