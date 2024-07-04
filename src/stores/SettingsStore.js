import { defineStore } from 'pinia';
import axios from 'axios';
import { toast } from 'vue3-toastify';

export const useSettingsStore = defineStore('settingsStore', {
    state: () => ({
        settings: [],
        loading: false,
        error: null
    }),
    getters: {
        getSettingByKey: (state) => (key) => {
            return state.settings.find((setting) => setting.key === key);
        },
        titleHome: (state) => {
            return state.settings.find((setting) => setting.key === 'title_home')?.value || '';
        },
        descriptionHome: (state) => {
            return state.settings.find((setting) => setting.key === 'description_home')?.value || '';
        },
        homeImage: (state) => {
            return state.settings.find((setting) => setting.key === 'home_image') || {};
        }
    },
    actions: {
        async fetchSettings() {
            this.loading = true;
            try {
                const res = await axios.get('api/settings');
                if (res.status === 200) {
                    this.settings = res.data.allSetting;
                } else {
                    throw new Error(res.data.message);
                }
            } catch (error) {
                this.error = error.message;
                toast.error(error.message);
            } finally {
                this.loading = false;
            }
        }
    },
    persist: true
});
